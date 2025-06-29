import { Services } from '@/services';
import View from './view';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { initialPlaylistDetails, ResponsePlaylistDetails } from '@/services/playlist/getDetails';
import useLoading from '@/hooks/useLoading';

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
	const params = useParams() as ParamsPlaylistDetails;

	useEffect(() => {
		handlerService.onGet({
			playlistId: params.id,
		});
	}, []);

	return (
		<View
			state={{
				loading: stateLoading.loading,
				playlistDetails,
			}}
		/>
	);
}

export default Model;
