import HyperHTMLElementImport from "hyperhtml-element/esm"

export namespace BaseTheme {
    export const HyperHTMLElement = HyperHTMLElementImport;
}

// Make namespace global under baseTheme
window.baseTheme = BaseTheme;
declare global {
    interface Window {
        baseTheme: typeof BaseTheme;
    }
    const baseTheme: typeof BaseTheme;
}