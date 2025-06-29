import { handleStyleViewTool } from '@/layout/desktop/home';
import { ReactNode } from 'react';

type YourTopMixesProps = {
	loading: boolean;
	children: ReactNode;
};

function YourTopMixes(props: YourTopMixesProps) {
	if (!props.loading) {
		return <>{props.children}</>;
	}
	return (
		<section className='flex animate-pulse flex-col gap-4 snap-start'>
			<div className='flex justify-between w-full items-center'>
				<div className='h-[28px] w-32 bg-[#EEEEEE]/20 rounded-md' />
			</div>
			<div className={`grid xl:grid-cols-3 lg:grid-cols-3 gap-6 px-4 ${handleStyleViewTool().className}`}>
				{Array.from({ length: 4 }).map((_, index) => (
					<div key={`YourTopMixes_${index}`} className='flex flex-col h-[240px] items-start gap-3 bg-[#EEEEEE]/10 rounded-md p-2'>
						<div className='h-[180px] bg-[#EEEEEE]/20 rounded-md' />
						<div className='flex flex-col gap-1'>
							<p className='text-base font-semibold w-10 h-1 bg-[#EEEEEE]/20'></p>
							<div className='flex items-center gap-2 h-1 w-20 text-xs bg-[#EEEEEE]/20'></div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}

export default YourTopMixes;
