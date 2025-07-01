import { useEffect, useState } from 'react';
import View from './view';
import { initialResponseRequest, ResponseRequest } from '@/services/types';
import { ResponsePlaylist } from '@/services/playlist/useGet';
import useLoading from '@/hooks/useLoading';
import { Services } from '@/services';
import { ResponseSingerNewest, ResponseYourTopMixes } from './types';
import { useRedirect } from '@/hooks/useRedirect';
import { StatusPlaylist } from '@/utils/enums';
import { ResponseSinger } from '@/services/singer/get';

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
			status: StatusPlaylist.display,
		});
	}, []);

	return {
		playlistResponse,
		loading: stateLoading.loading,
	};
}
function SongsResponse(): ResponseSingerNewest {
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
function Model() {
	const { redirectPage } = useRedirect();
	const yourTopMixes = YourTopMixesResponse();
	const singersNewest = SongsResponse();

	return (
		<View
			singersNewest={singersNewest}
			yourTopMixes={yourTopMixes}
			handler={{
				onRedirect: (path) => redirectPage(path),
			}}
		/>
	);
}

export default Model;
