import { useContext } from 'react';
import View from './view';
import { ToastContext, ToastType } from '@/contexts/toast';
import dayjs from 'dayjs';
import AuthService, { IProfileUser } from '@/utils/auth';
import useGoogle from '@/hooks/useGoogle';
import { Logger } from '@/utils/logger';
import axios from 'axios';
import Config from '@/configs';
import { CODE } from '@/configs/responseCode';
import { useRedirect } from '@/hooks/useRedirect';
import { PATH } from '@/routes/config';
import { ResponseRegisterWithGG } from '@/services/types';
import { Services } from '@/services';
import { FormDataLogin } from './types';
import useLoading from '@/hooks/useLoading';
import { ResponseLogin } from '@/services/users/login';
const config = new Config().getState();

function Controller() {
	const { onToast } = useContext(ToastContext);
	const { redirectPage } = useRedirect();
	const { handlerLoading, stateLoading } = useLoading({ defaultLoading: false });
	const { handlerService } = Services.User.Login({
		onSuccess: (dataItem: ResponseLogin) => {
			Logger.info('SignIn Controller execute Services.User.Login');
			Logger.debug('SignIn Controller execute Services.User.Login response', dataItem);
			handlerLoading.onSetLoading(false);
			handleAuth({ data: dataItem });
		},
		onWrongPassword: () => {
			Logger.info('SignIn Controller execute Services.User.Login give onWrongPassword');
			onToast({
				theme: ToastType.error,
				label: 'SYSTEM_ERROR',
				content: 'WRONG_PASSWORD',
			});
			handlerLoading.onSetLoading(false);
		},
		onSystemError: () => {
			Logger.info('SignIn Controller execute Services.User.Login give onSystemError');
			onToast({
				theme: ToastType.error,
				label: 'SYSTEM_ERROR',
				content: 'SOMETHING_WERE_WRONG',
			});
			handlerLoading.onSetLoading(false);
		},
		onHadNotExistedInSystem: () => {
			Logger.info('SignIn Controller execute Services.User.Login give onHadNotExistedInSystem');
			onToast({
				theme: ToastType.error,
				label: 'SYSTEM_ERROR',
				content: 'USER_HAD_NOT_EXISTED_SYSTEM',
			});
			handlerLoading.onSetLoading(false);
		},
	});

	const handleAuth = (response: Pick<ResponseRegisterWithGG, 'data'>) => {
		const expireAt = dayjs().unix() * 180000;
		AuthService.setPackageAuth(
			{
				token: response?.data?.token as string,
			},
			dayjs().unix() * 18000,
		);
		AuthService.setPackageProfile(response?.data?.info as IProfileUser, expireAt);
		redirectPage(PATH.HOME);
	};

	const { handler } = useGoogle({
		func: {
			onError: () => {},
			onSuccess: async (response) => {
				Logger.info('SignUp Controller execute useGoogle');
				Logger.debug('SignUp Controller execute useGoogle have response', response);

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

	const onSubmit = (dataItem: FormDataLogin) => {
		handlerLoading.onSetLoading(true);
		handlerService.onLogin(dataItem);
	};

	return <View onLoginWithGG={handler.onLoginWithGG} onSubmit={onSubmit} loading={stateLoading.loading} />;
}

export default Controller;
