import { ReactNode } from 'react';

type SongsProps = {
	loading: boolean;
	children: ReactNode;
};

function NewRelease(props: SongsProps) {
	if (!props.loading) {
		return <>{props.children}</>;
	}
	return (
		<section className='flex animate-pulse flex-col gap-4 snap-start'>
			<div className='flex justify-between w-full items-center'>
				<div className='h-[28px] w-32 bg-[#EEEEEE]/20 rounded-md' />
			</div>
			<div className={`grid 2xl:grid-cols-3 gap-8 px-4 lg:grid-cols-1`}>
				{Array.from({ length: 3 }).map((_, index) => (
					<div key={`Songs_${index}`} className='flex flex-col h-[128px] items-start gap-3 bg-[#EEEEEE]/10 rounded-md p-2'>
						<div className='h-[128px] bg-[#EEEEEE]/20 rounded-md' />
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

function NewMVRelease(props: SongsProps) {
	if (!props.loading) {
		return <>{props.children}</>;
	}
	return (
		<section className='flex animate-pulse flex-col gap-4 snap-start'>
			<div className='flex justify-between w-full items-center'>
				<div className='h-[28px] w-32 bg-[#EEEEEE]/20 rounded-md' />
			</div>
			<div className={`grid 2xl:grid-cols-3 gap-8 px-4 lg:grid-cols-1`}>
				{Array.from({ length: 3 }).map((_, index) => (
					<div key={`Songs_${index}`} className='flex flex-col h-[384px] items-start gap-3 bg-[#EEEEEE]/10 rounded-md p-2'>
						<div className='h-[340px] w-full bg-[#EEEEEE]/20 rounded-md' />
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

export const Songs = {
	NewRelease,
	NewMVRelease,
};
