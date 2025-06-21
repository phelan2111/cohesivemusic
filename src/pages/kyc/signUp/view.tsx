import { FormDataInformation, FormDataOTPSignUp, FormDataUserSignUp, STEP_SIGN_UP } from './types';
import SignUpUser from './step/signUp';
import InformationSignUp from './step/information';
import OTPSignUp from './step/OTP';
import { FormState, ResponseState } from './controller';
import { ResponseVerifyUsername } from '@/services/users/verifyUsername';

export interface IComponentStepProps extends IViewProps {
	step: STEP_SIGN_UP;
}
function ComponentStep({ state, handler, step }: IComponentStepProps) {
	switch (step) {
		case STEP_SIGN_UP.VERIFY: {
			return <OTPSignUp formUsername={state.form.formUsername} onSubmit={handler.form.onSubmitOTP} />;
		}
		case STEP_SIGN_UP.INFORMATION: {
			return <InformationSignUp onSubmit={handler.form.onSubmitInformation} />;
		}
		default: {
			return <SignUpUser onSignUpWithGGSuccess={handler.form.onLoginWithGoogleSuccess} onSubmit={handler.form.onSubmitFormUser} />;
		}
	}
}

interface IViewProps {
	step: STEP_SIGN_UP;
	state: {
		form: FormState;
		response: ResponseState;
	};
	handler: {
		form: {
			onSubmitFormUser: (dataItem?: FormDataUserSignUp) => void;
			onSubmitOTP: (dataItem?: FormDataOTPSignUp) => void;
			onSubmitInformation: (dataItem?: FormDataInformation) => void;
			onLoginWithGoogleSuccess: VoidFunction;
		};
		request: {
			onRequestVerifyUserSuccess: (request: ResponseVerifyUsername) => void;
		};
	};
}
function View(props: IViewProps) {
	return <ComponentStep {...props} />;
}

export default View;
