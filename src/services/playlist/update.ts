import { useState } from 'react';
import { ResponseBrowser, ResponseHasResponseProps } from '../types';
import Config from '@/configs';
import { AxiosRequestConfig } from 'axios';
import { requestMiddleware } from '@/middlewares/request';
import { Logger } from '@/utils/logger';
import { CODE, parseCodeToNameFunc } from '@/configs/responseCode';
import { Helper } from '@/utils/helper';
import AuthService from '@/utils/auth';
const config = new Config().getState();

export type PayloadPlaylistUpdate = {
	songId: string;
	playlistId?: string;
};

function Update({ defaultLoading = false, ...props }: ResponseHasResponseProps) {
	const auth = AuthService.getPackageAuth();
	const [loading, setLoading] = useState<boolean>(defaultLoading as boolean);
	const request: AxiosRequestConfig = {
		url: config.api.playlist.update,
		method: 'post',
		headers: {
			token: auth?.token,
		},
	};
	const { mutate } = requestMiddleware({
		keyQuery: ['PLAYLIST_UPDATE'],
		request,
		
	});

	const onUpdate = (payload: PayloadPlaylistUpdate) => {
		setLoading(true);
		mutate(payload, {
			onSuccess: (data: ResponseBrowser) => {
				Logger.debug('ServicePlaylistUpdate execute handleMutate success', data);
				const funcName = parseCodeToNameFunc[data.code as unknown as CODE];
				const hasFunc = Helper.isEmpty(props?.[funcName as string]);
				if (!hasFunc) {
					props?.[funcName as string](data?.data);
				}
				setLoading(false);
			},
			onError: (error: unknown) => {
				Logger.error('ServicePlaylistUpdate execute handleMutate success', error as object);
				props?.onError?.(error);
			},
		});
	};

	return {
		variable: {
			loading,
		},
		handlerService: {
			onUpdate,
		},
	};
}

export default Update;
