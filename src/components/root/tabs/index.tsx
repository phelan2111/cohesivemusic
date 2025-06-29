import Localize from '@/langs';
import { useState } from 'react';

export interface ITabsProps<T> {
	tabs: IItemTab<T>[];
	tabDefault: IItemTab<T>;
	className?: string;
	classNameItem?: string;
	classNameActive?: string;
	onChange: (dataItem: IItemTab<T>) => void;
}
export interface IItemTab<T> {
	text: string;
	value: T;
	disabled?: boolean;
}
function Tabs({ className = '', classNameItem = '', classNameActive = '', ...props }: ITabsProps<unknown>) {
	const [tab, setTab] = useState<IItemTab<unknown>>(props.tabDefault);

	const handleChangeTab = (item: IItemTab<unknown>) => {
		setTab(item);
		props.onChange(item);
	};

	return (
		<div className={`flex gap-2 ${className}`}>
			{props.tabs.map((t) => {
				const isSelected: boolean = t.value === tab.value;
				const classActive = isSelected
					? `bg-primary_light text-primary_dark hover:bg-primary_light/80 ${classNameActive}`
					: `hover:bg-primary_light/10 ${classNameItem}`;
				return (
					<div
						style={{
							opacity: t.disabled ? '0.4' : '1',
							pointerEvents: t.disabled ? 'none' : 'auto',
						}}
						aria-hidden
						onClick={() => {
							handleChangeTab(t);
						}}
						className={`px-4 py-1 rounded-3xl transition-colors duration-500 cursor-pointer ${classActive}`}
						key={Tabs.name + t.text}>
						{Localize(t.text)}
					</div>
				);
			})}
		</div>
	);
}

export default Tabs;
