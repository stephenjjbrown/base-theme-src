import { TrackedSubject, TrackedComputedSubject } from "dependency-tracked-subject";
import { offsetTopRecursive } from "../utilities/offset-top-recursive";
import { windowState } from "../models/window-state";
import { animationLoop } from "dom-loop";

export function initializeParallax(element: HTMLElement, origin: 'top' | 'center' | 'bottom' | number, multiplier: number) {

    element.style["willChange"] = "transform";

    const originMultiplier = origin === "top" ? 0 : origin === "bottom" ? 1 : origin === "center" ? 0.5 : origin;

    const elementTop = new TrackedSubject(offsetTopRecursive(element));
    const elementHeight = new TrackedSubject(element.offsetHeight);
    animationLoop.read(() => {
        elementTop.value = offsetTopRecursive(element);
        elementHeight.value = element.offsetHeight;
    }, false, 2);

    const elementOrigin = new TrackedComputedSubject(() => elementHeight.value * originMultiplier)
    const windowOrigin = new TrackedComputedSubject(() => windowState.clientHeight.value * originMultiplier);

    const withinWindow = new TrackedComputedSubject(() => {
        const margin = 100;
        const x1 = windowState.scrollY.value - margin;
        const x2 = windowState.scrollY.value + windowState.clientHeight.value + margin;
        const y1 = elementTop.value;
        const y2 = elementTop.value + elementHeight.value;

        if (x1 <= y2 && y1 <= x2) // If element within window bounds +/- margin
            return true;
        return false;

//        const margin = 100;
// 			const x1 = scrollTop - margin;
// 			const x2 = scrollTop + windowHeight + margin;
// 			const y1 = elementTop;
// 			const y2 = elementTop + elementHeight;

// 			if (!(x1 <= y2 && y1 <= x2)) // If element within window bounds +/- margin
// 				return;
    })

    const offset = new TrackedComputedSubject(() => {
        return Math.round(((elementTop.value + elementOrigin.value) - (windowState.scrollY.value + windowOrigin.value)) * multiplier)
    });

    offset.subscribe(value => {
        if (!withinWindow.value)
            return;

        animationLoop.write(() => {
            const transform = "translate3d(0, " + value + "px, 0)";
            element.style.transform = transform;
        }, true);
    })

    animationLoop.write(() => {
        const transform = "translate3d(0, " + offset.value + "px, 0)";
        element.style.transform = transform;
    }, true);
}
