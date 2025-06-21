import View from './view';
import { useState } from 'react';
import { FormDataInformation, FormDataOTPSignUp, FormDataUserSignUp, STEP_SIGN_UP } from './types';
import { useRedirect } from '@/hooks/useRedirect';
import { PATH } from '@/routes/config';
import { Logger } from '@/utils/logger';
import { ResponseVerifyUsername } from '@/services/users/verifyUsername';

export type FormState = {
	formOTP: FormDataOTPSignUp;
	formUsername: FormDataUserSignUp;
	formInfo: FormDataInformation;
};
export type ResponseState = {
	responseVerify: ResponseVerifyUsername;
};
const initial: FormState = {
	formInfo: {
		firstName: '',
		lastName: '',
		password: '',
	},
	formOTP: {
		otp: '',
	},
	formUsername: {
		username: '',
	},
};
const initialResponse: ResponseState = {
	responseVerify: {
		email: '',
		token: '',
	},
};
function Controller() {
	const [step, setStep] = useState<STEP_SIGN_UP>(STEP_SIGN_UP.USER_NAME);
	const [formState, setFormState] = useState<FormState>(initial);
	const [responseState, setResponseState] = useState<ResponseState>(initialResponse);
	const { redirectPage } = useRedirect();

	const onSubmitFormUser = (dataForm?: FormDataUserSignUp) => {
		Logger.debug('Controller execute onSubmitFormUser have variable', dataForm as object);
		setStep(STEP_SIGN_UP.VERIFY);
		setFormState((prev) => ({
			...prev,
			formUsername: dataForm as FormDataUserSignUp,
		}));
	};
	const onRequestVerifyUserSuccess = (response: ResponseVerifyUsername) => {
		Logger.debug('Controller execute onRequestVerifyUserSuccess have variable', response as object);
		setResponseState((prev) => ({ ...prev, responseVerify: response }));
	};
	const onSubmitOTP = (dataForm?: FormDataOTPSignUp) => {
		Logger.debug('Controller execute onSubmitOTP have variable', dataForm as object);
		setStep(STEP_SIGN_UP.INFORMATION);
		setFormState((prev) => ({
			...prev,
			formOTP: dataForm as FormDataOTPSignUp,
		}));
	};
	const onSubmitInformation = (dataForm?: FormDataInformation) => {
		Logger.debug('Controller execute onSubmitInformation have variable', dataForm as object);
		setFormState((prev) => ({
			...prev,
			formInfo: dataForm as FormDataInformation,
		}));
	};
	const onLoginWithGoogleSuccess = () => {
		Logger.info('Controller execute onLoginWithGoogleSuccess have variable');
		redirectPage(PATH.HOME);
	};

	return (
		<View
			step={step}
			state={{
				form: formState,
				response: responseState,
			}}
			handler={{
				form: {
					onLoginWithGoogleSuccess,
					onSubmitFormUser,
					onSubmitInformation,
					onSubmitOTP,
				},
				request: {
					onRequestVerifyUserSuccess,
				},
			}}
		/>
	);
}

export default Controller;
