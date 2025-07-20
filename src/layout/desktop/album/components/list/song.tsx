import Localize from '@/langs';
import { Helper } from '@/utils/helper';
import { BsThreeDots } from 'react-icons/bs';
import AddLikeSongs from '../buttons/addLikeSongs';
import { TypeSongBelongUser } from '@/utils/enums';
import { PayloadPlaylistUpdate } from '@/services/playlist/update';

export interface IItemSong {
	name: string;
	singers: string[];
	image: string;
	idSong: string;
	views: number;
	duration?: number;
	isBelong?: TypeSongBelongUser;
}
interface ISongOfAlbumProps {
	data: IItemSong[];
	updateSongToPlaylist?: (dataItem: PayloadPlaylistUpdate) => void;
}
function SongOfAlbum(props: ISongOfAlbumProps) {
	return (
		<section className='select-none flex flex-col gap-0'>
			<div className='flex justify-between group items-center p-3 rounded-xl transition-all duration-500 cursor-pointer'>
				<div className='flex gap-4 snap-start items-center'>
					<div>#</div>
					<div className='w-[280px]'>{Localize('TITLE')}</div>
				</div>
				<div className='line-clamp-1'>{Localize('VIEWED')}</div>
				<div className='flex items-center gap-4 w-[92px] justify-center'>{Localize('TIME')}</div>
			</div>
			{props.data.map((item, index) => {
				return (
					<div
						className='flex justify-between group items-center hover:bg-primary_light/10 p-3 rounded-xl transition-all duration-500 cursor-pointer'
						key={item.idSong}>
						<div className='flex gap-4 snap-start items-center'>
							<div>{index + 1}</div>
							<img className='min-w-12 max-w-12 h-12 object-cover rounded-lg' src={item.image} alt={item.image} />
							<div className='flex items-center justify-between w-full'>
								<div>
									<h6>{item.name}</h6>
									<p className='text-xs truncate w-52'>{item.singers.join('_')}</p>
								</div>
							</div>
						</div>
						<p>{Helper.formatNumber(item.views)}</p>
						<div className='flex items-center gap-4'>
							<AddLikeSongs
								updateSongToPlaylist={(dataItem) => {
									props.updateSongToPlaylist?.(dataItem);
								}}
								songId={item.idSong}
								defaultLike={item.isBelong === TypeSongBelongUser.yes}
							/>
							<p>
								{Helper.convertTime(item.duration as number).minus}:{Helper.convertTime(item.duration as number).second}
							</p>
							<BsThreeDots className='opacity-0 group-hover:opacity-100 transition-opacity duration-500 cursor-pointer' />
						</div>
					</div>
				);
			})}
		</section>
	);
}

export default SongOfAlbum;
