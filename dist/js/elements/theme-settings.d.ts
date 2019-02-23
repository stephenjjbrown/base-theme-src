import HyperHTMLElement from "hyperhtml-element/esm";
export declare class ThemeSettingsElement extends HyperHTMLElement {
    private settings;
    private saveInProgress;
    created(): void;
    inputChanged: (event: Event) => void;
    saveClicked: (event: MouseEvent) => void;
    render(): any;
}
