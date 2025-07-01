import ScreenResponsive from '@/components/ui/responsive/screen';
import AlbumDesktop from '@/layout/desktop/album';
import AlbumMobile from '@/layout/mobile/album';
import { ResponsePlaylistDetails } from '@/services/playlist/getDetails';

interface IViewProps {
	state: {
		playlistDetails: ResponsePlaylistDetails;
		loading: boolean;
	};
	handler: {
		onFindSongs: VoidFunction;
	};
}

function View(props: IViewProps) {
	return <ScreenResponsive mobile={() => <AlbumMobile />} desktop={() => <AlbumDesktop {...props} />} />;
}

export default View;
