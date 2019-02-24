import { LitElement } from 'lit-element';
import { PublicSettings } from '../models/public-settings';
export declare class ThemeSettingsElement extends LitElement {
    private publicSettingsClient;
    loading: boolean;
    saving: boolean;
    private publicSettings;
    constructor();
    setPublicSetting(data: Partial<PublicSettings>): void;
    private getSettings;
    private saveSettings;
    render(): import("lit-element").TemplateResult;
}
