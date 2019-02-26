import { LitElement, property, html, customElement } from "lit-element";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
//import HyperHTMLElement from "hyperhtml-element/esm";
import { MenuItem, MenuItemClient } from "../api/menu-item-client";
import { page } from "../models/page";
import { TrackedArray } from "dependency-tracked-subject";
import { TrackedComputedSubject } from "dependency-tracked-subject";
//import { WiredTemplateFunction } from "hyperhtml";


function filterImageHtml(html: string) {
    return html
        .replace(/srcset="[^"]*"/gi, "")
        .replace(/sizes="[^"]*"/gi, "")
        .replace(/ +/gi, " ") // Strip doubled-up (or tripled-up) spaces
}

@customElement("base-top-navigation")
export class TopNavigationElement extends LitElement {

    // Disable Shadow DOM
    createRenderRoot() {
        return this;
    }

    @property({type: Array})
    items?: MenuItem[];


    firstUpdated() {
        const client = new MenuItemClient();

        client.getAll()
            .then(items => this.items = items)
            .catch(e => {
                console.error(e);
                throw e;
            })
    }

    updated() {
        // This was only added to hack things into the navigation after render.
        // Needs to be replaced with a better model
        if (!page.topNavigationRendered && this.items && this.items.length > 0) {
            page.onTopNavigationRendered.forEach(cb => cb());
            page.topNavigationRendered = true;
        }
    }

    render() {
        return html`
            <a class="base-top-navigation-logo" href="${_wpSiteInfo.homeUrl}">
                ${ _wpSiteInfo.customLogo ? unsafeHTML([filterImageHtml(_wpSiteInfo.customLogo.imageHtml)]) : _wpSiteInfo.siteDisplayName }
            </a>

            ${ this.items && this.items.length > 0 ?
                html`<nav class="base-top-navigation-links">
                    ${ this.items.map(item => html`
                        <a class="base-top-navigation-link base-menu-item-${ item.id }" href=${ item.url }>
                            ${ item.title }
                        </a>
                    `)}
                </nav>` :
                null
            }

            <button
                class="base-top-navigation-toggle"
                @click=${ this.toggleButtonClicked }>
                <span class="fas fa-bars"></span>
                <span class="base-top-navigation-toggle-text">Toggle</span>
            </button>
        `
    }

    // created() {
    //     this.items = new TrackedArray([]);

    //     this.renderedHtml = new TrackedComputedSubject(() => {
    //         //console.log(this, this.items, this.items.value, "renderhtmlcalled")
    //         const result = this.html`
    //             <a class="base-top-navigation-logo" href="${_wpSiteInfo.homeUrl}">
    //                 ${ _wpSiteInfo.customLogo ? {html: filterImageHtml(_wpSiteInfo.customLogo.imageHtml)} : _wpSiteInfo.siteDisplayName }
    //             </a>
    
            
    
    //             ${ this.items.value.length > 0 ?
    //                 TopNavigationElement.wire()`<nav class="base-top-navigation-links">
    //                     ${ this.items.value
    //                         .map(item => `<a class="base-top-navigation-link" href="${ item.url }">${ item.title }</a>`)
    //                     }
    //                 </nav>` :
    //                 null
    //             }
                
    
    //             <button class="base-top-navigation-toggle" onclick=${ this.toggleButtonClicked }><span class="base-top-navigation-toggle-text">Toggle</span></button>
    //         `;

    //         if (!page.topNavigationRendered && this.items.value.length > 0) {
    //             page.onTopNavigationRendered.forEach(cb => cb());
    //             page.topNavigationRendered = true;
    //         }

    //         return result;
    //     });

    //     const client = new MenuItemClient();

    //     client.getAll()
    //         .then(items => this.items.value = items)
    //         .catch(e => {
    //             console.error(e);
    //             throw e;
    //         })

    //     this.renderedHtml.subscribe(() => this.render());
    //     this.render();

    //     const documentClickHandler = (e) => {
    //         let node = e.target as Node;

    //         while(node) {
    //             if (node["className"] &&
    //                 (node["className"].match(/base-top-navigation-link([^s]|$)/) != null ||
    //                 node["className"].indexOf("base-top-navigation-toggle") != -1)) {                    
    //                 return;
    //             }
    //             node = node.parentNode;
    //         }
    //         page.revealNavigation.value = false;
    //     }

    //     document.addEventListener("click", documentClickHandler);
    //     document.addEventListener("touchend", documentClickHandler);

    // }

    toggleButtonClicked =() => {
        page.revealNavigation.value = !page.revealNavigation.value;
    }

    // render() {
    //     return this.renderedHtml.value;
    // }
}

// TopNavigationElement.define("base-top-navigation");