import { useState } from 'react';
import { ResponseBrowser, ResponseHasResponseProps } from '../types';
import Config from '@/configs';
import { AxiosRequestConfig } from 'axios';
import { requestMiddleware } from '@/middlewares/request';
import { Logger } from '@/utils/logger';
import { CODE, parseCodeToNameFunc } from '@/configs/responseCode';
import { Helper } from '@/utils/helper';
const config = new Config().getState();

export type PayloadPlaylistByUser = {
	userId: string;
};

function ByUser({ defaultLoading = false, ...props }: ResponseHasResponseProps) {
	const [loading, setLoading] = useState<boolean>(defaultLoading as boolean);
	const request: AxiosRequestConfig = {
		url: config.api.playlist.byUser,
		method: 'post',
	};
	const { mutate } = requestMiddleware({
		keyQuery: ['PLAYLIST_BY_USER'],
		request,
	});

	const onGet = (payload: PayloadPlaylistByUser) => {
		setLoading(true);
		mutate(payload, {
			onSuccess: (data: ResponseBrowser) => {
				Logger.debug('ServicePlaylistByUser execute handleMutate success', data);
				const funcName = parseCodeToNameFunc[data.code as unknown as CODE];
				const hasFunc = Helper.isEmpty(props?.[funcName as string]);
				if (!hasFunc) {
					props?.[funcName as string](data?.data);
				}
				setLoading(false);
			},
			onError: (error: unknown) => {
				Logger.error('ServicePlaylistByUser execute handleMutate success', error as object);
				props?.onError?.(error);
			},
		});
	};

	return {
		variable: {
			loading,
		},
		handlerService: {
			onGet,
		},
	};
}

export default ByUser;
