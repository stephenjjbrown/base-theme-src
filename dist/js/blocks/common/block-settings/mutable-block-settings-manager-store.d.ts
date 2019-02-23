import { MutableBlockSettingsManager } from "./mutable-block-settings-manager";
declare class MutableBlockSettingsManagerStore {
    _managers: {};
    get(id: string): any;
    create<TSettings>(id: string, defaultSettings: TSettings, initialSettingsJson: string, settingsJsonChanged: (json: string) => void): MutableBlockSettingsManager<TSettings>;
    getOrCreate<TSettings>(id: string, defaultSettings: TSettings, initialSettingsJson: string, settingsJsonChanged: (json: string) => void): any;
}
export declare const mutableBlockSettingsManagerStore: MutableBlockSettingsManagerStore;
export {};
