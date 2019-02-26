import { sessionCache } from "../utilities/session-cache";

export class MenuItem {
    id: number;
    title: string;
    url: string;
}

export class MenuItemClient {

    async getAll(): Promise<MenuItem[]> {
        console.log('getall called')
        const cacheKey = 'base-theme-menu-items';
        let json: string | null = null;//sessionCache.get(cacheKey);
        if (!json) {
            json = await fetch(_wpSiteInfo.siteUrl + "/wp-json/wp-menus/v1/menus/top-navigation")
                .then(r => r.text()) as string;
            console.log('menu items', json);
            sessionCache.set(cacheKey, json);
        }
        return JSON.parse(json);
    }
}