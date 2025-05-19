import View from './view';
import { useState } from 'react';
import { STEP_SIGN_UP } from './types';
import { useRedirect } from '@/hooks/useRedirect';
import { PATH } from '@/routes/config';

function Controller() {
	const [step, setStep] = useState<STEP_SIGN_UP>(STEP_SIGN_UP.USER_NAME);
	const { redirectPage } = useRedirect();

	const handleSubmitFormUser = () => {
		setStep(STEP_SIGN_UP.VERIFY);
	};
	const handleSubmitFormOTP = () => {
		setStep(STEP_SIGN_UP.INFORMATION);
	};
	const handleSignUpWithGGSuccess = () => {
		redirectPage(PATH.HOME);
	};

	return (
		<View
			step={step}
			onSubmitFormUser={handleSubmitFormUser}
			onSubmitOTP={handleSubmitFormOTP}
			onLoginWithGoogleSuccess={handleSignUpWithGGSuccess}
		/>
	);
}

export default Controller;
