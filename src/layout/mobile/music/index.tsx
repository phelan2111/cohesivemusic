import AppBar from '@/components/ui/appbar/bottom';
import FamiliarAlbum from './list/familiarAlbum';
import YourTopMixes from './list/yourTopMixes';
import YourFavoriteArtists from './list/yourFavoriteArtists';
import ToTry from './list/toTry';
import BestOfArtists from './list/bestOfArtists';
import Charts from './list/charts';

interface IMusicMobileProps {}

function MusicMobile(props: IMusicMobileProps) {
	console.log('MusicMobile', props);
	return (
		<div className='pb-[105px] select-none flex-col lg:hidden flex'>
			<AppBar />
			<div
				id='homeMobile'
				className='flex px-4 flex-col gap-6 overflow-y-auto h-home snap-mandatory snap-y animate-translateBottom_duration_0dot8'>
				<FamiliarAlbum />
				<YourTopMixes />
				<YourFavoriteArtists />
				<BestOfArtists />
				<Charts />
				<ToTry />
			</div>
		</div>
	);
}

export default MusicMobile;
