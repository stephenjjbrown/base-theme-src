import { sessionCache } from "../utilities/session-cache";

export class MenuItemClient {

    async getAll() {
        const cacheKey = 'base-theme-menu-items';
        let json = sessionCache.get(cacheKey);
        if (!json) {
            json = await fetch("/test/wp-json/wp-menus/v1/menus/top-navigation").then(r => r.text());
            console.log(json);
            sessionCache.set(cacheKey, json);
        }
        return JSON.parse(json);
    }
}