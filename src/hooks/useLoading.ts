import { useState } from 'react';

type useLoadingProps = {
	defaultLoading?: boolean;
};
function useLoading({ defaultLoading = false }: useLoadingProps) {
	const [loading, setLoading] = useState(defaultLoading);

	return {
		handlerLoading: {
			onSetLoading: (dataItem: boolean) => setLoading(dataItem),
		},
		stateLoading: {
			loading,
		},
	};
}

export default useLoading;
