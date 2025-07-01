import { handleStyleViewTool } from '@/layout/desktop/home';
import { ReactNode } from 'react';

type SingerProps = {
	loading: boolean;
	children: ReactNode;
};

function Singer(props: SingerProps) {
	if (!props.loading) {
		return <>{props.children}</>;
	}
	return (
		<section className='flex animate-pulse flex-col gap-6 snap-start'>
			<div className='flex justify-between w-full items-center'>
				<div className='h-[28px] w-32 bg-[#EEEEEE]/20 rounded-md' />
			</div>
			<div className={`grid xl:grid-cols-3 lg:grid-cols-3 gap-6 px-4 ${handleStyleViewTool().className}`}>
				{Array.from({ length: 4 }).map((_, index) => (
					<div key={`Singer_${index}`} className='flex flex-col h-[200px] items-center gap-3'>
						<div className='size-[160px] bg-[#EEEEEE]/20 rounded-full' />
						<p className='text-base h5 font-semibold w-10 h-1 bg-[#EEEEEE]/20'></p>
					</div>
				))}
			</div>
		</section>
	);
}
export default Singer;
