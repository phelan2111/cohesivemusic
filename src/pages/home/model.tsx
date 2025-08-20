import { sliceMe } from '@/redux/slice';
import { FuncRequest, ResponseSingerNewest, ResponseSongNewest, ResponseYourTopMixes } from './types';
import View from './view';
import { useRedirect } from '@/hooks/useRedirect';
import usePlay from '@/hooks/usePlay';
import { Logger } from '@/utils/logger';

interface IModelProps {
	yourTopMixes: ResponseYourTopMixes;
	singersNewest: ResponseSingerNewest;
	songsNewest: ResponseSongNewest;
	MVNewest: ResponseSongNewest;
	addPlaylist: FuncRequest;
	updatePlaylist: FuncRequest;
	getPlaylistOfMe: FuncRequest;
	createPlaylistOfMe: FuncRequest;
}
function Model(props: IModelProps) {
	const { redirectPage } = useRedirect();
	const { playlistMe } = sliceMe.useGetState();
	const { handler, state } = usePlay();

	const playSong = (songId: string) => {
		try {
			Logger.info('Model execute playPlaylist');
			Logger.debug('Model execute playPlaylist have songId', songId);
			handler.playSong(songId);
		} catch (error) {
			Logger.debug('Model execute playPlaylist error', error as object);
		}
	};
	const pauseSong = () => {
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
	return (
		<View
			{...props}
			handler={{
				onRedirect: (path) => redirectPage(path),
				createPlaylist: props.createPlaylistOfMe.handler.request,
				playlistMe: props.getPlaylistOfMe.handler.request,
				updateSongToPlaylist: props.updatePlaylist.handler.request,
				addSongToPlaylist: props.addPlaylist.handler.request,
				playSong,
				pauseSong,
			}}
			state={{
				playlistMeResponse: playlistMe,
				isPause: state.isPlay,
				songId: state.songId,
			}}
		/>
	);
}

export default Model;
