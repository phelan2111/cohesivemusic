import { FormDataOTPSignUp, FormDataUserSignUp } from '../../types';
import Component from './component';

export interface IOTPSignUpProps {
	formUsername: FormDataUserSignUp;
	onSubmit: (dataForm: FormDataOTPSignUp) => void;
}
function OTPSignUp(props: IOTPSignUpProps) {
	return <Component {...props} />;
}

export default OTPSignUp;
