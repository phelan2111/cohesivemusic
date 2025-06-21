export enum STEP_SIGN_UP {
	USER_NAME = 0,
	VERIFY,
	INFORMATION,
}

export type FormDataUserSignUp = {
	username: string;
};

export type FormDataOTPSignUp = {
	otp: string;
};

export type FormDataInformation = {
	firstName: string;
	lastName: string;
	password: string;
};