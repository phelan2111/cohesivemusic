import { ResponsePlaylist } from '@/services/playlist/useGet';
import { ResponseRequest } from '@/services/types';

export type ResponseYourTopMixes = {
	playlistResponse: ResponseRequest<ResponsePlaylist>;
	loading: boolean;
};
