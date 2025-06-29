import FollowButton from '@/components/ui/button/follow';
import ResponsiveDesktop from '@/components/ui/responsive/desktop';
import Localize from '@/langs';
import { BsThreeDots } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import { IoIosPlay } from 'react-icons/io';
import SongOfAlbum from './components/list/song';
import { sliceToolControl } from '@/redux/slice';
// import FanAlsoLike from './components/list/fanAlsoLike';
import { ResponsePlaylistDetails } from '@/services/playlist/getDetails';
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
		loading: boolean;
	};
};

function AlbumDesktop(props: AlbumDesktopProps) {
	return (
		<ResponsiveDesktop>
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
					className={`px-10`}>
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
						<div className='px-3 pb-3'>
							<SongOfAlbum
								data={props.state.playlistDetails.songs.map((s) => ({
									idSong: s.songId,
									image: s.image,
									name: s.songName,
									singers: s.singers.map((sg) => sg.singerName),
									views: s.views,
									duration: s.duration,
								}))}
							/>
						</div>
					</article>
					{/* <article className='pt-10'>
						<div className='py-4 gap-8 items-center flex justify-between'>
							<p className='text-3xl'>{Localize('FAN_ALSO_LIKE')}</p>
							<p className='hover:underline cursor-pointer'>{Localize('SHOW_ALL')}</p>
						</div>
						<FanAlsoLike />
					</article> */}
				</div>
			</section>
		</ResponsiveDesktop>
	);
}

export default AlbumDesktop;
