import { Services } from '@/services';
import { IOTPSignUpProps } from '.';
import { FormDataOTPSignUp } from '../../types';
import View from './view';
import useLoading from '@/hooks/useLoading';
import { Logger } from '@/utils/logger';
import { ToastContext, ToastType } from '@/contexts/toast';
import { useContext } from 'react';

interface IComponentProps extends IOTPSignUpProps {}
function Model(props: IComponentProps) {
	const { stateLoading, handlerLoading } = useLoading({ defaultLoading: false });
	const { onToast } = useContext(ToastContext);

	const { handlerService } = Services.User.VerifyOTP({
		onSuccess: (dataItem) => {
			Logger.info('Services.User execute onSuccess');
			Logger.debug('Services.User execute onSuccess response', dataItem);
			handlerLoading.onSetLoading(false);
			props.onRequestVerifyOTPSuccess(dataItem);
		},
		onOTPNotMatch: () => {
			Logger.info('Services.User execute onOTPNotMatch');
			handlerLoading.onSetLoading(false);
			onToast({
				theme: ToastType.error,
				label: 'SYSTEM_ERROR',
				content: 'OTP_NOT_MATCH',
			});
		},
		onExpiredToken: () => {
			Logger.info('Services.User execute onExpiredToken');
			handlerLoading.onSetLoading(false);
			onToast({
				theme: ToastType.error,
				label: 'SYSTEM_ERROR',
				content: 'OTP_EXPIRED',
			});
		},
		token: props.response.responseVerify.token,
	});

	const handleSubmit = (dataForm: FormDataOTPSignUp) => {
		handlerLoading.onSetLoading(true);
		handlerService.onVerifyOTP({ otp: dataForm.otp });
		props.onSubmit(dataForm);
	};
	return <View loading={stateLoading.loading} onSubmit={handleSubmit} formUsername={props.formUsername} />;
}

export default Model;
