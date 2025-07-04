import ResponsiveDesktop from '@/components/ui/responsive/desktop';
import FamiliarAlbum from './components/list/familiarAlbum';
// import MakeForUser from './components/list/makeForUser';
import YourFavoriteArtists from './components/list/yourFavoriteArtists';
import YourTopMixes from './components/list/yourTopMixes';
import NewReleaseCard from './components/card/newRelease';
// import EpisodesForYou from './components/list/episodesForYou';
import AppBarTop from '@/components/ui/appbar/top';
import { sliceToolControl } from '@/redux/slice';
import { ResponseSingerNewest, ResponseSongNewest, ResponseYourTopMixes } from '@/pages/home/types';
import NewMV from './components/list/newMV';
export function handleStyleViewTool() {
	const isViewTool = sliceToolControl.useGetState().open;
	const sliceData = isViewTool ? 5 : 7;
	const className = isViewTool ? '2xl:grid-cols-5' : '2xl:grid-cols-7';
	return {
		className,
		sliceData,
	};
}

type HomeDesktopProps = {
	yourTopMixes: ResponseYourTopMixes;
	singersNewest: ResponseSingerNewest;
	songsNewest: ResponseSongNewest;
	MVNewest: ResponseSongNewest;
	handler: {
		onRedirect: (path: string) => void;
	};
};
function HomeDesktop(props: HomeDesktopProps) {
	return (
		<ResponsiveDesktop>
			<div className='flex flex-col gap-5 w-full'>
				<AppBarTop />
				<section className='w-full animate-translateBottom_duration_0dot8 flex flex-col gap-8 pb-4 lg:h-desktopWrapper lg:overflow-auto scrollHiddenY pr-3'>
					<FamiliarAlbum />
					{/* <MakeForUser /> */}
					<YourTopMixes handler={{ onRedirect: props.handler.onRedirect }} yourTopMixes={props.yourTopMixes} />
					<YourFavoriteArtists singersNewest={props.singersNewest} />
					<NewReleaseCard songsNewest={props.songsNewest} handler={props.handler} />
					{/* <EpisodesForYou /> */}
					<NewMV MVNewest={props.MVNewest} handler={props.handler} />
				</section>
			</div>
		</ResponsiveDesktop>
	);
}

export default HomeDesktop;
