import { STEP_SIGN_UP } from './types';
import SignUpUser from './step/signUp';
import InformationSignUp from './step/information';
import OTPSignUp from './step/OTP';

export interface IComponentStepProps extends IViewProps {
	step: STEP_SIGN_UP;
}
function ComponentStep(props: IComponentStepProps) {
	switch (props.step) {
		case STEP_SIGN_UP.VERIFY: {
			return <OTPSignUp onSubmit={props.onSubmitOTP} />;
		}
		case STEP_SIGN_UP.INFORMATION: {
			return <InformationSignUp />;
		}
		default: {
			return (
				<SignUpUser
					onSignUpWithGGSuccess={props.onLoginWithGoogleSuccess}
					onSignUpSuccess={props.onSubmitFormUser}
				/>
			);
		}
	}
}

interface IViewProps {
	onSubmitFormUser: VoidFunction;
	onSubmitOTP: VoidFunction;
	onLoginWithGoogleSuccess: VoidFunction;
	step: STEP_SIGN_UP;
}
function View(props: IViewProps) {
	return <ComponentStep {...props} />;
}

export default View;
