import { useEffect, useState } from 'react';

export const useDebounce = (value: string, delay = 500) => {
	const [debouncedValue, setDebouncedValue] = useState('');

	useEffect(() => {
		const time = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(time);
		};
	}, [value, delay]);

	return debouncedValue;
};
