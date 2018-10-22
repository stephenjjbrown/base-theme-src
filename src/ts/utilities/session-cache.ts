class SessionCache {
    get(key: string): string {
        return sessionStorage.getItem(key);
    }

    set(key: string, value: string) {
        try {
            sessionStorage.setItem(key, value);
        } catch(err) {
            console.warn("Could not cache item at key " + key + " with value", value);
            console.warn(err);
        }

        const thing = /([a-z]).*?/gi
    }

    remove(key: string) {
        sessionStorage.removeItem(key);
    }
}

export const sessionCache = new SessionCache();