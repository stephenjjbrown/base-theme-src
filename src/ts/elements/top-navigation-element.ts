import HyperHTMLElement from "hyperhtml-element/esm";
import { MenuItem, MenuItemClient } from "../api/menu-item-client";
import { page } from "../models/page";
import { TrackedArray } from "dependency-tracked-subject";
import { TrackedComputedSubject } from "dependency-tracked-subject";
 
function filterImageHtml(html: string) {

    return `
        <img width="963" height="207" src="https://wvalleyfiber.stagingsite.design/wp-content/uploads/2018/10/logo@2x.png"
        class="attachment-full size-full" alt=""
        
        >`

    // Remove sizes attr which appears to be incompatible with Safari
    //return html
        //.replace(/ sizes="[^"]*?"/i, "")
}

export class TopNavigationElement extends HyperHTMLElement {

    items: TrackedArray<MenuItem> = new TrackedArray([]);

    created() {
        const client = new MenuItemClient();

        client.getAll()
            .then(items => this.items.value = items)
            .catch(e => {
                console.error(e);
                throw e;
            })

        this.renderedHtml.subscribe(() => this.render());
        this.render();
    }

    toggleButtonClicked =() => {
        page.revealNavigation.value = !page.revealNavigation.value;
    }

    renderedHtml = new TrackedComputedSubject(() => {
        console.log("renderhtmlcalled")
        return this.html`
            <a class="bt-top-navigation-logo" href="${_wpSiteInfo.homeUrl}">
                ${ _wpSiteInfo.customLogo ? {html: filterImageHtml(_wpSiteInfo.customLogo.imageHtml)} : _wpSiteInfo.siteDisplayName }
            </a>

        

            ${ this.items.value.length > 0 ?
                TopNavigationElement.wire()`<nav class="bt-top-navigation-links">
                    ${ this.items.value
                        .map(item => `<a class="bt-top-navigation-link" href="${ item.url }">${ item.title }</a>`)
                    }
                </nav>` :
                null
            }
            

            <button class="bt-top-navigation-toggle" onclick=${ this.toggleButtonClicked }><span class="bt-top-navigation-toggle-text">Toggle</span></button>
        `;
    });

    render() {
        return this.renderedHtml.value;
    }
}

TopNavigationElement.define("bt-top-navigation");