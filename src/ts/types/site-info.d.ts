declare interface WpSiteInfo {
    siteUrl: string,
    siteDisplayName: string,
    homeUrl: string,
    customLogo: {
        imageHtml: string,
        imageAlt: string
    } | undefined
}

declare const _wpSiteInfo: WpSiteInfo;