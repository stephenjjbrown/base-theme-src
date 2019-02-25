import HyperHTMLElement from "hyperhtml-element/esm";
import { MenuItem } from "../api/menu-item-client";
import { TrackedArray } from "dependency-tracked-subject";
import { TrackedComputedSubject } from "dependency-tracked-subject";
import { WiredTemplateFunction } from "hyperhtml";
export declare class TopNavigationElement extends HyperHTMLElement {
    items: TrackedArray<MenuItem>;
    renderedHtml: TrackedComputedSubject<WiredTemplateFunction>;
    created(): void;
    toggleButtonClicked: () => void;
    render(): (template: TemplateStringsArray, ...values: any[]) => any;
}
