import HyperHTMLElement from "hyperhtml-element/esm";
import { MenuItem, MenuItemClient } from "../api/menu-item-client";
import { page } from "../models/page";
import { TrackedArray } from "dependency-tracked-subject";
import { TrackedComputedSubject } from "dependency-tracked-subject";

export class PageWrapperElement extends HyperHTMLElement {


    created() {
        // const updateDisableScrollCss = value => {
        //     value ? this.classList.add("base-page-wrapper-disable-scroll") : this.classList.remove("base-page-wrapper-disable-scroll");
        // }

        // page.disableScroll.subscribe(updateDisableScrollCss)
        // updateDisableScrollCss(page.disableScroll.value);
        
        // this.renderedHtml.subscribe(() => this.render());
        // this.render();
    }

    // renderedHtml = new TrackableComputedSubject(() => {
    //     console.log("renderhtmlcalled")
    //     return this.html`
    //         <a class="base-top-navigation-logo" href="${_wpSiteInfo.homeUrl}">
    //             ${ _wpSiteInfo.customLogo ? {html: _wpSiteInfo.customLogo.imageHtml} : _wpSiteInfo.siteDisplayName }
    //         </a>

    //         <div class="base-top-navigation-toggle">
    //             ${ this.items.value
    //                 .map(item => `<a class="base-top-navigation-item" href="${ item.url }">${ item.title }</a>`)
    //             }
    //         </div>

    //         <button class="base-top-navigation-toggle" onclick=${ this.toggleButtonClicked }>Toggle</button>
    //     `;
    // });

    render() {
        return this.childNodes;
    }
}

PageWrapperElement.define("base-page-wrapper");