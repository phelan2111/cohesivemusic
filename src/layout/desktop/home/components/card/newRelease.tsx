import HoverCard from '@/components/root/animation/hoverCard';
import SongCard from '@/components/ui/card/song';
import { Skeletons } from '@/components/ui/skelentons';
import Localize from '@/langs';
import { ResponseSongNewest } from '@/pages/home/types';
import { PATH } from '@/routes/config';
import { Fragment } from 'react/jsx-runtime';

type NewReleaseCardProps = {
	songsNewest: ResponseSongNewest;
	handler: {
		onRedirect: (path: string) => void;
	};
};

function NewReleaseCard(props: NewReleaseCardProps) {
	return (
		<Fragment>
			<Skeletons.Songs.NewRelease loading={props.songsNewest.loading}>
				<section className='flex flex-col gap-4 snap-start'>
					<h4 className='text-xl font-bold'>{Localize('NEW_RELEASE')}</h4>
					<article className='grid 2xl:grid-cols-3 gap-8 px-4 lg:grid-cols-1'>
						{[...props.songsNewest.songResponse.list].slice(0, 3).map((item) => {
							return (
								<HoverCard
									onClick={() => {
										props.handler.onRedirect(`${PATH.SONG._}/${item.songId}`);
									}}
									key={item.songId}
									className='rounded-lg overflow-hidden cursor-pointer shadow-xl'>
									<SongCard
										imageSong={item.image}
										nameSong={item.songName}
										singerName={item.singers.map((s) => s.singerName).join(', ')}
									/>
								</HoverCard>
							);
						})}
					</article>
				</section>
			</Skeletons.Songs.NewRelease>
		</Fragment>
	);
}

export default NewReleaseCard;
