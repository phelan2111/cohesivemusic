import React, { ReactNode } from 'react';
import LoaderCapybara from './capybara';

type LoadingProps = {
	loading: boolean;
	children: ReactNode;
};
function Loading(props: LoadingProps) {
	return (
		<React.Fragment>
			{props.loading && (
				<div className='h-screen w-screen fixed top-0 left-0 bg-white/10 z-50 backdrop-blur-[4px] flex flex-col items-center justify-center'>
					<div className='scale-75'>
						<LoaderCapybara />
					</div>
					<p className='text-center -translate-y-8'>Đang xử lí....</p>
				</div>
			)}
			{props.children}
		</React.Fragment>
	);
}

export default Loading;
