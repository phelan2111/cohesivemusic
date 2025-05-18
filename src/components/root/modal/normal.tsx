import { ModalContext } from '@/contexts/modal';
import { Fragment, useContext } from 'react';

function Modal() {
	const { hasModal, component } = useContext(ModalContext);

	return (
		<Fragment>
			<div
				aria-hidden
				className={`fixed bottom-0 bg-gradient-to-t from-black/70 backdrop-blur left-0 z-50 overflow-hidden transition-all duration-300 ${
					hasModal ? 'w-full h-full' : 'w-0 h-0'
				}`}>
				<div className='flex w-full h-full items-center justify-center relative z-30'>
					<div className='relative'>{component}</div>
				</div>
			</div>
		</Fragment>
	);
}

export default Modal;
