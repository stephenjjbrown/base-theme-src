import HyperHTMLElement from "hyperhtml-element/esm";
import { MenuItem, MenuItemClient } from "../api/menu-item-client";
import { page } from "../models/page";
import { TrackedArray } from "dependency-tracked-subject";
import { TrackedComputedSubject } from "dependency-tracked-subject";
import { WiredTemplateFunction } from "hyperhtml";


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

    items: TrackedArray<MenuItem>;

    renderedHtml: TrackedComputedSubject<WiredTemplateFunction>;

    created() {
        this.items = new TrackedArray([]);

        this.renderedHtml = new TrackedComputedSubject(() => {
            //console.log(this, this.items, this.items.value, "renderhtmlcalled")
            const result = this.html`
                <a class="base-top-navigation-logo" href="${_wpSiteInfo.homeUrl}">
                    ${ _wpSiteInfo.customLogo ? {html: filterImageHtml(_wpSiteInfo.customLogo.imageHtml)} : _wpSiteInfo.siteDisplayName }
                </a>
    
            
    
                ${ this.items.value.length > 0 ?
                    TopNavigationElement.wire()`<nav class="base-top-navigation-links">
                        ${ this.items.value
                            .map(item => `<a class="base-top-navigation-link" href="${ item.url }">${ item.title }</a>`)
                        }
                    </nav>` :
                    null
                }
                
    
                <button class="base-top-navigation-toggle" onclick=${ this.toggleButtonClicked }><span class="base-top-navigation-toggle-text">Toggle</span></button>
            `;

            if (!page.topNavigationRendered && this.items.value.length > 0) {
                page.onTopNavigationRendered.forEach(cb => cb());
                page.topNavigationRendered = true;
            }

            return result;
        });

        const client = new MenuItemClient();

        client.getAll()
            .then(items => this.items.value = items)
            .catch(e => {
                console.error(e);
                throw e;
            })

        this.renderedHtml.subscribe(() => this.render());
        this.render();

        const documentClickHandler = (e) => {
            let node = e.target as Node;

            while(node) {
                console.log(node);
                if (node["className"] &&
                    (node["className"].match(/base-top-navigation-link([^s]|$)/) != null ||
                    node["className"].indexOf("base-top-navigation-toggle") != -1)) {                    
                    return;
                }
                node = node.parentNode;
            }
            page.revealNavigation.value = false;
        }

        document.addEventListener("click", documentClickHandler);
        document.addEventListener("touchend", documentClickHandler);

    }

    toggleButtonClicked =() => {
        page.revealNavigation.value = !page.revealNavigation.value;
    }

    render() {
        return this.renderedHtml.value;
    }
}

TopNavigationElement.define("base-top-navigation");