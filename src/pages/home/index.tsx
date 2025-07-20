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
	};
}

function Home() {
	const yourTopMixes = YourTopMixesResponse();
	const singersNewest = SingersResponse();
	const songsNewest = SongsResponse();
	const MVNewest = MVResponse();

	return <Model singersNewest={singersNewest} songsNewest={songsNewest} yourTopMixes={yourTopMixes} MVNewest={MVNewest} />;
}

export default Home;
