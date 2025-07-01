import Localize from '@/langs';
import { ResponsePlaylist } from '@/services/playlist/useGet';
import { LuDot } from 'react-icons/lu';

interface IAlbumOfMeItemProps {
	onClick?: VoidFunction;
	item: ResponsePlaylist;
	id?: string;
}

function AlbumOfMeItem(props: IAlbumOfMeItemProps) {
	const isActive = props?.id === props.item.playlistId;

	return (
		<div
			aria-hidden
			onClick={() => {
				if (!isActive) {
					props.onClick?.();
				}
			}}
			className={`flex items-center liked gap-4 transition-all group duration-500 cursor-pointer snap-start relative rounded-md hover:bg-white/10 ${
				isActive ? 'bg-white/10' : ''
			}`}>
			<div className='bg-gradient-to-r from-pink-500 to-violet-500 rounded-md'>
				<div className='heart'></div>
			</div>
			<div className='flex flex-col gap-1'>
				<p>{props.item.namePlaylist}</p>
				<div className='flex items-center gap-2 text-xs'>
					<p className='flex items-center text-white/70'>
						{Localize('PLAYLIST')} <LuDot /> {props.item.songs.length} {Localize('SONGS')}
					</p>
				</div>
			</div>
		</div>
	);
}

export default AlbumOfMeItem;
