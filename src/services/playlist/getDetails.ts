import { ResponseBrowser, ResponseHasResponseProps } from '../types';
import Config from '@/configs';
import { AxiosRequestConfig } from 'axios';
import { requestMiddleware } from '@/middlewares/request';
import { Logger } from '@/utils/logger';
import { CODE, parseCodeToNameFunc } from '@/configs/responseCode';
import { Helper } from '@/utils/helper';
import AuthService from '@/utils/auth';
import { TypeSongBelongUser } from '@/utils/enums';
const config = new Config().getState();

export type PayloadPlaylistGetDetails = {
	playlistId: string;
};
export type ResponsePlaylistDetails = {
	playlistId: string;
	namePlaylist: string;
	descriptionPlaylist: string;
	image: string;
	userId: string;
	updatedAt: string;
	createdAt: string;
	songs: SongOfPlaylist[];
	viewSaves: number;
	status: number;
	theme: string;
};

export interface SongOfPlaylist {
	songName: string;
	image: string;
	songDescription: string;
	link: string;
	views: number;
	status: number;
	songId: string;
	duration: number;
	type: number;
	isBelong?: TypeSongBelongUser;
	singers: SingerOfPlaylist[];
}

export interface SingerOfPlaylist {
	singerName: string;
	singerAvatar: string;
	singerId: string;
	status: number;
	followers: number;
}

export const initialPlaylistDetails: ResponsePlaylistDetails = {
	createdAt: '',
	descriptionPlaylist: '',
	image: '',
	namePlaylist: '',
	playlistId: '',
	songs: [],
	status: 0,
	theme: '',
	updatedAt: '',
	userId: '',
	viewSaves: 0,
};

function Details({ defaultLoading = false, ...props }: ResponseHasResponseProps) {
	const auth = AuthService.getPackageAuth();
	const request: AxiosRequestConfig = {
		url: config.api.playlist.details,
		method: 'get',
		headers: {
			token: auth.token,
		},
	};
	const { mutate } = requestMiddleware({
		keyQuery: ['PLAYLIST_GET_DETAILS'],
		request,
	});

	const onGet = (payload: PayloadPlaylistGetDetails) => {
		mutate(payload, {
			onSuccess: (data: ResponseBrowser) => {
				Logger.debug('Service details execute handleMutate success', data);
				const funcName = parseCodeToNameFunc[data.code as unknown as CODE];
				const hasFunc = Helper.isEmpty(props?.[funcName as string]);
				if (!hasFunc) {
					props?.[funcName as string](data?.data);
				}
			},
			onError: (error: unknown) => {
				Logger.error('Service details execute handleMutate success', error as object);
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

export default Details;
