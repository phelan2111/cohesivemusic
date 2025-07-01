import { ResponsePlaylist } from '@/services/playlist/useGet';
import { ResponseSinger } from '@/services/singer/get';
import { ResponseRequest } from '@/services/types';

export type ResponseYourTopMixes = {
	playlistResponse: ResponseRequest<ResponsePlaylist>;
	loading: boolean;
};

export type ResponseSingerNewest = {
	singerResponse: ResponseRequest<ResponseSinger>;
	loading: boolean;
};
