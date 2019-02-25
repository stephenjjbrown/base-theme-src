export interface BlockSettingsChangedHandler<TSettings> {
    id: number;
    callback: () => void;
}
export declare class MutableBlockSettingsManager<TSettings> {
    private settingsJsonChanged;
    private _settings;
    readonly settings: TSettings;
    private settingsChangedHandlers;
    constructor(defaultSettings: TSettings, initialSettingsJson: string, settingsJsonChanged: (json: string) => void);
    onSettingsChange(callback: () => void): number;
    removeSettingsChangeHandler(id: number): void;
    updateSettings(obj: Partial<TSettings>): void;
}
