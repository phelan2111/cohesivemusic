export enum CODE {
	success = '200',
	errorMailSystem = '403_EMAIL',
	userHadNotExistedInSystem = '404_EXISTED_IN_SYSTEM',
	wrongPassword = '405_WRONG_PASSWORD',
	unauthorized = '401_AUTH',
	otpNotMatch = '404_NOT_MATCH',
	systemError = '405_SYSTEM',
	userExistedInSystem = '402',
}

export const parseCodeToNameFunc: Record<CODE, string> = {
	[CODE.success]: 'onSuccess',
	[CODE.errorMailSystem]: 'onErrorMailSystem',
	[CODE.otpNotMatch]: 'onOTPNotMatch',
	[CODE.systemError]: 'onSystemError',
	[CODE.unauthorized]: 'onExpiredToken',
	[CODE.userHadNotExistedInSystem]: 'onHadNotExistedInSystem',
	[CODE.wrongPassword]: 'onWrongPassword',
	[CODE.userExistedInSystem]: 'onUserExistedInSystem',
};
