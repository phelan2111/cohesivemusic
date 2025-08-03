import Localize from '@/langs';
import { Helper } from '@/utils/helper';
import AddLikeSongs from '../buttons/addLikeSongs';
import { TypeSongBelongUser } from '@/utils/enums';
import Extends from '../buttons/extends';
import { FaPause, FaPlay } from 'react-icons/fa6';
import LoaderPreviewMV from '@/components/ui/loader/previewMV';
import { ResponseRequest } from '@/services/types';
import { ResponsePlaylist } from '@/services/playlist/me';
import { AddNewPlaylistFunc } from '@/pages/album/types';
import { PayloadPlaylistAdd } from '@/services/playlist/add';

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
	songId: string;
	isPause: boolean;
	addSongToPlaylist?: (dataItem: PayloadPlaylistAdd) => void;
	playlistMeResponse: ResponseRequest<ResponsePlaylist>;
	playPlaylist: (songId: string) => void;
	updateSongToPlaylist: (dataItem: AddNewPlaylistFunc) => void;
	pausePlaylist: VoidFunction;
	playlistMe: VoidFunction;
}
function SongOfAlbum(props: ISongOfAlbumProps) {
	return (
		<section className='select-none flex flex-col gap-0'>
			<div className='flex justify-between group items-center p-3 rounded-xl transition-all duration-500 cursor-pointer'>
				<div className='flex gap-4 snap-start items-center'>
					<div className='w-[30px] text-center'>#</div>
					<div className='w-[280px]'>{Localize('TITLE')}</div>
				</div>
				<div className='line-clamp-1'>{Localize('VIEWED')}</div>
				<div className='flex items-center gap-4 w-[92px] justify-center'>{Localize('TIME')}</div>
			</div>
			{props.data.map((item, index) => {
				const isPlayThisSong = item.idSong === props.songId;
				const isPlay = isPlayThisSong && props.isPause;
				return (
					<div
						className={`flex justify-between group items-center hover:bg-primary_light/10 p-3 rounded-xl transition-all duration-500 cursor-pointer ${
							isPlayThisSong ? 'text-purple-500' : 'text-white'
						}`}
						key={item.idSong}>
						<div className='flex gap-4 snap-start items-center relative overflow-hidden'>
							<div>{isPlay ? <LoaderPreviewMV /> : <p className='w-[30px] text-center'>{index + 1}</p>}</div>
							<img className='min-w-12 max-w-12 h-12 object-cover rounded-lg' src={item.image} alt={item.image} />
							<div className='flex items-center justify-between w-full'>
								<div>
									<h6>{item.name}</h6>
									<p className='text-xs truncate w-52'>{item.singers.join('_')}</p>
								</div>
							</div>
							<div
								aria-hidden
								onClick={() => {
									if (isPlay) {
										props.pausePlaylist();
									} else {
										props.playPlaylist(item.idSong);
									}
								}}
								className={`absolute top-0 bottom-0 m-auto left-0 opacity-0 pointer-events-none bg-primary_dark-20/90 backdrop-blur-sm w-24 -translate-x-full group-hover:translate-x-0 transition-all duration-500 rounded-md flex items-center justify-center group-hover:pointer-events-auto group-hover:opacity-100`}>
								{isPlay ? <FaPause className='text-2xl' /> : <FaPlay className='text-2xl' />}
							</div>
						</div>
						<p>{Helper.formatNumber(item.views)}</p>
						<div className='flex items-center gap-4'>
							<AddLikeSongs
								getPlaylistMe={props.playlistMe}
								playlistMeResponse={props.playlistMeResponse}
								addSongToPlaylist={(dataItem) => {
									props.addSongToPlaylist?.(dataItem);
								}}
								updateSongToPlaylist={props.updateSongToPlaylist}
								songId={item.idSong}
								defaultLike={item.isBelong === TypeSongBelongUser.yes}
							/>
							<p>
								{Helper.convertTime(item.duration as number).minus}:{Helper.convertTime(item.duration as number).second}
							</p>
							<Extends />
						</div>
					</div>
				);
			})}
		</section>
	);
}

export default SongOfAlbum;
