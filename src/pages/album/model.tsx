import { Services } from '@/services';
import View from './view';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { initialPlaylistDetails, ResponsePlaylistDetails } from '@/services/playlist/getDetails';
import useLoading from '@/hooks/useLoading';
import { useRedirect } from '@/hooks/useRedirect';
import { PATH } from '@/routes/config';
import { PayloadPlaylistUpdate } from '@/services/playlist/update';

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
		onSuccess: (dataRes) => {},
	});

	const params = useParams() as ParamsPlaylistDetails;
	const { redirectPage } = useRedirect();

	const onFindSongs = () => {
		redirectPage(PATH.SEARCH);
	};
	const updateSongToPlaylist = (dataItem: PayloadPlaylistUpdate) => {
		handlerServiceAdd.onUpdate(dataItem);
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
			}}
			handler={{
				onFindSongs,
				updateSongToPlaylist,
			}}
		/>
	);
}

export default Model;
