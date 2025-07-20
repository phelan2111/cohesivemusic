import useLoading from '@/hooks/useLoading';
import { PayloadPlaylistUpdate } from '@/services/playlist/update';
import { GoPlusCircle } from 'react-icons/go';
import { IoMdCheckmark } from 'react-icons/io';

type AddLikeSongsProps = {
	defaultLike: boolean;
	songId: string;
	updateSongToPlaylist?: (dataItem: PayloadPlaylistUpdate) => void;
};
function AddLikeSongs({ defaultLike, ...props }: AddLikeSongsProps) {
	const { stateLoading, handlerLoading } = useLoading({ defaultLoading: defaultLike });

	return (
		<div
			aria-hidden
			onClick={() => {
				handlerLoading.onSetLoading(true);
				if (!stateLoading.loading) {
					props.updateSongToPlaylist?.({
						songId: props.songId,
					});
				}
			}}
			className='size-6 flex items-center justify-center relative'>
			<GoPlusCircle className='opacity-0 group-hover:opacity-100 transition-opacity duration-500 cursor-pointer' />
			<div
				className={`${
					stateLoading.loading ? 'size-5 active' : 'size-0'
				} rounded-full transition-all duration-300 absolute bg-gradient-to-r from-pink-500 to-violet-500 fireworks`}>
				<div className='flex items-center justify-center h-full'>
					<IoMdCheckmark className='text-xs' />
				</div>
			</div>
		</div>
	);
}

export default AddLikeSongs;
