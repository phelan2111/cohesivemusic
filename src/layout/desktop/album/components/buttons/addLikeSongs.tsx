import Button from '@/components/root/button';
import TextField from '@/components/root/inputs/textField';
import Popover from '@/components/root/popper';
import useLoading from '@/hooks/useLoading';
import Localize from '@/langs';
import { PayloadPlaylistUpdate } from '@/services/playlist/update';
import { FaPlus } from 'react-icons/fa6';
import { GoPlusCircle } from 'react-icons/go';
import { IoMdCheckmark } from 'react-icons/io';
import { TiPin } from 'react-icons/ti';

type AddLikeSongsProps = {
	defaultLike: boolean;
	songId: string;
	updateSongToPlaylist?: (dataItem: PayloadPlaylistUpdate) => void;
};

type CheckIconProps = {
	checked: boolean;
	onClick: VoidFunction;
};
function CheckIcon(props: CheckIconProps) {
	return (
		<div
			aria-hidden
			onClick={() => {
				props.onClick();
			}}
			className='size-6 flex items-center justify-center relative'>
			<GoPlusCircle className='opacity-0 group-hover:opacity-100 transition-opacity duration-500 cursor-pointer' />
			<div
				className={`${
					props.checked ? 'size-5 active' : 'size-0'
				} rounded-full transition-all duration-300 absolute bg-gradient-to-r from-pink-500 to-violet-500 fireworks`}>
				<div className='flex items-center justify-center h-full'>
					<IoMdCheckmark className='text-xs text-white' />
				</div>
			</div>
		</div>
	);
}
function AddLikeSongs({ defaultLike, ...props }: AddLikeSongsProps) {
	const { stateLoading, handlerLoading } = useLoading({ defaultLoading: defaultLike });

	return (
		<Popover
			bottom='10px'
			className='text-primary_dark rounded-sm right-52'
			renderContent={({ onClose }) => {
				if (!stateLoading.loading) return <></>;
				return (
					<div className='bg-primary_dark-20 rounded-lg flex flex-col gap-3 w-64 text-white'>
						<div className='flex flex-col gap-2 px-4 pt-4'>
							<p className='text-sm'>{Localize('ADD_TO_PLAYLIST')}</p>
							<TextField classNameInput='h-7 text-xs' placeholder={Localize('FIND_A_PLAYLIST')} />
						</div>
						<div className='flex items-center gap-1 text-sm border-b px-4 border-primary_dark-10 pb-2'>
							<FaPlus />
							<p>{Localize('NEW_PLAYLIST')}</p>
						</div>
						<div className='h-[156px] overflow-y-auto px-4 scrollHiddenY'>
							<div className='flex items-center gap-2 justify-between hover:bg-primary_dark-10 p-2 rounded-md transition-all duration-300'>
								<div className='flex items-center gap-1'>
									<div>
										<figure>
											<img
												className='size-10 object-cover rounded-sm'
												src='https://i.pinimg.com/736x/69/d4/f5/69d4f553a801270cc080e78402855353.jpg'
												alt=''
											/>
										</figure>
									</div>
									<p className='text-sm font-medium'>Liked Song</p>
								</div>
								<div className='flex items-center gap-2'>
									<TiPin className='text-xl' />
									<CheckIcon checked onClick={() => {}} />
								</div>
							</div>
							<div className='flex items-center gap-2 justify-between hover:bg-primary_dark-10 p-2 rounded-md transition-all duration-300'>
								<div className='flex items-center gap-1'>
									<div>
										<figure>
											<img
												className='size-10 object-cover rounded-sm'
												src='https://i.pinimg.com/736x/69/d4/f5/69d4f553a801270cc080e78402855353.jpg'
												alt=''
											/>
										</figure>
									</div>
									<p className='text-sm font-medium'>Liked Song</p>
								</div>
								<div className='flex items-center gap-2'>
									<TiPin className='text-xl' />
									<CheckIcon checked onClick={() => {}} />
								</div>
							</div>
							<div className='flex items-center gap-2 justify-between hover:bg-primary_dark-10 p-2 rounded-md transition-all duration-300'>
								<div className='flex items-center gap-1'>
									<div>
										<figure>
											<img
												className='size-10 object-cover rounded-sm'
												src='https://i.pinimg.com/736x/69/d4/f5/69d4f553a801270cc080e78402855353.jpg'
												alt=''
											/>
										</figure>
									</div>
									<p className='text-sm font-medium'>Liked Song</p>
								</div>
								<div className='flex items-center gap-2'>
									<TiPin className='text-xl' />
									<CheckIcon checked onClick={() => {}} />
								</div>
							</div>
							<div className='flex items-center gap-2 justify-between hover:bg-primary_dark-10 p-2 rounded-md transition-all duration-300'>
								<div className='flex items-center gap-1'>
									<div>
										<figure>
											<img
												className='size-10 object-cover rounded-sm'
												src='https://i.pinimg.com/736x/69/d4/f5/69d4f553a801270cc080e78402855353.jpg'
												alt=''
											/>
										</figure>
									</div>
									<p className='text-sm font-medium'>Liked Song</p>
								</div>
								<div className='flex items-center gap-2'>
									<TiPin className='text-xl' />
									<CheckIcon checked onClick={() => {}} />
								</div>
							</div>
						</div>
						<div
							style={{
								boxShadow: '-0px -4px 4px -3px #ffffff10',
							}}
							className='shadow-red-100 w-full py-3 px-4 flex justify-end gap-2'>
							<Button onClick={onClose} className='h-8 px-2 text-sm w-20 !bg-transparent'>
								{Localize('CANCEL')}
							</Button>
							<Button className='h-8 px-2 text-sm w-20'>{Localize('DONE')}</Button>
						</div>
					</div>
				);
			}}
			renderChildren={() => {
				return (
					<CheckIcon
						checked={stateLoading.loading}
						onClick={() => {
							handlerLoading.onSetLoading(true);
							if (!stateLoading.loading) {
								props.updateSongToPlaylist?.({
									songId: props.songId,
								});
							}
						}}
					/>
				);
			}}
		/>
	);
}

export default AddLikeSongs;
