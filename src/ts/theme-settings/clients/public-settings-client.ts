import { PublicSettings } from "../models/public-settings";

declare const wpApiSettings: {
    restUrl: string,
    nonce: string
}

export class PublicSettingsClient {
    get apiUrl() {
        return wpApiSettings.restUrl + "base-api/v1/public-settings";
    }

    get() {
        return fetch(this.apiUrl)
            .then(r => r.json()) as Promise<PublicSettings>;
    }

    update(data: PublicSettings) {
        return fetch(this.apiUrl, {
            method: "POST",
            body: JSON.stringify(data),
            credentials: 'include',
            headers: new Headers({
                "Content-Type": "application/json",
                'X-WP-Nonce': wpApiSettings.nonce
            })
        })
    }
}