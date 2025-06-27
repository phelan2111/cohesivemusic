import View from './view';
import useLoading from '@/hooks/useLoading';
import { Services } from '@/services';
import { useContext } from 'react';
import { ModalContext } from '@/contexts/modal';
import { useRedirect } from '@/hooks/useRedirect';
import { PATH } from '@/routes/config';
import { FormDataReset } from './types';
import { useParams } from 'react-router-dom';
import ResetSuccess from '@/layout/desktop/kyc/components/resetSuccess';

type ParamsReset = {
	token: string;
};
function Controller() {
	const { onModal, onCloseModal } = useContext(ModalContext);
	const { redirectPage } = useRedirect();
	const params = useParams() as ParamsReset;
	const { handlerLoading, stateLoading } = useLoading({ defaultLoading: false });
	const { handlerService } = Services.User.Reset({
		onSuccess: () => {
			handlerLoading.onSetLoading(false);
			onModal(<ResetSuccess onClose={onCloseModal} />);
			redirectPage(PATH.KYC.SIGN_IN);
		},
		token: params.token,
	});
	const onSubmit = (dataForm: FormDataReset) => {
		handlerLoading.onSetLoading(true);
		handlerService.onReset(dataForm);
	};

	return <View loading={stateLoading.loading} onSubmit={onSubmit} />;
}

export default Controller;
