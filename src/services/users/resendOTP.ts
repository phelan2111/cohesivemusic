/* eslint-disable react-hooks/rules-of-hooks */
import Config from '@/configs';
import { CODE, parseCodeToNameFunc } from '@/configs/responseCode';
import { requestMiddleware } from '@/middlewares/request';
import { Helper } from '@/utils/helper';
import { Logger } from '@/utils/logger';
import type { AxiosRequestConfig } from 'axios';
import { initialResponseNotData, ResponseBrowser, ResponseHasResponseProps, ResponseNotData } from '../types';
import { useState } from 'react';

const config = new Config().getState();
export type ResponseResendOTP = {
	email: string;
	token: string;
};
export type PayloadResendOTP = {
	otp: string;
};

function ResendOTP({ defaultLoading = false, defaultState = initialResponseNotData, ...props }: ResponseHasResponseProps) {
	const [loading, setLoading] = useState<boolean>(defaultLoading as boolean);
	const request: AxiosRequestConfig = {
		url: config.api.user.resendOTP,
		method: 'post',
	};
	const [response, setResponse] = useState<ResponseNotData>(defaultState as ResponseNotData);

	const { mutate } = requestMiddleware({
		keyQuery: ['VERIFY_OTP'],
		request,
	});

	const onResendOTP = (payload: PayloadResendOTP) => {
		setLoading(true);
		mutate(payload, {
			onSuccess: (data: ResponseBrowser) => {
				Logger.debug('ServiceUserResendOTP execute handleMutate success', data);
				const funcName = parseCodeToNameFunc[data.code as unknown as CODE];
				const hasFunc = Helper.isEmpty(props?.[funcName as string]);
				if (!hasFunc) {
					props?.[funcName as string](data?.data);
				}
				setResponse(data.data as ResponseNotData);
				setLoading(false);
			},
			onError: (error: unknown) => {
				Logger.error('ServiceUserResendOTP execute handleMutate success', error as object);
				props?.onError?.(error);
			},
		});
	};

	return {
		variable: {
			loading,
			response,
		},
		handlerService: {
			onResendOTP,
		},
	};
}

export default ResendOTP;
