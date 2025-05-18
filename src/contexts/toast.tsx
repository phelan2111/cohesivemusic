import { createContext, ReactNode, useMemo, useState } from 'react';

type ToastContextData = {
	hasToast: boolean;
	data: ToastPayload;
	onCloseToast: VoidFunction;
	onToast: (dataItem: ToastPayload) => void;
};
export enum ToastType {
	success = 0,
	error,
	warning,
	normal,
}
export type ToastPayload = {
	renderComponent?: () => ReactNode;
	content?: string;
	label?: string;
	theme: ToastType;
	timeout?: number;
};
const initialToastContext: ToastContextData = {
	hasToast: false,
	data: {
		theme: ToastType.normal,
		timeout: 5000,
		content: 'SOMETHING_WERE_WRONG',
		label: 'SYSTEM_ERROR',
	},
	onCloseToast: () => {},
	onToast: () => {},
};

export const ToastContext = createContext(initialToastContext);

type ToastProviderProps = {
	children: ReactNode;
};
function ToastProvider(props: ToastProviderProps) {
	const [state, setState] = useState<Omit<ToastContextData, 'onCloseToast' | 'onToast'>>(initialToastContext);

	const handleToast = (dataItem: ToastPayload) => {
		setState({
			data: dataItem,
			hasToast: true,
		});
	};
	const handleCloseToast = () => {
		setState((prev) => ({ ...prev, hasToast: false }));
	};

	const value = useMemo(
		() => ({
			...state,
			onCloseToast: handleCloseToast,
			onToast: handleToast,
		}),
		[state],
	);

	return <ToastContext.Provider value={value}>{props.children}</ToastContext.Provider>;
}

export default ToastProvider;
