import { LitElement } from 'lit-element';
export declare class MonacoEditorElement extends LitElement {
    createRenderRoot(): this;
    private uniqueId;
    value: string;
    private editor;
    private model;
    firstUpdated(): void;
}
