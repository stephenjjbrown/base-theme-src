import "@babel/polyfill";
import "./polyfills";
import "./components/components";
import "./elements/elements";
import "./base-theme";

import { initializeRevealEffect } from "./effects/reveal";
import { initializeFillHeight } from "./effects/fill-height";
import { initializeBackgroundCover } from "./effects/background-cover";
import { initializeParallax } from "./effects/parallax";
import { page } from "./models/page";

document.addEventListener("DOMContentLoaded", () => {
    // Initialize reveal elements
    const revealElements = document.querySelectorAll('.bt-reveal');

    for (let i = 0; i < revealElements.length; i++) {
        const el = revealElements[i];
        initializeRevealEffect(el as HTMLElement);
    }



    const fillHeightElements = document.querySelectorAll('.bt-fill-remaining-height');

    for (let i = 0; i < fillHeightElements.length; i++) {
        const el = fillHeightElements[i];
        initializeFillHeight(el as HTMLElement);
    }




    const backgroundCoverElements = document.querySelectorAll('.bt-background-cover');

    for (let i = 0; i < backgroundCoverElements.length; i++) {
        const el = backgroundCoverElements[i];
        initializeBackgroundCover(el as HTMLElement);
    }







        // Initialize reveal elements
        const parallaxElements = document.querySelectorAll('.bt-parallax');

        for (let i = 0; i < parallaxElements.length; i++) {
            const el = parallaxElements[i];

            const classArray = (el.className || "").split(" ");
            classArray.forEach(cssClass => {
                if (cssClass.match(/bt-parallax-/)) {
                    const matches = /bt-parallax-([^-]*?)-([-0-9]*)/.exec(cssClass);

                    const origin = matches[1] as "top" | "center" | "bottom";
                    const value = parseInt(matches[2]) / 100;

                    initializeParallax(el as HTMLElement, origin, value);
                }
            });

            
        }









    const updateDisableScrollCss = value => {
        value ? document.body.classList.add("bt-disable-scroll") : document.body.classList.remove("bt-disable-scroll");
    }

    page.disableScroll.subscribe(updateDisableScrollCss)
    updateDisableScrollCss(page.disableScroll.value);
})





