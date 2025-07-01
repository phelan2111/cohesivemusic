import Localize from '@/langs';
import VerticalSingerItem from '@/components/ui/item/vertical';
import { handleStyleViewTool } from '../..';
import { ResponseSingerNewest } from '@/pages/home/types';
import { Fragment } from 'react/jsx-runtime';
import { Skeletons } from '@/components/ui/skelentons';

type YourFavoriteArtistsProps = {
	singersNewest: ResponseSingerNewest;
};

function YourFavoriteArtists(props: YourFavoriteArtistsProps) {
	return (
		<Fragment>
			<Skeletons.Singer loading={props.singersNewest.loading}>
				<section className='flex flex-col gap-4 snap-start'>
					<h4 className='text-xl font-bold'>{Localize('NEW_ARTIST')}</h4>
					<div className={`grid xl:grid-cols-3 lg:grid-cols-3 gap-4 px-4 ${handleStyleViewTool().className}`}>
						{props.singersNewest.singerResponse.list.slice(0, handleStyleViewTool().sliceData).map((i) => (
							<VerticalSingerItem key={i.singerName} avatarSinger={i.singerAvatar} nameSinger={i.singerName} />
						))}
					</div>
				</section>
			</Skeletons.Singer>
		</Fragment>
	);
}

export default YourFavoriteArtists;
