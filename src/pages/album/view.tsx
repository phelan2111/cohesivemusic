import ScreenResponsive from '@/components/ui/responsive/screen';
import AlbumDesktop from '@/layout/desktop/album';
import AlbumMobile from '@/layout/mobile/album';
import { ResponsePlaylistDetails } from '@/services/playlist/getDetails';
import { ResponsePlaylist } from '@/services/playlist/me';
import { ResponseRequest } from '@/services/types';
import { AddNewPlaylistFunc } from './types';
import { PayloadPlaylistAdd } from '@/services/playlist/addSongToPlaylist';
import { IItemSong } from '@/layout/desktop/album/components/list/song';

interface IViewProps {
	state: {
		playlistDetails: ResponsePlaylistDetails;
		playlistMeResponse: ResponseRequest<ResponsePlaylist>;
		loading: boolean;
		songId: string;
		isPause: boolean;
	};
	handler: {
		onFindSongs: VoidFunction;
		addSongToPlaylist: (dataItem: PayloadPlaylistAdd) => void;
		createPlaylist: (dataItem: IItemSong) => void;
		playPlaylist: (songId: string) => void;
		pausePlaylist: VoidFunction;
		updateSongToPlaylist: (dataItem: AddNewPlaylistFunc) => void;
		playlistMe: VoidFunction;
	};
}

function View(props: IViewProps) {
	return <ScreenResponsive mobile={() => <AlbumMobile />} desktop={() => <AlbumDesktop {...props} />} />;
}

export default View;
