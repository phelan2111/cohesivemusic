import { createContext, Fragment, ReactNode, useMemo, useState } from 'react';

type ModalContextData = {
	hasModal: boolean;
	data: unknown;
	onCloseModal: VoidFunction;
	onModal: (component: ReactNode) => void;
	onSetData: (dataItem: unknown) => void;
	component: ReactNode;
};

const initialModalContext: ModalContextData = {
	hasModal: false,
	data: {},
	onCloseModal: () => {},
	onModal: () => {},
	component: <Fragment />,
	onSetData: () => {},
};

export const ModalContext = createContext(initialModalContext);

type ModalProviderProps = {
	children: ReactNode;
};
function ModalProvider(props: ModalProviderProps) {
	const [state, setState] = useState<Omit<ModalContextData, 'onCloseModal' | 'onModal'>>(initialModalContext);

	const handleModal = (component: ReactNode) => {
		setState((prev) => ({
			...prev,
			hasModal: true,
			component,
		}));
	};
	const handleCloseModal = () => {
		setState((prev) => ({ ...prev, hasModal: false }));
	};
	const handleSetData = (dataItem: unknown) => {
		setState((prev) => ({
			...prev,
			data: dataItem,
		}));
	};

	const value = useMemo(
		() => ({
			...state,
			onCloseModal: handleCloseModal,
			onModal: handleModal,
			onSetData: handleSetData,
		}),
		[state],
	);

	return <ModalContext.Provider value={value}>{props.children}</ModalContext.Provider>;
}

export default ModalProvider;
