import { ResponseBrowser, ResponseHasResponseProps } from '../types';
import Config from '@/configs';
import { AxiosRequestConfig } from 'axios';
import { requestMiddleware } from '@/middlewares/request';
import { Logger } from '@/utils/logger';
import { CODE, parseCodeToNameFunc } from '@/configs/responseCode';
import { Helper } from '@/utils/helper';
import AuthService from '@/utils/auth';
const config = new Config().getState();

export type ResponsePlaylist = {
	playlistId: string;
	namePlaylist: string;
	image: string;
	userId: string;
	songs: SongOfPlaylistsMe[];
	viewSaves: number;
	status: number;
	theme: string;
	descriptionPlaylist: string;
};
export interface SongOfPlaylistsMe {
	songName: string;
	image: string;
	link: string;
	songId: string;
	type: number;
	duration: number;
	singers: SingerOfPlaylistsMe[];
}
export interface SingerOfPlaylistsMe {
	singerName: string;
	singerAvatar: string;
	singerId: string;
	status: number;
	followers: number;
}


function Me({ defaultLoading = false, ...props }: ResponseHasResponseProps) {
	const auth = AuthService.getPackageAuth();
	const request: AxiosRequestConfig = {
		url: config.api.playlist.me,
		method: 'get',
		headers: {
			token: auth?.token,
		},
	};
	const { mutate } = requestMiddleware({
		keyQuery: ['PLAYLIST_GET'],
		request,
	});

	const onGet = () => {
		mutate({}, {
			onSuccess: (data: ResponseBrowser) => {
				Logger.debug('ServicePlaylistGet execute handleMutate success', data);
				const funcName = parseCodeToNameFunc[data.code as unknown as CODE];
				const hasFunc = Helper.isEmpty(props?.[funcName as string]);
				if (!hasFunc) {
					props?.[funcName as string](data?.data);
				}
			},
			onError: (error: unknown) => {
				Logger.error('ServicePlaylistGet execute handleMutate success', error as object);
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

export default Me;
