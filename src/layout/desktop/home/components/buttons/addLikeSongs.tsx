import useLoading from '@/hooks/useLoading';
import { GoPlusCircle } from 'react-icons/go';
import { IoMdCheckmark } from 'react-icons/io';

type AddLikeSongsProps = {
	defaultLike: boolean;
};
function AddLikeSongs({ defaultLike }: AddLikeSongsProps) {
	const { stateLoading, handlerLoading } = useLoading({ defaultLoading: defaultLike });

	return (
		<div
			aria-hidden
			onClick={() => {
				handlerLoading.onSetLoading(!stateLoading.loading);
			}}
			className='size-6 flex items-center justify-center relative'>
			<GoPlusCircle className='opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-3xl cursor-pointer' />
			<div
				className={`${
					stateLoading.loading ? 'size-6 active' : 'size-0'
				} rounded-full transition-all duration-300 absolute bg-gradient-to-r from-pink-500 to-violet-500 fireworks`}>
				<div className='flex items-center justify-center h-full'>
					<IoMdCheckmark className='text-md' />
				</div>
			</div>
		</div>
	);
}

export default AddLikeSongs;
