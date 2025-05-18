import { IItemFilterChip } from '@/components/ui/filter/chip';
import ScreenResponsive from '@/components/ui/responsive/screen';
import WhatNewsDesktop from '@/layout/desktop/whatNews';
import WhatNewsMobile from '@/layout/mobile/whatNews';
import dataNews from './data/new.json';

const filter: IItemFilterChip[] = [
	{
		label: 'Music',
		value: 'Music',
	},
	{
		label: 'Podcasts & Show',
		value: 'Podcasts&Show',
		children: [
			{
				label: 'Podcasts & Show',
				value: 'Podcasts&Show',
			},
			{
				label: 'Unplayed',
				value: 'Unplayed',
			},
		],
	},
];

function View() {
	return (
		<ScreenResponsive
			mobile={() => <WhatNewsMobile news={dataNews} filter={filter} />}
			desktop={() => <WhatNewsDesktop news={dataNews} filter={filter} />}
		/>
	);
}

export default View;
