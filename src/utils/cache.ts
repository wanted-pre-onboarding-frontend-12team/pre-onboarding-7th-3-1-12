import { Sick } from '@src/types/sick';

const ONE_HOUR = 1000 * 60 * 60;
const MAX_CACHE_SIZE = 10; // 테스트를 위한 캐시 임시 최대 크기;

const currentTime = () => new Date().getTime();

type ParsedSickInCache = {
	sicks: Sick[];
	expired: number;
};

type SickInCache = {
	sicks: string;
	expired: number;
};

export default class InMemoryCache {
	private _cache;

	constructor() {
		this._cache = new Map<string, string>();
	}

	get cache() {
		return this._cache;
	}

	getCacheItem = (key: string) => {
		if (!this._cache.has(key)) {
			console.error(`"${key}"로 존재하는 데이터가 없습니다.`);
			return;
		}

		try {
			const targetSicks: ParsedSickInCache = JSON.parse(this._cache.get(key) as string);
			return targetSicks.sicks;
		} catch (error) {
			if (error instanceof Error) console.error(error.message);
		}
	};

	setCacheItem = (key: string, value: Sick[]) => {
		const serialized = {
			sicks: value,
			expired: new Date().getTime() + ONE_HOUR,
		};

		try {
			if (this.getCacheSize() > MAX_CACHE_SIZE) {
				throw new Error('Max Local Cache !!');
			}
			this._cache.set(key, JSON.stringify(serialized));
		} catch (error) {
			this.cleanCache(key, JSON.stringify(serialized));
		}
	};

	cleanCache = (key: string, value: string) => {
		let oldest;
		let oldestKey;

		const countCacheBeforeClean = this.getCacheSize();

		for (let key of this._cache.keys()) {
			const sickInCache: SickInCache = JSON.parse(this._cache.get(key) as string);
			if (sickInCache.expired <= currentTime()) {
				this._cache.delete(key);
			}

			if (!oldest || oldest > sickInCache.expired) {
				oldest = sickInCache.expired;
				oldestKey = key;
			}
		}

		if (countCacheBeforeClean >= this._cache.size && oldestKey) {
			this._cache.delete(oldestKey);
		}

		this._cache.set(key, value);
	};

	isExistingInCache = (key: string) => {
		return this._cache.has(key);
	};

	getCacheSize = () => {
		return this._cache.size;
	};
}
