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
export type ResponseVerifyUsername = {
	email: string;
	token: string;
};
export type PayloadVerifyUsername = {
	email: string;
};

function VerifyUsername({ defaultLoading = false, defaultState = initialResponseNotData, ...props }: ResponseHasResponseProps) {
	const [loading, setLoading] = useState<boolean>(defaultLoading as boolean);
	const request: AxiosRequestConfig = {
		url: config.api.user.verifyUsername,
		method: 'post',
	};
	const [response, setResponse] = useState<ResponseNotData>(defaultState as ResponseNotData);

	const { mutate } = requestMiddleware({
		keyQuery: ['VERIFY_USERNAME'],
		request,
	});

	const onVerifyUsername = (payload: PayloadVerifyUsername) => {
		setLoading(true);
		mutate(payload, {
			onSuccess: (data: ResponseBrowser) => {
				Logger.debug('ServiceUserVerifyUsername execute handleMutate success', data);
				const funcName = parseCodeToNameFunc[data.code as unknown as CODE];
				const hasFunc = Helper.isEmpty(props?.[funcName as string]);
				if (!hasFunc) {
					props?.[funcName as string](data?.data);
				}
				setResponse(data.data as ResponseNotData);
				setLoading(false);
			},
			onError: (error: unknown) => {
				Logger.error('ServiceUserVerifyUsername execute handleMutate success', error as object);
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
			onVerifyUsername,
		},
	};
}

export default VerifyUsername;
