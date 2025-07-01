import HoverCard from '@/components/root/animation/hoverCard';
import SongCard from '@/components/ui/card/song';
import Localize from '@/langs';
import data from '@/pages/home/data/newRelease.json';
function NewReleaseCard() {
	return (
		<section className='flex flex-col gap-4 snap-start'>
			<h4 className='text-xl font-bold'>{Localize('NEW_RELEASE')} Sơn Tùng M-TP</h4>
			<article className='grid 2xl:grid-cols-3 gap-8 px-4 lg:grid-cols-1'>
				{[...data].slice(0, 3).map((item) => {
					return (
						<HoverCard key={item.song.imageSong} className='rounded-lg overflow-hidden cursor-pointer shadow-xl'>
							<SongCard {...item.song} />
						</HoverCard>
					);
				})}
			</article>
		</section>
	);
}

export default NewReleaseCard;
