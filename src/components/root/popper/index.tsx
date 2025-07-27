import { ReactNode, useLayoutEffect, useRef, useState } from 'react';
type RenderContentProps = {
	onClose: VoidFunction;
	onOpen: VoidFunction;
	open: boolean | undefined;
};
interface IPopoverProps {
	children?: ReactNode;
	className?: string;
	renderContent?: (renderContentProps: RenderContentProps) => ReactNode;
	renderChildren?: (renderContentProps: RenderContentProps) => ReactNode;
	top?: string;
	bottom?: string;
}
function Popover({ className = 'text-primary_dark rounded-sm -bottom-1 left-0', bottom = '0px', top = '0px', ...props }: IPopoverProps) {
	const [open, setOpen] = useState<boolean | undefined>(undefined);
	const ref = useRef<HTMLDivElement>(null);
	const refPopper = useRef<HTMLDivElement>(null);

	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	useLayoutEffect(() => {
		const element = ref.current;
		const popperElement = refPopper.current;
		const wrapperElement = document.getElementById('wrapper');

		if (wrapperElement && element && popperElement) {
			const rect = element.getBoundingClientRect();
			const heightHalfScreen = wrapperElement.clientHeight / 2;

			const widthHalfScreen = wrapperElement.clientWidth / 2;
			const isCondition = rect.bottom > heightHalfScreen;
			const isConditionLeft = rect.left > widthHalfScreen;

			if (isCondition) {
				popperElement.style.bottom = bottom;
				if (open === undefined) {
					popperElement.style.transform = `translateY(-${element.clientHeight + 4}px) translateX(${
						isConditionLeft ? '-24px' : '24px'
					})`;
				} else {
					if (open) {
						popperElement.style.transform = `translateY(-${element.clientHeight + 4}px) translateX(0px)`;
					} else {
						popperElement.style.transform = `translateY(-${element.clientHeight + 4}px) translateX(${
							isConditionLeft ? '-24px' : '24px'
						})`;
					}
				}
			} else {
				popperElement.style.top = top;
				if (open === undefined) {
					popperElement.style.transform = `translateY(${element.clientHeight + 4}px) translateX(${
						isConditionLeft ? '-24px' : '24px'
					})`;
				} else {
					if (open) {
						popperElement.style.transform = `translateY(${element.clientHeight + 4}px) translateX(0px)`;
						popperElement.style.height = '100%';
					} else {
						popperElement.style.transform = `translateY(${element.clientHeight + 4}px) translateX(${
							isConditionLeft ? '-24px' : '24px'
						})`;
						popperElement.style.height = '0px';
					}
				}
			}
			return () => {};
		}
	}, [ref, open]);

	return (
		<div className='w-full'>
			<div className='relative w-full' aria-hidden>
				<div ref={ref} className='cursor-pointer w-full' aria-hidden onClick={handleOpen}>
					{props.children ??
						props.renderChildren?.({
							onClose: handleClose,
							onOpen: handleOpen,
							open,
						})}
				</div>
				<div
					ref={refPopper}
					className={`absolute w-full transition-all duration-500 z-20 ${
						open ? 'opacity-100' : 'opacity-0 pointer-events-none'
					} ${className}`}>
					{props.renderContent?.({
						onClose: handleClose,
						onOpen: handleOpen,
						open,
					})}
				</div>
			</div>
			{open && <div aria-hidden onClick={handleClose} className='fixed z-10 bg-transparent w-screen h-screen -bottom-0 -left-0' />}
		</div>
	);
}

export default Popover;
