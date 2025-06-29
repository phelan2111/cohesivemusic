import { useEffect, useState } from 'react';
import View from './view';
import { initialResponseRequest, ResponseRequest } from '@/services/types';
import { ResponsePlaylist } from '@/services/playlist/useGet';
import useLoading from '@/hooks/useLoading';
import { Services } from '@/services';
import { ResponseYourTopMixes } from './types';
import { useRedirect } from '@/hooks/useRedirect';

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
function Model() {
	const { redirectPage } = useRedirect();
	const yourTopMixes = YourTopMixesResponse();

	return (
		<View
			yourTopMixes={yourTopMixes}
			handler={{
				onRedirect: (path) => redirectPage(path),
			}}
		/>
	);
}

export default Model;
