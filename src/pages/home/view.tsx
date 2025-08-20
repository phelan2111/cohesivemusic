import ScreenResponsive from '@/components/ui/responsive/screen';
import HomeDesktop from '@/layout/desktop/home';
import HomeMobile from '@/layout/mobile/home';
import { ResponseSingerNewest, ResponseSongNewest, ResponseYourTopMixes } from './types';
import { PayloadPlaylistAdd } from '@/services/playlist/addSongToPlaylist';
import { ResponseRequest } from '@/services/types';
import { ResponsePlaylist } from '@/services/playlist/me';
import { PayloadPlaylistUpdate } from '@/services/playlist/updateSongToPlaylist';
import { PayloadCreatePlaylist } from '@/services/playlist/create';

interface IViewProps {
	yourTopMixes: ResponseYourTopMixes;
	singersNewest: ResponseSingerNewest;
	songsNewest: ResponseSongNewest;
	MVNewest: ResponseSongNewest;
	handler: {
		onRedirect: (path: string) => void;
		addSongToPlaylist?: (dataItem: PayloadPlaylistAdd) => void;
		updateSongToPlaylist: (dataItem: PayloadPlaylistUpdate) => void;
		createPlaylist: (dataItem: PayloadCreatePlaylist) => void;
		playlistMe: VoidFunction;
		playSong: (songId: string) => void;
		pauseSong: VoidFunction;
	};
	state: {
		playlistMeResponse: ResponseRequest<ResponsePlaylist>;
		songId: string;
		isPause: boolean;
	};
}

function View(props: IViewProps) {
	return <ScreenResponsive mobile={() => <HomeMobile />} desktop={() => <HomeDesktop {...props} />} />;
}

export default View;
