import {MutableBlockSettingsManager} from "./mutable-block-settings-manager";

class MutableBlockSettingsManagerStore {
    _managers = {};

    get(id: string) {
        return this._managers[id];
    }

    create<TSettings>(id: string, defaultSettings: TSettings, initialSettingsJson: string, settingsJsonChanged: (json: string) => void) {
        return this._managers[id] = new MutableBlockSettingsManager(defaultSettings, initialSettingsJson, settingsJsonChanged);
    }

    getOrCreate<TSettings>(id: string, defaultSettings: TSettings, initialSettingsJson: string, settingsJsonChanged: (json: string) => void) {
        const existing = this.get(id);
        return existing || this.create(id, defaultSettings, initialSettingsJson, settingsJsonChanged);
    }
}

export const mutableBlockSettingsManagerStore = new MutableBlockSettingsManagerStore();