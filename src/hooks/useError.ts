// hooks/useThrowOnMutationError.ts
import { useEffect } from 'react';

export function useThrowOnMutationError(error: unknown, isError: boolean) {
	useEffect(() => {
		if (isError && error instanceof Error) {
			throw error;
		}
	}, [error, isError]);
}
