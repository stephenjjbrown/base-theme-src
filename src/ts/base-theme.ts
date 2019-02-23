import HyperHTMLElementImport from "hyperhtml-element/esm";
import * as TrackablesImport from "dependency-tracked-subject";
import * as WindowStateImport from "./models/window-state";
import * as PageImport from "./models/page";
import { offsetTopRecursive } from "./utilities/offset-top-recursive";

export namespace BaseTheme {
    export const HyperHTMLElement = HyperHTMLElementImport;
    export const Trackables = TrackablesImport;
    export const page = PageImport.page;
    export const windowState = WindowStateImport.windowState;

    export const utilities = {
        offsetTopRecursive
    }
}

// Make namespace global under baseTheme
window.baseTheme = BaseTheme;
declare global {
    interface Window {
        baseTheme: typeof BaseTheme;
    }
    //const baseTheme: typeof BaseTheme;
}