import { ResponseVerifyOTP } from '@/services/users/verifyOTP';
import { FormDataOTPSignUp, FormDataUserSignUp } from '../../types';
import Component from './component';
import { ResponseState } from '../../controller';

export interface IOTPSignUpProps {
	formUsername: FormDataUserSignUp;
	onSubmit: (dataForm: FormDataOTPSignUp) => void;
	response: ResponseState;
	onRequestVerifyOTPSuccess: (request: ResponseVerifyOTP) => void;
}
function OTPSignUp(props: IOTPSignUpProps) {
	return <Component {...props} />;
}

export default OTPSignUp;
