import { ResponseBrowser, ResponseHasResponseProps } from '../types';
import Config from '@/configs';
import { AxiosRequestConfig } from 'axios';
import { requestMiddleware } from '@/middlewares/request';
import { Logger } from '@/utils/logger';
import { CODE, parseCodeToNameFunc } from '@/configs/responseCode';
import { Helper } from '@/utils/helper';
import AuthService from '@/utils/auth';
const config = new Config().getState();

export type PayloadSongsUpdateView = {
	songId: string;
};


function UpdateView({ defaultLoading = false, ...props }: ResponseHasResponseProps) {
	const auth = AuthService.getPackageAuth();
	const request: AxiosRequestConfig = {
		url: config.api.song.updateView,
		method: 'post',
		headers: {
			token: auth?.token,
		},
	};
	const { mutate } = requestMiddleware({
		keyQuery: ['SONGS_UPDATE_VIEW'],
		request,
	});

	const onRequest = (payload: PayloadSongsUpdateView) => {
		mutate(payload, {
			onSuccess: (data: ResponseBrowser) => {
				Logger.debug('ServiceUpdateSongView execute handleMutate success', data);
				const funcName = parseCodeToNameFunc[data.code as unknown as CODE];
				const hasFunc = Helper.isEmpty(props?.[funcName as string]);
				if (!hasFunc) {
					props?.[funcName as string](data?.data);
				}
			},
			onError: (error: unknown) => {
				Logger.error('ServiceUpdateSongView execute handleMutate success', error as object);
				props?.onError?.(error);
			},
		});
	};

	return {
		handlerService: {
			onRequest,
		},
	};
}

export default UpdateView;
