/* eslint-disable react-hooks/rules-of-hooks */
import Config from '@/configs';
import { CODE, parseCodeToNameFunc } from '@/configs/responseCode';
import { requestMiddleware } from '@/middlewares/request';
import { Helper } from '@/utils/helper';
import { Logger } from '@/utils/logger';
import type { AxiosRequestConfig } from 'axios';
import { ResponseBrowser, ResponseHasResponseProps } from '../types';
import { useState } from 'react';

const config = new Config().getState();

export type PayloadForgot = {
	email: string;
};

function Forgot({ defaultLoading = false, ...props }: ResponseHasResponseProps) {
	const [loading, setLoading] = useState<boolean>(defaultLoading as boolean);
	const request: AxiosRequestConfig = {
		url: config.api.user.forgot,
		method: 'post',
	};

	const { mutate } = requestMiddleware({
		keyQuery: ['FORGOT'],
		request,
	});

	const onLogin = (payload: PayloadForgot) => {
		setLoading(true);
		mutate(payload, {
			onSuccess: (data: ResponseBrowser) => {
				Logger.debug('ServiceUserForgot execute handleMutate success', data);
				const funcName = parseCodeToNameFunc[data.code as unknown as CODE];
				const hasFunc = Helper.isEmpty(props?.[funcName as string]);
				if (!hasFunc) {
					props?.[funcName as string](data?.data);
				}
				setLoading(false);
			},
			onError: (error: unknown) => {
				Logger.error('ServiceUserForgot execute handleMutate success', error as object);
				props?.onError?.(error);
			},
		});
	};

	return {
		variable: {
			loading,
		},
		handlerService: {
			onLogin,
		},
	};
}

export default Forgot;
