import AuthService from '@/utils/auth';
import { useState } from 'react';
import { ResponseBrowser, ResponseHasResponseProps } from '../types';
import { AxiosRequestConfig } from 'axios';
import Config from '@/configs';
import { requestMiddleware } from '@/middlewares/request';
import { Logger } from '@/utils/logger';
import { CODE, parseCodeToNameFunc } from '@/configs/responseCode';
import { Helper } from '@/utils/helper';
const config = new Config().getState();

export type PayloadCreatePlaylist = {
	songId: string,
	image: string;
	namePlaylist: string;
	descriptionPlaylist: string;
};

function Create({ defaultLoading = false, ...props }: ResponseHasResponseProps) {
	const auth = AuthService.getPackageAuth();
	const [loading, setLoading] = useState<boolean>(defaultLoading as boolean);
	const request: AxiosRequestConfig = {
		url: config.api.playlist.createByASong,
		method: 'post',
		headers: {
			token: auth?.token,
		},
	};
	const { mutate } = requestMiddleware({
		keyQuery: ['PLAYLIST_CREATE'],
		request,
	});

    const onRequest = (payload: PayloadCreatePlaylist) => {
            setLoading(true);
            mutate(payload, {
                onSuccess: (data: ResponseBrowser) => {
                    Logger.debug('ServicePlaylistAdd execute handleMutate success', data);
                    const funcName = parseCodeToNameFunc[data.code as unknown as CODE];
                    const hasFunc = Helper.isEmpty(props?.[funcName as string]);
                    if (!hasFunc) {
                        props?.[funcName as string](data?.data);
                    }
                    setLoading(false);
                },
                onError: (error: unknown) => {
                    Logger.error('ServicePlaylistAdd execute handleMutate success', error as object);
                    props?.onError?.(error);
                },
            });
        };

	return {
        state: {
			loading,
		},
		handlerService: {
			onRequest,
		},
    };
}

export default Create;
