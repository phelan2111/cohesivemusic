import React from 'react';
import emptyPlaylistP from '@/assets/images/playlist/emptyPlaylist.png';
import Localize from '@/langs';
import FollowButton from '@/components/ui/button/follow';

type EmptyProps = {
	children: React.ReactNode;
	isEmpty: boolean;
	onClick?: VoidFunction;
};
function Empty(props: EmptyProps) {
	if (!props.isEmpty) {
		return <>{props.children}</>;
	}
	return (
		<div className='h-full flex items-center justify-center gap-4'>
			<img className='w-80' src={emptyPlaylistP} alt='Empty' />
			<div className='flex flex-col gap-2'>
				<p className='text-2xl font-bold'>{Localize('ADD_YOUR_SONGS')}</p>
				<p className='text-sm'>{Localize('ADD_YOUR_SONGS_DES')}</p>
				<div className='py-4'>
					<FollowButton onClick={props.onClick} text='FIND_SONGS' className='!bg-primary_dark-20 w-32' />
				</div>
			</div>
		</div>
	);
}

export const Others = {
	Empty,
};
