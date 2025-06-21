import { IOTPSignUpProps } from '.';
import { FormDataOTPSignUp } from '../../types';
import View from './view';

interface IComponentProps extends IOTPSignUpProps {}
function Model(props: IComponentProps) {
	const handleSubmit = (dataForm: FormDataOTPSignUp) => {
		props.onSubmit(dataForm);
	};
	return <View onSubmit={handleSubmit} formUsername={props.formUsername} />;
}

export default Model;
