export const CacheStorage = {
	set(key: string, value: string) {
		sessionStorage.setItem(key, value);
	},
	get(key: string): any {
		return sessionStorage.getItem(key);
	},
};
