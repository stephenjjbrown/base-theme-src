import { PublicSettings } from "../models/public-settings";
export declare class PublicSettingsClient {
    readonly apiUrl: string;
    get(): Promise<PublicSettings>;
    update(data: PublicSettings): Promise<Response>;
}
