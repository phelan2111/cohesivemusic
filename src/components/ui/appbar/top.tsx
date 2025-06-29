import Tabs, { IItemTab } from '@/components/root/tabs';
import { useRedirect } from '@/hooks/useRedirect';
import { PATH } from '@/routes/config';
import InputSearchDesktop from '../input/search/desktop';
import { memo } from 'react';

const tabs: IItemTab<string>[] = [
	{
		text: 'ALL',
		value: PATH.HOME,
	},
	{
		text: 'MUSIC',
		value: PATH.MUSIC._,
	},
	{
		text: 'PODCAST',
		value: PATH.PODCASTS._,
		disabled: true,
	},
];

function ViewTool() {
	const { redirectPage } = useRedirect();
	const isSearch = location.pathname === PATH.SEARCH;
	const handleDefaultTab = (): IItemTab<string> => {
		const tabActive = tabs.find((i) => i.value === location.pathname);
		if (tabActive) {
			return tabActive;
		}
		return tabs[0];
	};

	if (isSearch) {
		return <InputSearchDesktop />;
	}
	return (
		<header className='select-none flex gap-4 items-center sticky top-0 h-11 z-50 snap-start'>
			<Tabs
				onChange={(dataItem: IItemTab<unknown>) => {
					redirectPage(dataItem.value as string);
				}}
				tabDefault={handleDefaultTab()}
				tabs={tabs}
			/>
		</header>
	);
}

interface IAppBarTopProps {
	className?: string;
}
function AppBarTop({ className = '' }: IAppBarTopProps) {
	return (
		<div className={`bg-primary_dark-10 w-full p-6 rounded-3xl flex flex-col gap-8  ${className}`}>
			<div className='flex justify-between items-center'>
				<ViewTool />
			</div>
		</div>
	);
}

export default memo(AppBarTop);
