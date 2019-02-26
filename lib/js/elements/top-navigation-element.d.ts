import { LitElement } from "lit-element";
import { MenuItem } from "../api/menu-item-client";
export declare class TopNavigationElement extends LitElement {
    createRenderRoot(): this;
    items?: MenuItem[];
    firstUpdated(): void;
    updated(): void;
    render(): import("lit-element").TemplateResult;
    toggleButtonClicked: () => void;
}
