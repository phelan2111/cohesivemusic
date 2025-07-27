import { ResponseBrowser, ResponseHasResponseProps } from '../types';
import Config from '@/configs';
import { AxiosRequestConfig } from 'axios';
import { requestMiddleware } from '@/middlewares/request';
import { Logger } from '@/utils/logger';
import { CODE, parseCodeToNameFunc } from '@/configs/responseCode';
import { Helper } from '@/utils/helper';
import AuthService from '@/utils/auth';
import { TypeSongs } from '@/utils/enums';
const config = new Config().getState();

export type PayloadSongsDetailsShort = {
	songId: string;
};
export type ResponseSong = {
	songName: string;
	image: string;
	link: string;
	songId: string;
	type: TypeSongs;
	duration: number;
	singers: ItemSinger[];
};

export interface ItemSinger {
	singerId: string;
	singerName: string;
}

export const initialDetailsShortSong: ResponseSong = {
	duration: 0,
	image: '',
	link: '',
	singers: [],
	songId: '',
	songName: '',
	type: TypeSongs.mp3
}

function DetailsShort({ defaultLoading = false, ...props }: ResponseHasResponseProps) {
	const auth = AuthService.getPackageAuth();
	const request: AxiosRequestConfig = {
		url: config.api.song.short,
		method: 'get',
		headers: {
			token: auth?.token,
		},
	};
	const { mutate } = requestMiddleware({
		keyQuery: ['SONGS_GET_DETAILS'],
		request,
	});

	const onGet = (payload: PayloadSongsDetailsShort) => {
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

export default DetailsShort;
