/* eslint-disable react-hooks/rules-of-hooks */
import Config from '@/configs';
import { CODE, parseCodeToNameFunc } from '@/configs/responseCode';
import { requestMiddleware } from '@/middlewares/request';
import { Helper } from '@/utils/helper';
import { Logger } from '@/utils/logger';
import type { AxiosRequestConfig } from 'axios';
import { initialResponseNotData, ResponseBrowser, ResponseDataNotList, ResponseHasResponseProps, ResponseNotData } from '../types';
import { useState } from 'react';
import { Gender } from '@/utils/enums';

const config = new Config().getState();

export type PayloadLogin = {
	password: string;
	email: string;
};
export type InfoOfResponseLogin = {
	email: string;
	firstName: string;
	lastName: string;
	gender: Gender;
	playlistId: string;
	avatar?: string;
};
export type ResponseLogin = {
	info: InfoOfResponseLogin;
	token: string;
};

const initial = {
	...initialResponseNotData,
	info: {
		email: '',
		firstName: '',
		lastName: '',
		gender: Gender.female,
		playlistId: '',
		avatar: '',
	},
	token: '',
};
function Login({ defaultLoading = false, defaultState = initial, ...props }: ResponseHasResponseProps) {
	const [loading, setLoading] = useState<boolean>(defaultLoading as boolean);
	const request: AxiosRequestConfig = {
		url: config.api.user.login,
		method: 'post',
	};
	const [response, setResponse] = useState<ResponseDataNotList<ResponseLogin>>(defaultState as ResponseDataNotList<ResponseLogin>);

	const { mutate } = requestMiddleware({
		keyQuery: ['LOGIN'],
		request,
	});

	const onLogin = (payload: PayloadLogin) => {
		setLoading(true);
		mutate(payload, {
			onSuccess: (data: ResponseBrowser) => {
				Logger.debug('ServiceUserRegister execute handleMutate success', data);
				const funcName = parseCodeToNameFunc[data.code as unknown as CODE];
				const hasFunc = Helper.isEmpty(props?.[funcName as string]);
				if (!hasFunc) {
					props?.[funcName as string](data?.data);
				}
				setResponse(data.data as ResponseNotData);
				setLoading(false);
			},
			onError: (error: unknown) => {
				Logger.error('ServiceUserRegister execute handleMutate success', error as object);
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
			onLogin,
		},
	};
}

export default Login;
