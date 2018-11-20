import HyperHTMLElement from "hyperhtml-element/esm";
import { MenuItem, MenuItemClient } from "../api/menu-item-client";
import { page } from "../models/page";
import { TrackedArray } from "dependency-tracked-subject";
import { TrackedComputedSubject } from "dependency-tracked-subject";

export class PageElement extends HyperHTMLElement {


    created() {
        const updateRevealNavigationCss = value => {  
            value ? this.classList.add("bt-page-reveal-navigation") : this.classList.remove("bt-page-reveal-navigation");
        }
        page.revealNavigation.subscribe(updateRevealNavigationCss)
        updateRevealNavigationCss(page.revealNavigation.value);
        
        // this.renderedHtml.subscribe(() => this.render());
        // this.render();
    }

    // renderedHtml = new TrackableComputedSubject(() => {
    //     console.log("renderhtmlcalled")
    //     return this.html`
    //         <a class="bt-top-navigation-logo" href="${_wpSiteInfo.homeUrl}">
    //             ${ _wpSiteInfo.customLogo ? {html: _wpSiteInfo.customLogo.imageHtml} : _wpSiteInfo.siteDisplayName }
    //         </a>

    //         <div class="bt-top-navigation-toggle">
    //             ${ this.items.value
    //                 .map(item => `<a class="bt-top-navigation-item" href="${ item.url }">${ item.title }</a>`)
    //             }
    //         </div>

    //         <button class="bt-top-navigation-toggle" onclick=${ this.toggleButtonClicked }>Toggle</button>
    //     `;
    // });

    render() {
        return this.childNodes;
    }
}

PageElement.define("bt-page");