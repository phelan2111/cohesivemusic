import View from './view';
import { useState } from 'react';
import { FormDataInformation, FormDataOTPSignUp, FormDataUserSignUp, STEP_SIGN_UP } from './types';
import { useRedirect } from '@/hooks/useRedirect';
import { PATH } from '@/routes/config';
import { Logger } from '@/utils/logger';
import { ResponseVerifyUsername } from '@/services/users/verifyUsername';
import { ResponseVerifyOTP } from '@/services/users/verifyOTP';

export type FormState = {
	formOTP: FormDataOTPSignUp;
	formUsername: FormDataUserSignUp;
	formInfo: FormDataInformation;
};
export type ResponseState = {
	responseVerify: ResponseVerifyUsername;
	verifyOTP: ResponseVerifyOTP;
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
	verifyOTP: {
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
		setFormState((prev) => ({
			...prev,
			formUsername: dataForm as FormDataUserSignUp,
		}));
	};
	const onRequestVerifyUserSuccess = (response: ResponseVerifyUsername) => {
		Logger.debug('Controller execute onRequestVerifyUserSuccess have variable', response as object);
		setResponseState((prev) => ({ ...prev, responseVerify: response }));
		setStep(STEP_SIGN_UP.VERIFY);
	};
	const onSubmitOTP = (dataForm?: FormDataOTPSignUp) => {
		Logger.debug('Controller execute onSubmitOTP have variable', dataForm as object);
		setFormState((prev) => ({
			...prev,
			formOTP: dataForm as FormDataOTPSignUp,
		}));
	};
	const onRequestVerifyOTPSuccess = (response: ResponseVerifyOTP) => {
		Logger.debug('Controller execute onRequestVerifyOTPSuccess have variable', response as object);
		setResponseState((prev) => ({ ...prev, verifyOTP: response }));
		setStep(STEP_SIGN_UP.INFORMATION);
	};
	const onSubmitInformation = (dataForm?: FormDataInformation) => {
		Logger.debug('Controller execute onSubmitInformation have variable', dataForm as object);
		setFormState((prev) => ({
			...prev,
			formInfo: dataForm as FormDataInformation,
		}));
	};
	const onRequestRegisterSuccess = () => {
		Logger.info('Controller execute onRequestRegisterSuccess');
		redirectPage(PATH.KYC.SIGN_IN);
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
					onRequestVerifyOTPSuccess,
					onRequestRegisterSuccess,
				},
			}}
		/>
	);
}

export default Controller;
