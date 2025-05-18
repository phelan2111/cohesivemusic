import { ReactNode } from 'react';
import NavigateLeft from '../navigate/left';
import Header from '@/components/ui/common/header';
import { sliceToolControl } from '@/redux/slice';
import { EnumToolType } from '@/redux/slice/toolControl';
import ToolNowPlayingView from '@/components/ui/tool/nowPlayingView';

export interface IWrapperProps {
	children: ReactNode;
	className?: string;
	extends?: ReactNode;
	isNavigate?: boolean;
	isHeader?: boolean;
}
function ViewTool() {
	const typeTargeted = sliceToolControl.useGetState().typeTool;
	const view: Record<EnumToolType, ReactNode> = {
		[EnumToolType.nowPlayingView]: <ToolNowPlayingView />,
		[EnumToolType.connectToADevice]: <div>connectToADevice</div>,
		[EnumToolType.queue]: <div>queue</div>,
	};
	return view[typeTargeted];
}
function Wrapper({ className = '', ...props }: IWrapperProps) {
	const isView = sliceToolControl.useGetState().open;
	return (
		<main
			id='wrapper'
			className={`min-h-screen bg-primary_light text-primary_dark dark:bg-primary_dark dark:text-primary_light ${className}`}>
			<div className='max-w-[1920px] m-auto w-full lg:flex lg:p-6'>
				{props.isNavigate && <NavigateLeft />}
				<div className='flex w-full'>
					<div className='w-full lg:px-6 lg:flex lg:gap-6 lg:flex-col'>
						{props.isHeader && <Header />}
						{props.children}
					</div>
					<aside
						className={`bg-primary_dark-10 overflow-hidden hidden xl:block rounded-3xl transition-all duration-500  ${
							isView ? 'min-w-96 w-96' : 'w-0 min-w-0'
						}`}>
						<div className={'p-4 pr-2'}>
							<ViewTool />
						</div>
					</aside>
				</div>
			</div>
			<div className='hidden lg:block'>{props.extends}</div>
		</main>
	);
}

export default Wrapper;
