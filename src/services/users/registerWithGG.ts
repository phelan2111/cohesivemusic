/* eslint-disable react-hooks/rules-of-hooks */
import Config from '@/configs';
import { CODE, parseCodeToNameFunc } from '@/configs/responseCode';
import { requestMiddleware } from '@/middlewares/request';
import { Helper } from '@/utils/helper';
import { Logger } from '@/utils/logger';
import type { AxiosRequestConfig } from 'axios';
import {
	ResponseBrowser,
	ResponseHasResponseProps,
	ResponseNotData,
} from '../types';
import { useState } from 'react';
import { IProfileUser } from '@/utils/auth';

const config = new Config().getState();

export type PayloadRegisterWithGG = {
	token: string;
};

export type ResponseRegisterWithGG = {
	data?: {
		token: string;
		info: IProfileUser;
	};
} & ResponseNotData;

const initialRegisterWithGG: ResponseRegisterWithGG = {
	code: CODE.success,
	mess: '',
};

function registerWithGG({
	defaultLoading = false,
	defaultState = initialRegisterWithGG,
	...props
}: ResponseHasResponseProps) {
	const [loading, setLoading] = useState<boolean>(defaultLoading as boolean);

	const [response, setResponse] = useState<ResponseRegisterWithGG>(
		defaultState as ResponseRegisterWithGG,
	);

	const onRegisterWithGG = (payload: PayloadRegisterWithGG) => {
		setLoading(true);
		const request: AxiosRequestConfig = {
			url: config.api.user.registerWithGG,
			method: 'get',
			headers: {
				token: payload.token,
			},
		};
		const { mutate } = requestMiddleware({
			keyQuery: ['REGISTER_WITH_GOOGLE'],
			request,
		});
		mutate(
			{},
			{
				onSuccess: (data: ResponseBrowser) => {
					Logger.debug(
						'ServiceUserRegisterWithGG execute handleMutate success',
						data,
					);
					const funcName =
						parseCodeToNameFunc[data.code as unknown as CODE];
					const hasFunc = Helper.isEmpty(props?.[funcName as string]);
					if (!hasFunc) {
						props?.[funcName as string](data?.data);
					}
					setResponse(data.data as ResponseRegisterWithGG);
					setLoading(false);
				},
				onError: (error: unknown) => {
					Logger.error(
						'ServiceUserRegisterWithGG execute handleMutate success',
						error as object,
					);
					props?.onError?.(error);
				},
			},
		);
	};

	return {
		variable: {
			loading,
			response,
		},
		handler: {
			onRegisterWithGG,
		},
	};
}

export default registerWithGG;
