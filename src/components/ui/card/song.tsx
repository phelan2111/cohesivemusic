import Localize from '@/langs';
import { GoDotFill } from 'react-icons/go';
import { IoIosPlayCircle } from 'react-icons/io';

interface ISongCardProps {
	nameSong: string;
	singerName: string;
	imageSong: string;
}

function SongCard(props: ISongCardProps) {
	return (
		<div className='flex bg-primary_dark-10 rounded-md overflow-hidden shadow-materialDesign'>
			<img className='h-32 w-32 min-w-32 object-cover' src={props.imageSong} alt={props.imageSong} />
			<div className='flex flex-col justify-between p-4 w-full'>
				<div className='flex flex-col gap-1  text-xs font-semibold'>
					<h5>{props.nameSong}</h5>
					<div className='flex items-center gap-1 text-neutral'>
						<span>{Localize('SINGLE')}</span>
						<GoDotFill className='text-[8px]' />
						<span>{props.singerName}</span>
					</div>
				</div>
				<div className='flex justify-between items-center'>
					<div></div>
					<IoIosPlayCircle className='text-3xl hover:scale-110 transition-transform duration-300 cursor-pointer' />
				</div>
			</div>
		</div>
	);
}

export default SongCard;
