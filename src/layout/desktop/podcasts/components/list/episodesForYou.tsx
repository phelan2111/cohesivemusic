import HoverCard from '@/components/root/animation/hoverCard';
import EpisodesForYouCard from '@/components/ui/card/episodesForYou';
import Localize from '@/langs';
import data from '@/pages/home/data/episidesForyou.json';
import { handleStyleViewTool } from '../../list';
import { PATH } from '@/routes/config';
import { useRedirect } from '@/hooks/useRedirect';

function EpisodesForYou() {
	const { redirectPage } = useRedirect();

	return (
		<section className='flex flex-col gap-4 snap-start'>
			<h4 className='text-xl font-bold'>
				{Localize('YOUR_FAVORITE_PODCASTS')}
			</h4>
			<div
				className={`grid gap-6 px-4 ${
					handleStyleViewTool().className
				}`}>
				{[...data]
					.slice(0, handleStyleViewTool().sliceData)
					.map((i) => (
						<HoverCard
							onClick={() => {
								redirectPage(
									`${PATH.PODCASTS._}/8099c7ec-903e-4a5e-8fab-cde250e30400`,
								);
							}}
							className='rounded-lg p-2 overflow-hidden cursor-pointer shadow-xl'
							key={i.imageEpisodes}>
							<EpisodesForYouCard key={i.imageEpisodes} {...i} />
						</HoverCard>
					))}
			</div>
		</section>
	);
}

export default EpisodesForYou;
