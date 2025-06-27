import View from './view';
import useLoading from '@/hooks/useLoading';
import { FormDataForgot } from './types';
import { Services } from '@/services';
import { useContext } from 'react';
import { ModalContext } from '@/contexts/modal';
import ForgotSuccess from '@/layout/desktop/kyc/components/forgotSuccess';
import { useRedirect } from '@/hooks/useRedirect';
import { PATH } from '@/routes/config';

function Controller() {
	const { onModal, onCloseModal } = useContext(ModalContext);
	const { redirectPage } = useRedirect();
	const { handlerLoading, stateLoading } = useLoading({ defaultLoading: false });
	const { handlerService } = Services.User.Forgot({
		onSuccess: () => {
			handlerLoading.onSetLoading(false);
			onModal(<ForgotSuccess onClose={onCloseModal} />);
			redirectPage(PATH.KYC.SIGN_IN);
		},
	});

	const onSubmit = (dataForm: FormDataForgot) => {
		handlerLoading.onSetLoading(true);
		handlerService.onLogin(dataForm);
	};

	return <View loading={stateLoading.loading} onSubmit={onSubmit} />;
}

export default Controller;
