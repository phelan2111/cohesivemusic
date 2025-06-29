import Localize from '@/langs';
import { IsArtistOfYourLibrary } from '@/pages/yourLibrary/types';
import { FaCloudDownloadAlt } from 'react-icons/fa';
import { LuDot } from 'react-icons/lu';
import { Fragment } from 'react/jsx-runtime';

interface IYourLibraryAlbumItemProps {
	name: string;
	themeColor: string;
	madeFor?: string;
	image: string;
	isArtist: IsArtistOfYourLibrary;
}

function YourLibraryAlbumItem(props: IYourLibraryAlbumItemProps) {
	const isArtist = props.isArtist === IsArtistOfYourLibrary.artists;

	return (
		<div
			style={{
				borderRadius: !isArtist ? '8px' : '99999px',
			}}
			className='flex items-center gap-4 transition-all group duration-500 cursor-pointer snap-start relative hover:bg-white/10'>
			<div
				style={{
					borderColor: isArtist ? 'transparent' : props.themeColor,
				}}
				className='relative border-b-4 w-fit'>
				<img
					className={`h-20 w-20 object-cover ${isArtist ? 'rounded-full' : 'rounded-none'} `}
					src={props.image}
					alt={props.image}
				/>
				{!isArtist && (
					<div
						style={{
							borderColor: props.themeColor,
						}}
						className='absolute bottom-2 left-0 border-l-4 pl-2'>
						<p className='font-bold text-xs'>{props.name}</p>
					</div>
				)}
			</div>
			<div className='flex flex-col gap-1'>
				<p className='text-base font-semibold'>{props.name}</p>
				<div className='flex items-center gap-2 text-xs'>
					{props.madeFor ? (
						<Fragment>
							<FaCloudDownloadAlt className='text-green-600 text-lg' />
							<p className='flex items-center text-white/70'>
								{Localize('PLAYLIST')} <LuDot />
								{Localize('MADE_FOR')} {props.madeFor}
							</p>
						</Fragment>
					) : (
						<p className='flex items-center text-white/70'>{Localize('ARTISTS')}</p>
					)}
				</div>
			</div>
		</div>
	);
}

export default YourLibraryAlbumItem;
