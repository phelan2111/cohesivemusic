import PopperBottom from '@/components/root/popper/bottom';
import {
	BsBroadcast,
	BsCloudDownloadFill,
	BsFillFileCodeFill,
	BsFillPlusCircleFill,
	BsFillXOctagonFill,
	BsShareFill,
} from 'react-icons/bs';
import { FaUserAstronaut } from 'react-icons/fa';
import { GoKebabHorizontal } from 'react-icons/go';
import RankSong from '../rank';
import MenuIcon, { IItemIcon } from '@/components/ui/menu/icon';

export interface IItemSong {
	name: string;
	singers: string[];
	image: string;
	idSong: string;
	rank: number;
}
interface ISongOfAlbumProps {
	data: IItemSong[];
}
function SongOfAlbum(props: ISongOfAlbumProps) {
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
		<section className='select-none'>
			{props.data.map((item, index) => {
				return (
					<div
						key={item.idSong}
						className='flex gap-4 pt-4 snap-start'>
						<RankSong no={index + 1} rank={item.rank} />
						<img
							className='min-w-12 max-w-12 h-12 object-cover rounded-sm'
							src={item.image}
							alt={item.image}
						/>
						<div className='flex items-center justify-between w-full'>
							<div>
								<h6>{item.name}</h6>
								<p className='text-xs truncate w-52'>
									{item.singers.join('_')}
								</p>
							</div>
							<PopperBottom
								render={(renderProps) => {
									return (
										<MenuIcon
											onClose={renderProps.onClose}
											items={itemsMenu}
										/>
									);
								}}>
								<GoKebabHorizontal className='text-lg rotate-90' />
							</PopperBottom>
						</div>
					</div>
				);
			})}
		</section>
	);
}

export default SongOfAlbum;
