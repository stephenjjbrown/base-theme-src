import HyperHTMLElementImport from "hyperhtml-element/esm";
import * as TrackablesImport from "dependency-tracked-subject";
import * as WindowStateImport from "./models/window-state";
import * as PageImport from "./models/page";
import { offsetTopRecursive } from "./utilities/offset-top-recursive";
export declare namespace BaseTheme {
    const HyperHTMLElement: typeof HyperHTMLElementImport;
    const Trackables: typeof TrackablesImport;
    const page: PageImport.Page;
    const windowState: WindowStateImport.WindowState;
    const utilities: {
        offsetTopRecursive: typeof offsetTopRecursive;
    };
}
declare global {
    interface Window {
        baseTheme: typeof BaseTheme;
    }
}
