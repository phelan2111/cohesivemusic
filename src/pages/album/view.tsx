import ScreenResponsive from '@/components/ui/responsive/screen';
import AlbumDesktop from '@/layout/desktop/album';
import AlbumMobile from '@/layout/mobile/album';
import { ResponsePlaylistDetails } from '@/services/playlist/getDetails';
import { PayloadPlaylistUpdate } from '@/services/playlist/update';

interface IViewProps {
	state: {
		playlistDetails: ResponsePlaylistDetails;
		loading: boolean;
		songId: string;
		isPause: boolean;
	};
	handler: {
		onFindSongs: VoidFunction;
		updateSongToPlaylist: (dataItem: PayloadPlaylistUpdate) => void;
		playPlaylist: (songId: string) => void;
		pausePlaylist: VoidFunction;
	};
}

function View(props: IViewProps) {
	return <ScreenResponsive mobile={() => <AlbumMobile />} desktop={() => <AlbumDesktop {...props} />} />;
}

export default View;
