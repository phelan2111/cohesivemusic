import FilterChip, { IItemFilterChip } from '@/components/ui/filter/chip';
import Localize from '@/langs';
import { IoArrowBackSharp } from 'react-icons/io5';
import New from './components/list/new';
import PlaySong from '@/components/ui/play/song';
import BottomNavigate, { links } from '@/components/root/navigate/bottom';
import { useRedirect } from '@/hooks/useRedirect';
import { useEffect } from 'react';
import { NewsItem } from '@/components/ui/item/newSinger';

type WhatNewsMobileProps = {
	filter: IItemFilterChip[];
	news: NewsItem[];
};
function WhatNewsMobile(props: WhatNewsMobileProps) {
	const { redirectPrev } = useRedirect();

	useEffect(() => {
		const h2Title = document.querySelector('#whatNews');
		const elementScroll = document.querySelector('#elementScroll');
		const navigateTop = document.querySelector('#navigateTop');
		const titleNavigateTop = document.querySelector('#titleNavigateTop');
		if (elementScroll) {
			elementScroll.addEventListener('scroll', () => {
				if (h2Title) {
					const rect = h2Title.getBoundingClientRect();
					const isHidden = rect.top < 0;
					if (isHidden) {
						navigateTop?.classList.add('bg-primary_dark-10');
						titleNavigateTop?.classList.remove('opacity-0');
					} else {
						navigateTop?.classList.remove('bg-primary_dark-10');
						titleNavigateTop?.classList.add('opacity-0');
					}
				}
			});
			return () => {
				elementScroll.removeEventListener('scroll', () => {});
			};
		}
	}, []);

	return (
		<main className='h-screen w-screen lg:hidden block bg-primary_dark-20 text-white pb-40'>
			<div
				id='navigateTop'
				className='p-4 text-2xl flex gap-4 sticky top-0 transition-colors duration-700 z-10 animate-translateBottom_duration_0dot8 snap-start'>
				<IoArrowBackSharp aria-hidden onClick={redirectPrev} />
				<p
					id='titleNavigateTop'
					className='text-lg transition-opacity duration-500 opacity-0'>
					{Localize('WHAT_NEW')}
				</p>
			</div>
			<div
				id='elementScroll'
				className='h-podcasts overflow-y-auto snap-mandatory snap-y animate-translateBottom_duration_0dot8'>
				<div className='px-4 pt-4 snap-start'>
					<h4 id='whatNews' className='text-3xl font-bold'>
						{Localize('WHAT_NEW')}
					</h4>
					<p className='text-sm'>
						{Localize('THE_LATEST_RELEASE_FORM_ARTISTS')}
					</p>
				</div>
				<article className='p-4'>
					<FilterChip data={props.filter} />
				</article>
				<h2 className='text-md font-bold px-4'>{Localize('NEW')}</h2>
				<New data={props.news} />
			</div>
			<BottomNavigate defaultPath={links[0]} />
			<PlaySong />
		</main>
	);
}

export default WhatNewsMobile;
