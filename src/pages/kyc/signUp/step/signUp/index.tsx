import Component from './component';
import { FormDataUserSignUp } from '../../types';

export interface ISignUpUserProps {
	onSubmit: (dataItem?: FormDataUserSignUp) => void;
	onSignUpWithGGSuccess: VoidFunction;
}

function SignUpUser(props: ISignUpUserProps) {
	return <Component {...props} />;
}

export default SignUpUser;
