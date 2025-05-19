import { useContext } from 'react';
import View from './view';
import { ToastContext, ToastType } from '@/contexts/toast';
import { ResponseRegisterWithGG } from '@/services/users/registerWithGG';
import dayjs from 'dayjs';
import AuthService, { IProfileUser } from '@/utils/auth';
import useGoogle from '@/hooks/useGoogle';
import { Logger } from '@/utils/logger';
import axios from 'axios';
import Config from '@/configs';
import { CODE } from '@/configs/responseCode';
import { useRedirect } from '@/hooks/useRedirect';
import { PATH } from '@/routes/config';
const config = new Config().getState();

function Controller() {
	const { onToast } = useContext(ToastContext);
	const { redirectPage } = useRedirect();

	const handleAuth = (response: ResponseRegisterWithGG) => {
		const expireAt = dayjs().unix() * 180000;
		AuthService.setPackageAuth(
			{
				token: response?.data?.token as string,
			},
			dayjs().unix() * 18000,
		);
		AuthService.setPackageProfile(
			response?.data?.info as IProfileUser,
			expireAt,
		);
		redirectPage(PATH.HOME);
	};

	const { handler } = useGoogle({
		func: {
			onError: () => {},
			onSuccess: async (response) => {
				Logger.info('SignUp Controller execute useGoogle');
				Logger.debug(
					'SignUp Controller execute useGoogle have response',
					response,
				);

				await axios({
					url: `${config.api.host}${config.api.user.loginWithGG}`,
					headers: {
						token: `Bearer ${response.access_token}`,
					},
				}).then(async (res) => {
					if (res.data?.code === CODE.systemError) {
						onToast({
							theme: ToastType.error,
							label: 'SYSTEM_ERROR',
							content: 'SOMETHING_WERE_WRONG',
						});
					}
					if (res.data?.code?.toString() === CODE.success) {
						handleAuth(res.data);
					}
				});
			},
		},
	});

	return <View onLoginWithGG={handler.onLoginWithGG} />;
}

export default Controller;
