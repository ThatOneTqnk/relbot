class SkriptCache {
    constructor() {
        this.cache = null;
    }

    updateCache(newCache) {
        this.cache = newCache;
    }

    exists() {
        return this.cache != null && this.cache.length > 0;
    }

    getCache() {
        return this.cache;
    }
}

module.exports = new SkriptCache();