import dayjs from 'dayjs';
import { CiCirclePlus, CiMenuKebab, CiSaveDown1 } from 'react-icons/ci';
import { IoMdPlayCircle } from 'react-icons/io';

export type NewsItem = {
	createAt: number;
	nameSong: string;
	singer: string;
	image: string;
};
function NewSingerItem(props: NewsItem) {
	return (
		<div className='flex flex-col gap-1 pt-4 pb-3 px-4 snap-start'>
			<div className='flex gap-3 items-center'>
				<img
					className='size-24 object-cover'
					src={props.image}
					alt={props.image}
				/>
				<div className='flex flex-col gap-1'>
					<p className='text-xs'>
						{dayjs(props.createAt).format('MMM DD')}
					</p>
					<p>{props.nameSong}</p>
					<p className='text-xs'>{props.singer}</p>
				</div>
			</div>
			<p className='text-[10px]'>Single</p>
			<div className='flex justify-between gap-4 text-3xl items-center'>
				<div className='flex gap-6'>
					<CiCirclePlus />
					<CiSaveDown1 />
					<CiMenuKebab />
				</div>
				<IoMdPlayCircle className='text-5xl' />
			</div>
		</div>
	);
}

export default NewSingerItem;
