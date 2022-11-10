import { CacheStorage } from './CacheStorage';

export const Cache = {
	isCached(key: string) {
		if (CacheStorage.get(key)) {
			return true;
		}
		return false;
	},

	setCache(key: string, value: string) {
		CacheStorage.set(key, value);
	},

	getCache(key: string): string {
		return CacheStorage.get(key);
	},
};
