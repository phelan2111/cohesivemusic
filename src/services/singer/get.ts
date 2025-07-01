import { ResponseBrowser, ResponseHasResponseProps } from '../types';
import Config from '@/configs';
import { AxiosRequestConfig } from 'axios';
import { requestMiddleware } from '@/middlewares/request';
import { Logger } from '@/utils/logger';
import { CODE, parseCodeToNameFunc } from '@/configs/responseCode';
import { Helper } from '@/utils/helper';
import AuthService from '@/utils/auth';
const config = new Config().getState();

export type PayloadSongsGet = {
	limit?: number;
	from: number;
};
export type ResponseSinger = {
	createdAt: string;
	updatedAt: string;
	singerName: string;
	singerAvatar: string;
	singerCover: string[];
	singerDescription: string;
	followers: number;
	status: number;
	singerId: string;
	socials: ItemSocials;
};

export type ItemSocials = {
	facebook: string;
	instagram: string;
};

function Get({ defaultLoading = false, ...props }: ResponseHasResponseProps) {
	const auth = AuthService.getPackageAuth();
	const request: AxiosRequestConfig = {
		url: config.api.singer._,
		method: 'get',
		headers: {
			token: auth?.token,
		},
	};
	const { mutate } = requestMiddleware({
		keyQuery: ['SONGS_GET'],
		request,
	});

	const onGet = (payload: PayloadSongsGet) => {
		mutate(payload, {
			onSuccess: (data: ResponseBrowser) => {
				Logger.debug('ServiceSongsGet execute handleMutate success', data);
				const funcName = parseCodeToNameFunc[data.code as unknown as CODE];
				const hasFunc = Helper.isEmpty(props?.[funcName as string]);
				if (!hasFunc) {
					props?.[funcName as string](data?.data);
				}
			},
			onError: (error: unknown) => {
				Logger.error('ServiceSongsGet execute handleMutate success', error as object);
				props?.onError?.(error);
			},
		});
	};

	return {
		handlerService: {
			onGet,
		},
	};
}

export default Get;
