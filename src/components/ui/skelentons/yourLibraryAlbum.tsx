import { ReactNode } from 'react';

type YourLibraryAlbumProps = {
	loading: boolean;
	children: ReactNode;
};

function YourLibraryAlbum(props: YourLibraryAlbumProps) {
	if (!props.loading) {
		return <>{props.children}</>;
	}
	return (
		<div className='flex flex-col gap-4 h-yourLibraryDk scrollHiddenY'>
			{Array.from({ length: 4 }).map((_, index) => (
				<div key={`YourLibraryAlbum_${index}`} className='flex h-[84px] items-center gap-3 bg-[#EEEEEE]/10 rounded-md p-2'>
					<div className='size-16 bg-[#EEEEEE]/20 rounded-md' />
					<div className='flex flex-col gap-1'>
						<p className='text-base font-semibold w-10 h-1 bg-[#EEEEEE]/20'></p>
						<div className='flex items-center gap-2 h-1 w-20 text-xs bg-[#EEEEEE]/20'></div>
					</div>
				</div>
			))}
		</div>
	);
}

export default YourLibraryAlbum;
