export const showPageHeadingsMap = <const> {
    always: "Always",
    excludeGutenbergPages: "All except Gutenberg pages"
};
export type ShowPageHeadingsMode = keyof typeof showPageHeadingsMap;

export interface PublicSettings {
    footerPageId: number;
    showPageHeadings?: ShowPageHeadingsMode;
    customHeadHtml?: string;
}