import PopperBottom from '@/components/root/popper/bottom';
import Video from '@/components/root/video/video';
import {
	BsBroadcast,
	BsChevronCompactLeft,
	BsCloudDownloadFill,
	BsFillFileCodeFill,
	BsFillPlusCircleFill,
	BsFillXOctagonFill,
	BsShareFill,
} from 'react-icons/bs';
import { FaPlayCircle, FaUserAstronaut } from 'react-icons/fa';
import { LiaRandomSolid } from 'react-icons/lia';
import SongOfAlbum from './components/list/song';
import { GoDownload, GoKebabHorizontal, GoPlus } from 'react-icons/go';
import IconBootstrapLarge from '@/components/ui/icon/iconBootstrapLarge';
import data from './data/songs.json';
import { LuDot } from 'react-icons/lu';
import Localize from '@/langs';
import MenuIcon, { IItemIcon } from '@/components/ui/menu/icon';
import { useRedirect } from '@/hooks/useRedirect';
import { PATH } from '@/routes/config';

interface IChartMobileProps {}

function ChartMobile(props: IChartMobileProps) {
	console.log('props', props);
	const { redirectPage } = useRedirect();
	const itemsMenu: IItemIcon[] = [
		{
			icon: <BsFillPlusCircleFill />,
			text: 'ADD_TO_YOUR_LIBRARY',
			onClick: () => {},
		},
		{
			icon: <BsCloudDownloadFill />,
			text: 'DOWNLOAD',
			onClick: () => {},
		},
		{
			icon: <BsFillXOctagonFill />,
			text: 'NOT_INTERESTED',
			onClick: () => {},
		},
		{
			icon: <BsFillPlusCircleFill />,
			text: 'ADD_TO_PLAYLIST',
			onClick: () => {},
		},
		{
			icon: <FaUserAstronaut />,
			text: 'VIEW_ARTISTS',
			onClick: () => {},
		},
		{
			icon: <BsShareFill />,
			text: 'SHARE',
			onClick: () => {},
		},
		{
			icon: <BsBroadcast />,
			text: 'GO_TO_ALBUM_RADIO',
			onClick: () => {},
		},
		{
			icon: <BsFillFileCodeFill />,
			text: 'SHOW_CODE',
			onClick: () => {},
		},
	];

	return (
		<div className='w-full flex flex-col gap-4 overflow-y-auto h-album snap-mandatory snap-y'>
			<div className='snap-start animate-translateBottom_duration_0dot8'>
				<div className='relative w-full flex justify-center items-center bg-gradient-to-b from-indigo-900 p-4'>
					<div className='relative rounded-xl flex flex-col gap-2 p-1 pb-10'>
						<div className='bg-primary_dark relative overflow-hidden z-10 p-4 rounded-xl text-center w-52 h-52 flex flex-col justify-center items-center font-bold before:absolute before:h-[150%] before:w-20 before:animate-spin_dur_4s before:bg-gradient-to-t before:from-indigo-500 before:via-purple-500 before:to-pink-500 after:absolute after:bg-primary_dark after:inset-1 after:rounded-lg'>
							<h3 className='text-3xl border-b py-4 w-32 relative z-10 bg-gradient-to-t from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent'>
								{Localize('TOP_50')}
							</h3>
							<p className='text-base py-5 relative z-10 bg-gradient-to-t from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent'>
								Viet Name
							</p>
						</div>
					</div>
					<div
						aria-hidden
						onClick={() => {
							redirectPage(PATH.MUSIC._);
						}}
						className='absolute top-4 left-4 shadow-bootstrapLarge p-2 rounded-full bg-primary_dark'>
						<BsChevronCompactLeft />
					</div>
				</div>
			</div>
			<div className='flex flex-col gap-2 px-4 snap-start animate-translateBottom_duration_0dot8'>
				<div className='flex items-center'>
					<p className='text-sm'>Jun 29, 2024</p>
					<LuDot />
					<p className='text-sm'>7 New Entries</p>
				</div>
				<article className='flex justify-between flex-wrap gap-5 items-center'>
					<div className='flex gap-5 items-center'>
						<div className='w-12 h-12 shadow-bootstrapLarge rounded-md overflow-auto'>
							<Video
								mute={true}
								autoPlay
								src='https://res.cloudinary.com/dkvhfe4uu/video/upload/v1718469569/justFriend_oximsk.mp4'
								track='https://res.cloudinary.com/dkvhfe4uu/video/upload/v1718469569/justFriend_oximsk.mp4'
							/>
						</div>
						<IconBootstrapLarge>
							<GoPlus className='text-md hover:scale-110 transition-transform duration-300 cursor-pointer' />
						</IconBootstrapLarge>
						<IconBootstrapLarge>
							<GoDownload className='text-md hover:scale-110 transition-transform duration-300 cursor-pointer' />
						</IconBootstrapLarge>
						<PopperBottom
							render={(renderProps) => {
								return (
									<MenuIcon
										onClose={renderProps.onClose}
										items={itemsMenu}
									/>
								);
							}}>
							<IconBootstrapLarge>
								<GoKebabHorizontal className='text-lg rotate-90' />
							</IconBootstrapLarge>
						</PopperBottom>
					</div>
					<div className='flex gap-3 items-center'>
						<IconBootstrapLarge>
							<LiaRandomSolid className='text-lg hover:scale-110 transition-transform duration-300 cursor-pointer' />
						</IconBootstrapLarge>
						<FaPlayCircle className='text-5xl hover:scale-110 transition-transform duration-300 cursor-pointer shadow-bootstrapLarge rounded-full' />
					</div>
				</article>
			</div>
			<div className='px-4 animate-translateBottom_duration_0dot8'>
				<SongOfAlbum data={data.songs} />
			</div>
		</div>
	);
}

export default ChartMobile;
