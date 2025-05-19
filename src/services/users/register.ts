/* eslint-disable react-hooks/rules-of-hooks */
import Config from '@/configs';
import { CODE, parseCodeToNameFunc } from '@/configs/responseCode';
import { requestMiddleware } from '@/middlewares/request';
import { Helper } from '@/utils/helper';
import { Logger } from '@/utils/logger';
import type { AxiosRequestConfig } from 'axios';
import {
	initialResponseNotData,
	ResponseBrowser,
	ResponseHasResponseProps,
	ResponseNotData,
} from '../types';
import { useState } from 'react';

const config = new Config().getState();

export type PayloadRegister = {
	password: string;
	firstName: string;
	lastName: string;
};

function register({
	defaultLoading = false,
	defaultState = initialResponseNotData,
	...props
}: ResponseHasResponseProps) {
	const [loading, setLoading] = useState<boolean>(defaultLoading as boolean);
	const request: AxiosRequestConfig = {
		url: config.api.user.register,
		method: 'post',
	};
	const [response, setResponse] = useState<ResponseNotData>(
		defaultState as ResponseNotData,
	);

	const { mutate } = requestMiddleware({
		keyQuery: ['REGISTER'],
		request,
	});

	const onRegister = (payload: PayloadRegister) => {
		setLoading(true);
		mutate(payload, {
			onSuccess: (data: ResponseBrowser) => {
				Logger.debug(
					'ServiceUserRegister execute handleMutate success',
					data,
				);
				const funcName =
					parseCodeToNameFunc[data.code as unknown as CODE];
				const hasFunc = Helper.isEmpty(props?.[funcName as string]);
				if (!hasFunc) {
					props?.[funcName as string](data?.data);
				}
				setResponse(data.data as ResponseNotData);
				setLoading(false);
			},
			onError: (error: unknown) => {
				Logger.error(
					'ServiceUserRegister execute handleMutate success',
					error as object,
				);
				props?.onError?.(error);
			},
		});
	};

	return {
		variable: {
			loading,
			response,
		},
		handler: {
			onRegister,
		},
	};
}

export default register;
