import { Services } from '@/services';
import View from './view';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { initialPlaylistDetails, ResponsePlaylistDetails } from '@/services/playlist/getDetails';
import useLoading from '@/hooks/useLoading';
import { useRedirect } from '@/hooks/useRedirect';
import { PATH } from '@/routes/config';
import { PayloadPlaylistUpdate } from '@/services/playlist/update';
import { Logger } from '@/utils/logger';
import usePlay from '@/hooks/usePlay';

type ParamsPlaylistDetails = {
	id: string;
};
function Model() {
	const [playlistDetails, setPlaylistDetails] = useState<ResponsePlaylistDetails>(initialPlaylistDetails);
	const { handlerLoading, stateLoading } = useLoading({ defaultLoading: true });
	const { handlerService } = Services.Playlist.Details({
		onSuccess: (dataRes) => {
			setPlaylistDetails(dataRes);
			handlerLoading.onSetLoading(false);
		},
	});
	const { handlerService: handlerServiceAdd } = Services.Playlist.Update({
		onSuccess: () => {},
	});
	const params = useParams() as ParamsPlaylistDetails;
	const { redirectPage } = useRedirect();
	const { handler, state } = usePlay();

	const onFindSongs = () => {
		redirectPage(PATH.SEARCH);
	};
	const updateSongToPlaylist = (dataItem: PayloadPlaylistUpdate) => {
		handlerServiceAdd.onUpdate(dataItem);
	};
	const playPlaylist = (songId: string) => {
		try {
			Logger.info('Model execute playPlaylist');
			Logger.debug('Model execute playPlaylist have songId', songId);
			const playlist = playlistDetails.songs.map((i) => i.songId);
			handler.playAlbum(songId, playlist);
		} catch (error) {
			Logger.debug('Model execute playPlaylist error', error as object);
		}
	};
	const pausePlaylist = () => {
		try {
			Logger.info('Model execute pausePlaylist');
			const audioE = document.querySelector('#toolSong') as HTMLAudioElement;
			if (!audioE) {
				throw new Error('Not found element');
			}
			handler.pause(audioE.currentTime);
		} catch (error) {
			Logger.debug('Model execute pausePlaylist error', error as object);
		}
	};

	useEffect(() => {
		handlerLoading.onSetLoading(true);
		handlerService.onGet({
			playlistId: params.id,
		});
	}, [params]);

	return (
		<View
			state={{
				loading: stateLoading.loading,
				playlistDetails,
				songId: state.songId,
				isPause: state.isPlay,
			}}
			handler={{
				onFindSongs,
				updateSongToPlaylist,
				playPlaylist,
				pausePlaylist,
			}}
		/>
	);
}

export default Model;
