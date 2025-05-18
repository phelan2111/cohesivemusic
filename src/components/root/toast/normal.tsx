import { ToastContext, ToastType } from '@/contexts/toast';
import Localize from '@/langs';
import { ReactNode, useContext, useEffect } from 'react';
import { BsBanFill } from 'react-icons/bs';
import { FaCheckCircle, FaPaw } from 'react-icons/fa';
import { IoIosWarning } from 'react-icons/io';
type IItemToast = {
	icon: ReactNode;
	className: string;
};
const parseToast: Record<ToastType, IItemToast> = {
	[ToastType.success]: {
		className: 'text-[#77E4C8]',
		icon: <FaCheckCircle className='text-3xl' />,
	},
	[ToastType.error]: {
		className: 'text-[#C96868]',
		icon: <BsBanFill className='text-3xl' />,
	},
	[ToastType.normal]: {
		className: 'text-white',
		icon: <FaPaw className='text-3xl' />,
	},
	[ToastType.warning]: {
		className: 'text-[#F6EFBD]',
		icon: <IoIosWarning className='text-3xl' />,
	},
};
function Toast() {
	const { data, hasToast, onCloseToast } = useContext(ToastContext);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (hasToast) {
				onCloseToast();
			}
		}, 2000);
		return () => {
			clearTimeout(timer);
		};
	}, [data.timeout, hasToast, onCloseToast]);

	return (
		<div
			className={`fixed top-4 bg-white/10 backdrop-blur-2xl rounded-lg transition-all z-50 min-w-72 duration-500 ${
				hasToast ? 'translate-x-0 right-4 opacity-100' : 'translate-x-full right-0 opacity-0'
			}`}>
			{data.renderComponent?.() ?? (
				<div className='p-4'>
					<div className={`flex items-center gap-4 ${parseToast[data.theme as ToastType].className}`}>
						{parseToast[data.theme as ToastType].icon}
						<div className='flex flex-col gap-1'>
							<p className='text-xl font-semibold'>{Localize(data?.label ?? 'SYSTEM_ERROR')}</p>
							<p className='text-sm'>{Localize(data?.content ?? 'SOMETHING_WERE_WRONG')}</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Toast;
