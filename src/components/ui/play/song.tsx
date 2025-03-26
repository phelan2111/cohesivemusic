import { useAppDispatch } from '@/hooks/redux';
import { sliceToolControl } from '@/redux/slice';
import { EnumToolType } from '@/redux/slice/toolControl';
import { BsPlayBtn } from 'react-icons/bs';
import { FaPlay } from 'react-icons/fa';
import { GoPlusCircle } from 'react-icons/go';
import ControlTool from '../tool/control';

function PlaySong() {
	const dispatch = useAppDispatch();
	const isView = sliceToolControl.useGetState().open;
	const handleNowPlayingView = () => {
		dispatch(
			sliceToolControl.func.onSetState({
				open: !isView,
				typeTool: EnumToolType.nowPlayingView,
			}),
		);
	};

	return (
		<article className='fixed bottom-[70px] w-full left-0 m-auto z-30 right-0 bg-primary_dark-10 rounded-t-2xl lg:bottom-0 transition-all duration-500'>
			<div className='px-4 flex justify-between items-center'>
				<div className='flex gap-2 pb-6 pt-4 xl:pb-4'>
					<img
						className='w-12 h-12 object-cover rounded-sm'
						src='https://i.pinimg.com/564x/86/20/82/8620821ab7e20048acc4a30fa449e5d9.jpg'
						alt='https://i.pinimg.com/564x/86/20/82/8620821ab7e20048acc4a30fa449e5d9.jpg'
					/>
					<div>
						<h6>Lâu Lâu Nhắc Lại</h6>
						<p className='text-xs'>Hà Nhi</p>
					</div>
				</div>
				<div className='hidden xl:block'>
					<ControlTool />
				</div>
				<div className='flex items-center gap-4'>
					<div
						className={`relative overflow-hidden xl:overflow-visible ${
							isView ? 'text-pink-500' : 'text-white'
						}`}>
						<div className='bg-primary_dark relative z-10'>
							<BsPlayBtn
								aria-hidden
								onClick={handleNowPlayingView}
								className='text-2xl hover:scale-110 transition-transform duration-300 cursor-pointer hidden xl:block'
							/>
						</div>
						<div
							className={`absolute bg-pink-500 transition-all duration-500 w-1.5 h-1.5 rounded-full right-2.5 ${
								isView ? 'top-7' : 'top-3'
							}`}
						/>
					</div>
					<GoPlusCircle className='text-2xl hover:scale-110 transition-transform duration-300 block xl:hidden cursor-pointer' />
					<FaPlay className='text-xl hover:scale-110 transition-transform duration-300 block xl:hidden cursor-pointer' />
				</div>
			</div>
		</article>
	);
}

export default PlaySong;
