/* eslint-disable @typescript-eslint/no-explicit-any */
import { ISignUpUserProps } from '.';
import View from './view';
import useGoogle from '@/hooks/useGoogle';
import { Logger } from '@/utils/logger';
import dayjs from 'dayjs';
import AuthService, { IProfileUser } from '@/utils/auth';
import axios from 'axios';
import Config from '@/configs';
import { CODE } from '@/configs/responseCode';
import { useContext } from 'react';
import { ToastContext, ToastType } from '@/contexts/toast';
import { ResponseRegisterWithGG } from '@/services/types';
import { FormDataUserSignUp } from '../../types';
import { Services } from '@/services';
import useLoading from '@/hooks/useLoading';
const config = new Config().getState();

interface IComponentProps extends ISignUpUserProps {}
function Model(props: IComponentProps) {
	const { onToast } = useContext(ToastContext);
	const { handlerLoading, stateLoading } = useLoading({ defaultLoading: false });

	const handleAuth = (response: ResponseRegisterWithGG) => {
		const expireAt = dayjs().unix() * 180000;
		AuthService.setPackageAuth(
			{
				token: response?.data?.token as string,
			},
			dayjs().unix() * 18000,
		);
		AuthService.setPackageProfile(response?.data?.info as IProfileUser, expireAt);
		props.onSignUpWithGGSuccess();
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

	const { handlerService } = Services.User.VerifyUsername({
		onSuccess: (dataItem) => {
			Logger.info('Services.User execute VerifyUsername request');
			Logger.debug('Services.User execute VerifyUsername response', dataItem);
			props.onRequestVerifyUserSuccess(dataItem);
			handlerLoading.onSetLoading(false);
		},
		onUserExistedInSystem: () => {
			handlerLoading.onSetLoading(false);
			onToast({
				theme: ToastType.error,
				label: 'SYSTEM_ERROR',
				content: 'USER_HAD_EXISTED',
			});
		},
	});

	const handleSubmit = (dataItem?: FormDataUserSignUp) => {
		handlerLoading.onSetLoading(true);
		handlerService.onVerifyUsername({
			email: dataItem?.username as string,
		});
		props.onSubmit(dataItem);
	};
	return <View loading={stateLoading.loading} onSubmit={handleSubmit} onSignUpWithGG={handler.onLoginWithGG} />;
}

export default Model;
