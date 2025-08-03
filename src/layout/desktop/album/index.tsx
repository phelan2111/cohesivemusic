import FollowButton from '@/components/ui/button/follow';
import ResponsiveDesktop from '@/components/ui/responsive/desktop';
import Localize from '@/langs';
import { BsThreeDots } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import { IoIosPlay } from 'react-icons/io';
import SongOfAlbum from './components/list/song';
import { sliceToolControl } from '@/redux/slice';
import { ResponsePlaylistDetails } from '@/services/playlist/getDetails';
import { Skeletons } from '@/components/ui/skelentons';
import { Others } from './components/others';
import { ResponseRequest } from '@/services/types';
import { ResponsePlaylist } from '@/services/playlist/me';
import { AddNewPlaylistFunc } from '@/pages/album/types';
import { PayloadPlaylistAdd } from '@/services/playlist/add';
export function handleStyleViewTool() {
	const isViewTool = sliceToolControl.useGetState().open;
	const sliceData = isViewTool ? 5 : 7;
	const className = isViewTool ? '2xl:grid-cols-5' : '2xl:grid-cols-7';
	return {
		className,
		sliceData,
	};
}

type AlbumDesktopProps = {
	state: {
		playlistDetails: ResponsePlaylistDetails;
		playlistMeResponse: ResponseRequest<ResponsePlaylist>;
		loading: boolean;
		songId: string;
		isPause: boolean;
	};
	handler: {
		onFindSongs: VoidFunction;
		pausePlaylist: VoidFunction;
		addSongToPlaylist: (dataItem: PayloadPlaylistAdd) => void;
		playPlaylist: (songId: string) => void;
		updateSongToPlaylist: (dataItem: AddNewPlaylistFunc) => void;
		playlistMe: VoidFunction;
	};
};

function AlbumDesktop(props: AlbumDesktopProps) {
	return (
		<ResponsiveDesktop>
			<Skeletons.Album loading={props.state.loading}>
				<section className='flex flex-col h-albumDk rounded-2xl relative bg-primary_dark-10 animate-translateBottom_duration_0dot8 overflow-auto scrollHiddenY'>
					<article className='min-h-[400px] w-full flex items-center relative'>
						<div className='relative z-10 px-10 flex flex-col gap-4 animate-translateBottom_duration_1dot2'>
							<div className='flex items-center gap-2'>
								<GoVerified className='text-2xl' />
								{Localize('VERIFIED_ARTIST')}
							</div>
							<h2 className='text-8xl font-bold'>{props.state.playlistDetails.namePlaylist}</h2>
							{props.state.playlistDetails.viewSaves > 0 && (
								<p className='text-xl'>
									{props.state.playlistDetails.viewSaves} {Localize('MONTHLY_LISTENER')}
								</p>
							)}
						</div>
						<div
							style={{
								backgroundImage: `url(${props.state.playlistDetails.image})`,
							}}
							className='absolute top-0 right-0 w-full h-full bg-cover bg-center rounded-t-xl'
						/>
						<div className='absolute top-0 right-0 w-full h-full bg-gradient-to-r rounded-t-xl from-primary_dark-10/70' />
					</article>
					<div
						style={{
							background: `linear-gradient(to bottom,${props.state.playlistDetails.theme}10 , #232323)`,
						}}
						className={`px-10 h-full`}>
						<Others.Empty onClick={props.handler.onFindSongs} isEmpty={props.state.playlistDetails.songs.length === 0}>
							<article className='relative'>
								<div className='w-20 h-20 left-10 bg-primary_dark-20 absolute -top-10 rounded-full flex justify-center duration-500 items-center transition-transform hover:scale-110 cursor-pointer'>
									<IoIosPlay className='text-5xl' />
								</div>
								<div className='py-4 gap-8 items-center flex justify-between pt-16'>
									<p className='text-3xl'>{Localize('POPULAR')}</p>
									<div className='flex gap-4 items-center'>
										<FollowButton className='!bg-primary_dark-20 w-32' />
										<div className='min-w-10 h-10 bg-primary_dark-20 rounded-full flex justify-center items-center transition-transform hover:scale-110 cursor-pointer'>
											<BsThreeDots className='text-lg cursor-pointer' />
										</div>
									</div>
								</div>
								<div className='pb-3'>
									<SongOfAlbum
										playlistMe={props.handler.playlistMe}
										pausePlaylist={props.handler.pausePlaylist}
										playPlaylist={props.handler.playPlaylist}
										updateSongToPlaylist={props.handler.updateSongToPlaylist}
										playlistMeResponse={props.state.playlistMeResponse}
										data={props.state.playlistDetails.songs.map((s) => ({
											idSong: s.songId,
											image: s.image,
											name: s.songName,
											singers: s.singers.map((sg) => sg.singerName),
											views: s.views,
											isBelong: s.isBelong,
											duration: s.duration,
										}))}
										songId={props.state.songId}
										addSongToPlaylist={(dataItem) => {
											props.handler.addSongToPlaylist(dataItem);
										}}
										isPause={props.state.isPause}
									/>
								</div>
							</article>
						</Others.Empty>
						{/* <article className='pt-10'>
						<div className='py-4 gap-8 items-center flex justify-between'>
							<p className='text-3xl'>{Localize('FAN_ALSO_LIKE')}</p>
							<p className='hover:underline cursor-pointer'>{Localize('SHOW_ALL')}</p>
						</div>
						<FanAlsoLike />
					</article> */}
					</div>
				</section>
			</Skeletons.Album>
		</ResponsiveDesktop>
	);
}

export default AlbumDesktop;
