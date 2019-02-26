
import { page } from "../models/page";
import { LitElement, customElement } from "lit-element";

@customElement("base-page")
export class PageElement extends LitElement {
    createRenderRoot() {return this;}

    firstUpdated() {
        console.log("Done")
        const updateRevealNavigationCss = value => {  
            value ? this.classList.add("base-page-reveal-navigation") : this.classList.remove("base-page-reveal-navigation");
        }
        page.revealNavigation.subscribe(updateRevealNavigationCss)
        updateRevealNavigationCss(page.revealNavigation.value);
    }
}