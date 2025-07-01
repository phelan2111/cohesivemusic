import React from 'react';

type AlbumProps = {
	loading: boolean;
	children: React.ReactNode;
};

function Album(props: AlbumProps) {
	if (!props.loading) {
		return <>{props.children}</>;
	}
	return (
		<section className='flex animate-pulse flex-col h-albumDk rounded-2xl relative bg-primary_dark-10 overflow-auto scrollHiddenY'>
			<article className='min-h-[400px] w-full flex items-center relative  bg-[#EEEEEE]/20'>
				<div className='relative z-10 px-10 flex flex-col gap-4 animate-translateBottom_duration_1dot2'>
					<div className='flex items-center gap-2'>
						<div className='text-8xl font-bold h-4 w-40 bg-[#EEEEEE]/20'></div>
						<div className='text-8xl font-bold h-4 w-1/4 bg-[#EEEEEE]/20'></div>
					</div>
					<div className='text-8xl font-bold size-28 bg-[#EEEEEE]/20'></div>
				</div>
				<div className='absolute top-0 right-0 w-full h-full bg-gradient-to-r rounded-t-xl from-primary_dark-10/70' />
			</article>
			<div className={`px-10 h-full bg-[#EEEEEE]/20`}></div>
		</section>
	);
}

export default Album;
