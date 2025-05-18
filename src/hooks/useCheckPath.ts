/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

type useCheckPathProps = {
	paths: string[];
};

function useCheckPath(props: useCheckPathProps): boolean {
	const location = useLocation();
	const isHasPath = useMemo(() => {
		return props.paths.includes(location.pathname);
	}, [JSON.stringify(location)]);
	return Boolean(isHasPath);
}

export default useCheckPath;
