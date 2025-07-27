import { LocalStorage } from '@/utils/enums';
import { Logger } from '@/utils/logger';

function useLocal() {
	const get = (key: LocalStorage): object => {
		try {
			Logger.info('useLocal execute get');
			Logger.debug('useLocal execute get have key', key);
			const value = localStorage.getItem(LocalStorage.SONG);
			if (!value) {
                throw new Error("Do not have values");
            };
			return JSON.parse(value) as object;
		} catch (error: unknown) {
			Logger.debug('useLocal execute get have error', error as object);
            return {} as object
		}
	};
	const set = (key: LocalStorage, value: unknown) => {
		try {
			Logger.info('useLocal execute set');
			Logger.debug('useLocal execute set have key', key);
			Logger.debug('useLocal execute set have value', value as object);

			localStorage.setItem(key, JSON.stringify(value));
		} catch (error) {
			Logger.debug('useLocal execute set have error', error as object);
		}
	};
	return {
		handler: {
			get,
			set,
		},
	};
}

export default useLocal;
