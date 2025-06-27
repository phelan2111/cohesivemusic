import { FormDataInformation, FormDataOTPSignUp, FormDataUserSignUp, STEP_SIGN_UP } from './types';
import SignUpUser from './step/signUp';
import InformationSignUp from './step/information';
import OTPSignUp from './step/OTP';
import { FormState, ResponseState } from './controller';
import { ResponseVerifyUsername } from '@/services/users/verifyUsername';
import { ResponseVerifyOTP } from '@/services/users/verifyOTP';

export interface IComponentStepProps extends IViewProps {
	step: STEP_SIGN_UP;
}
function ComponentStep({ state, handler, step }: IComponentStepProps) {
	switch (step) {
		case STEP_SIGN_UP.VERIFY: {
			return (
				<OTPSignUp
					formUsername={state.form.formUsername}
					response={state.response}
					onSubmit={handler.form.onSubmitOTP}
					onRequestVerifyOTPSuccess={handler.request.onRequestVerifyOTPSuccess}
				/>
			);
		}
		case STEP_SIGN_UP.INFORMATION: {
			return (
				<InformationSignUp
					response={state.response}
					onSubmit={handler.form.onSubmitInformation}
					onRequestRegisterSuccess={handler.request.onRequestRegisterSuccess}
				/>
			);
		}
		default: {
			return (
				<SignUpUser
					onRequestVerifyUserSuccess={handler.request.onRequestVerifyUserSuccess}
					onSignUpWithGGSuccess={handler.form.onLoginWithGoogleSuccess}
					onSubmit={handler.form.onSubmitFormUser}
				/>
			);
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
			onRequestVerifyOTPSuccess: (request: ResponseVerifyOTP) => void;
			onRequestRegisterSuccess: VoidFunction;
		};
	};
}
function View(props: IViewProps) {
	return <ComponentStep {...props} />;
}

export default View;
