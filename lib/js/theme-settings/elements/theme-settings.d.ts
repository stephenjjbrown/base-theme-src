import { LitElement } from 'lit-element';
import { PublicSettings } from '../models/public-settings';
import "./monaco-editor";
export declare class ThemeSettingsElement extends LitElement {
    private publicSettingsClient;
    createRenderRoot(): this;
    loading: boolean;
    saving: boolean;
    private publicSettings;
    constructor();
    setPublicSetting(data: Partial<PublicSettings>): void;
    private getSettings;
    private saveSettings;
    render(): import("lit-element").TemplateResult;
}
