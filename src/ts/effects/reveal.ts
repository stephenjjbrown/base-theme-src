import { windowState } from "../models/window-state";
import { TrackedSubject } from "dependency-tracked-subject";
import { animationLoop } from "dom-loop";
import { randomInt } from "../utilities/random-int";
import { offsetTopRecursive } from "../utilities/offset-top-recursive";


export function initializeRevealEffect(element: HTMLElement) {
    const elementTop = new TrackedSubject(offsetTopRecursive(element));

    const id = animationLoop.read(() => {
        elementTop.value = offsetTopRecursive(element);
    }, false, 20);

    const evaluateScroll = (scrollY: number) => {
        if ((scrollY + (windowState.innerHeight.value * 0.9)) > elementTop.value) {
            reveal();
        }
    }
    const subscription = windowState.scrollY.subscribe(evaluateScroll);
    evaluateScroll(windowState.scrollY.value);

    function reveal() {
        setTimeout(() => {
            const list = (element.className || "").split(" ");
            list.splice(list.indexOf("bt-reveal"), 1);
            element.className = list.join(" ");
        }, randomInt(0, 150));
        
        animationLoop.removeReadEventHandler(id);
        subscription.unsubscribe();
    }
}