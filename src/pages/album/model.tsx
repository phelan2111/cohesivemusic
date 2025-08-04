import { Services } from '@/services';
import View from './view';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { initialPlaylistDetails, ResponsePlaylistDetails } from '@/services/playlist/getDetails';
import useLoading from '@/hooks/useLoading';
import { useRedirect } from '@/hooks/useRedirect';
import { PATH } from '@/routes/config';
import { Logger } from '@/utils/logger';
import usePlay from '@/hooks/usePlay';
import { AddNewPlaylistFunc } from './types';
import { PayloadPlaylistAdd } from '@/services/playlist/addSongToPlaylist';
import { useDispatch } from 'react-redux';
import { sliceMe } from '@/redux/slice';
import { PayloadCreatePlaylist } from '@/services/playlist/create';
import { IItemSong } from '@/layout/desktop/album/components/list/song';
import AuthService from '@/utils/auth';

type ParamsPlaylistDetails = {
	id: string;
};
function Model() {
	const profile = AuthService.getPackageProfile();
	const [playlistDetails, setPlaylistDetails] = useState<ResponsePlaylistDetails>(initialPlaylistDetails);
	const dispatch = useDispatch();
	const { playlistMe } = sliceMe.useGetState();

	const { handlerLoading, stateLoading } = useLoading({ defaultLoading: true });
	const { handlerService } = Services.Playlist.Details({
		onSuccess: (dataRes) => {
			setPlaylistDetails(dataRes);
			handlerLoading.onSetLoading(false);
		},
	});
	const { handlerService: handlerServiceAddSongToPlaylist } = Services.Playlist.AddSongToPlaylist({
		onSuccess: () => {
			Logger.info('Model execute Services.Playlist.AddSongToPlaylist');
			playlistMeFunc();
		},
	});
	const { handlerService: handlerServiceUpdate } = Services.Playlist.UpdateSongToPlaylist({
		onSuccess: () => {
			Logger.info('Model execute Services.Playlist.UpdateSongToPlaylist');
			playlistMeFunc();
		},
	});
	const { handlerService: handlerServicesPlaylistMe } = Services.Playlist.Me({
		onSuccess: (dataItem) => {
			Logger.info('Model execute Services.Playlist.Me');
			dispatch(sliceMe.func.onSetData(dataItem));
		},
		defaultLoading: true,
	});
	const { handlerService: handlerServicesCreate } = Services.Playlist.Create({
		onSuccess: (dataItem) => {
			Logger.info('Model executeServices.Playlist.Create');
			Logger.debug('Model executeServices.Playlist.Create response:', dataItem);
			playlistMeFunc();
		},
		defaultLoading: true,
	});

	const params = useParams() as ParamsPlaylistDetails;
	const { redirectPage } = useRedirect();
	const { handler, state } = usePlay();

	const onFindSongs = () => {
		Logger.info('Model execute onFindSongs');
		redirectPage(PATH.SEARCH);
	};
	const addSongToPlaylist = (dataItem: PayloadPlaylistAdd) => {
		Logger.info('Model execute updateSongToPlaylist');
		Logger.debug('Model execute playPlaylist have data song', dataItem);
		handlerServiceAddSongToPlaylist.onRequest(dataItem);
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
	const updateSongToPlaylist = (dataItem: AddNewPlaylistFunc) => {
		Logger.info('Model execute addNewPlaylist');
		Logger.debug('Model execute addNewPlaylist have dataItem:', dataItem);
		handlerServiceUpdate.onRequest({
			playlistIds: dataItem.playlistId,
			songId: dataItem.songId,
		});
	};
	const playlistMeFunc = () => {
		handlerServicesPlaylistMe.onGet();
		handlerService.onGet({
			playlistId: params.id,
		});
	};
	const createPlaylist = (dataItem: IItemSong) => {
		Logger.info('Model execute createPlaylist');
		Logger.debug('Model execute createPlaylist have dataItem:', dataItem);
		const payload: PayloadCreatePlaylist = {
			descriptionPlaylist: `By ${profile.lastName} ${profile.firstName}`,
			image: dataItem.image,
			namePlaylist: dataItem.name,
			songId: dataItem.idSong,
		};
		handlerServicesCreate.onRequest(payload);
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
				playlistMeResponse: playlistMe,
			}}
			handler={{
				onFindSongs,
				playPlaylist,
				pausePlaylist,
				updateSongToPlaylist,
				addSongToPlaylist,
				playlistMe: playlistMeFunc,
				createPlaylist,
			}}
		/>
	);
}

export default Model;
