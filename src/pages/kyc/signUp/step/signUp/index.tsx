import Component from './component';
import { FormDataUserSignUp } from '../../types';
import { ResponseVerifyUsername } from '@/services/users/verifyUsername';

export interface ISignUpUserProps {
	onSubmit: (dataItem?: FormDataUserSignUp) => void;
	onSignUpWithGGSuccess: VoidFunction;
	onRequestVerifyUserSuccess: (request: ResponseVerifyUsername) => void;
}

function SignUpUser(props: ISignUpUserProps) {
	return <Component {...props} />;
}

export default SignUpUser;
