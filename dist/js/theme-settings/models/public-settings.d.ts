export declare const showPageHeadingsMap: {
    readonly always: "Always";
    readonly excludeGutenbergPages: "All except Gutenberg pages";
};
export declare type ShowPageHeadingsMode = keyof typeof showPageHeadingsMap;
export interface PublicSettings {
    footerPageId: number;
    showPageHeadings?: ShowPageHeadingsMode;
}
