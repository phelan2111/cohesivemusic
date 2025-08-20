import Model from './model';
import { useEffect, useState } from 'react';

import { initialResponseRequest, ResponseRequest } from '@/services/types';
import { ResponsePlaylist } from '@/services/playlist/useGet';
import useLoading from '@/hooks/useLoading';
import { Services } from '@/services';
import { ResponseSingerNewest, ResponseSongNewest, ResponseYourTopMixes } from './types';
import { TypeSongs } from '@/utils/enums';
import { ResponseSinger } from '@/services/singer/get';
import { ResponseSong } from '@/services/songs/get';
import { Logger } from '@/utils/logger';
import { useDispatch } from 'react-redux';
import { sliceMe } from '@/redux/slice';

function YourTopMixesResponse(): ResponseYourTopMixes {
	const [playlistResponse, setPlaylistResponse] = useState<ResponseRequest<ResponsePlaylist>>(
		initialResponseRequest as ResponseRequest<ResponsePlaylist>,
	);
	const { handlerLoading, stateLoading } = useLoading({ defaultLoading: true });
	const { handlerService } = Services.Playlist.useGet({
		onSuccess: (dataItem) => {
			setPlaylistResponse(dataItem);
			handlerLoading.onSetLoading(false);
		},
		defaultLoading: true,
	});

	useEffect(() => {
		handlerService.onGet({
			from: 0,
			limit: 6,
		});
	}, []);

	return {
		playlistResponse,
		loading: stateLoading.loading,
	};
}
function SingersResponse(): ResponseSingerNewest {
	const [singerResponse, setSingerResponse] = useState<ResponseRequest<ResponseSinger>>(
		initialResponseRequest as ResponseRequest<ResponseSinger>,
	);
	const { handlerLoading, stateLoading } = useLoading({ defaultLoading: true });
	const { handlerService } = Services.Singer.Get({
		onSuccess: (dataItem) => {
			setSingerResponse(dataItem);
			handlerLoading.onSetLoading(false);
		},
		defaultLoading: true,
	});

	useEffect(() => {
		handlerService.onGet({
			from: 0,
			limit: 6,
		});
	}, []);

	return {
		singerResponse,
		loading: stateLoading.loading,
	};
}
function SongsResponse(): ResponseSongNewest {
	const [songResponse, setSongResponse] = useState<ResponseRequest<ResponseSong>>(
		initialResponseRequest as ResponseRequest<ResponseSong>,
	);
	const { handlerLoading, stateLoading } = useLoading({ defaultLoading: true });
	const { handlerService } = Services.Song.Get({
		onSuccess: (dataItem) => {
			setSongResponse(dataItem);
			handlerLoading.onSetLoading(false);
		},
		defaultLoading: true,
	});

	useEffect(() => {
		handlerService.onGet({
			from: 0,
			limit: 6,
			type: TypeSongs.mp3,
		});
	}, []);
	return {
		songResponse,
		loading: stateLoading.loading,
	};
}
function MVResponse(): ResponseSongNewest {
	const [songResponse, setSongResponse] = useState<ResponseRequest<ResponseSong>>(
		initialResponseRequest as ResponseRequest<ResponseSong>,
	);
	const { handlerLoading, stateLoading } = useLoading({ defaultLoading: true });
	const { handlerService } = Services.Song.Get({
		onSuccess: (dataItem) => {
			setSongResponse(dataItem);
			handlerLoading.onSetLoading(false);
		},
		defaultLoading: true,
	});

	useEffect(() => {
		handlerService.onGet({
			from: 0,
			limit: 6,
			type: TypeSongs.video,
		});
	}, []);
	return {
		songResponse,
		loading: stateLoading.loading,
		handler: {
			onFresh: () => {
				handlerService.onGet({
					from: 0,
					limit: 6,
					type: TypeSongs.video,
				});
			},
		},
	};
}
type ServicesPlaylistProps = {
	callback?: VoidFunction;
};
function AddPlaylist(props: ServicesPlaylistProps) {
	const { handlerService } = Services.Playlist.AddSongToPlaylist({
		onSuccess: () => {
			Logger.info('AddPlaylist execute Services.Playlist.AddSongToPlaylist');
			props.callback?.();
		},
	});

	return {
		handler: {
			request: handlerService.onRequest,
		},
	};
}
function UpdatePlaylist(props: ServicesPlaylistProps) {
	const { handlerService } = Services.Playlist.UpdateSongToPlaylist({
		onSuccess: () => {
			Logger.info('Model execute Services.Playlist.UpdateSongToPlaylist');
			props.callback?.();
		},
	});
	return {
		handler: {
			request: handlerService.onRequest,
		},
	};
}
function GetPlaylistMe() {
	const dispatch = useDispatch();
	const { handlerService } = Services.Playlist.Me({
		onSuccess: (dataItem) => {
			Logger.info('Model execute Services.Playlist.Me');
			dispatch(sliceMe.func.onSetData(dataItem));
		},
		defaultLoading: true,
	});
	return {
		handler: {
			request: handlerService.onGet,
		},
	};
}
function CreatePlaylistMe(props: ServicesPlaylistProps) {
	const { handlerService } = Services.Playlist.Create({
		onSuccess: (dataItem) => {
			Logger.info('Model executeServices.Playlist.Create');
			Logger.debug('Model executeServices.Playlist.Create response:', dataItem);
			props.callback?.();
		},
		defaultLoading: true,
	});
	return {
		handler: {
			request: handlerService.onRequest,
		},
	};
}

function Home() {
	const yourTopMixes = YourTopMixesResponse();
	const singersNewest = SingersResponse();
	const songsNewest = SongsResponse();
	const MVNewest = MVResponse();
	const addPlaylist = AddPlaylist({
		callback: () => {
			MVNewest.handler?.onFresh?.();
			getPlaylistOfMe.handler.request();
		},
	});
	const updatePlaylist = UpdatePlaylist({
		callback: () => {
			MVNewest.handler?.onFresh?.();
			getPlaylistOfMe.handler.request();
		},
	});
	const getPlaylistOfMe = GetPlaylistMe();
	const createPlaylistOfMe = CreatePlaylistMe({
		callback: () => {
			MVNewest.handler?.onFresh?.();
			getPlaylistOfMe.handler.request();
		},
	});

	return (
		<Model
			addPlaylist={addPlaylist}
			createPlaylistOfMe={createPlaylistOfMe}
			getPlaylistOfMe={getPlaylistOfMe}
			updatePlaylist={updatePlaylist}
			singersNewest={singersNewest}
			songsNewest={songsNewest}
			yourTopMixes={yourTopMixes}
			MVNewest={MVNewest}
		/>
	);
}

export default Home;
