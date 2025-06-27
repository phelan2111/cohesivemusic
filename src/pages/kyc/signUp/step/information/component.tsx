import View from './view';
import { InformationSignUpProps } from '.';
import { FormDataInformation } from '../../types';
import useLoading from '@/hooks/useLoading';
import { Services } from '@/services';

interface IComponentProps extends InformationSignUpProps {}
function Model(props: IComponentProps) {
	const { handlerLoading, stateLoading } = useLoading({ defaultLoading: false });
	const { handlerService } = Services.User.Register({
		onSuccess: () => {
			handlerLoading.onSetLoading(false);
			props.onRequestRegisterSuccess();
		},
		token: props.response.verifyOTP.token,
	});

	const handleSubmit = (dataForm: FormDataInformation) => {
		props.onSubmit(dataForm);
		handlerLoading.onSetLoading(true);
		handlerService.onRegister(dataForm);
	};
	return <View loading={stateLoading.loading} onSubmit={handleSubmit} />;
}

export default Model;
