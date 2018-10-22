import { isEqual, cloneDeep, merge } from "lodash";

export interface BlockSettingsChangedHandler<TSettings> {
    id: number,
    callback: () => void
}

export class MutableBlockSettingsManager<TSettings> {
    private _settings: TSettings;
    get settings() {
        return this._settings;
    }

    private settingsChangedHandlers: BlockSettingsChangedHandler<TSettings>[] = [];

    constructor(defaultSettings: TSettings, initialSettingsJson: string, private settingsJsonChanged: (json: string) => void) {
        try {
            this._settings = JSON.parse(initialSettingsJson);
        } catch(err) {
            console.error(err);
            console.log(initialSettingsJson);
            this._settings = defaultSettings
        }
    }

    onSettingsChange(callback: () => void) {
        const handler = {
            id: Math.random(),
            callback
        };
        this.settingsChangedHandlers.push(handler);
        return handler.id;
    }

    removeSettingsChangeHandler(id: number) {
        this.settingsChangedHandlers.splice(this.settingsChangedHandlers.findIndex((h) => h.id === id), 1);
    }

    updateSettings(obj: Partial<TSettings>) {
        console.log("Update called", obj);

        // TODO: deep clone and merge, watch out for array merging
        const newSettings = merge(cloneDeep(this._settings), obj);

        if (!isEqual(this._settings, newSettings)) {
            console.log("Settings changed, persisting");
            this._settings = newSettings;

            this.settingsChangedHandlers.forEach(h => h.callback());

            this.settingsJsonChanged(JSON.stringify(this._settings));
        }
    }
}