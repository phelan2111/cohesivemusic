import FilterChip, { IItemFilterChip } from '@/components/ui/filter/chip';
import { NewsItem } from '@/components/ui/item/newSinger';
import ResponsiveDesktop from '@/components/ui/responsive/desktop';
import Localize from '@/langs';
import News from './components/list/new';

type WhatNewsDesktopProps = {
	filter: IItemFilterChip[];
	news: NewsItem[];
};

function WhatNewsDesktop(props: WhatNewsDesktopProps) {
	return (
		<ResponsiveDesktop>
			<article className='flex flex-col gap-2 w-full'>
				<p className='text-4xl font-medium'>{Localize('WHAT_NEW')}</p>
				<p>{Localize('WHATNEWS_DESCRIPTION')}</p>
				<div className='flex flex-col gap-3'>
					<FilterChip data={props.filter} />
					<section className='w-full animate-translateBottom_duration_0dot8 flex flex-col gap-8 pb-4 lg:h-desktopWrapper lg:overflow-auto scrollHiddenY pr-3'>
						<News data={props.news} />
					</section>
				</div>
			</article>
		</ResponsiveDesktop>
	);
}

export default WhatNewsDesktop;
