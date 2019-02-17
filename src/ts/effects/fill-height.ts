import { offsetTopRecursive } from "../utilities/offset-top-recursive";
import { TrackedSubject, TrackedComputedSubject } from "dependency-tracked-subject";
import { animationLoop } from "dom-loop";
import { windowState } from "../models/window-state";



export function initializeFillHeight(element: HTMLElement) {
    const top = new TrackedSubject(offsetTopRecursive(element));

    const handlerId = animationLoop.read(() => {
        top.value = offsetTopRecursive(element);
    }, false, 30);

    const computed = new TrackedComputedSubject(() => {
        return windowState.innerHeight.value - top.value;
    });

    const updateElementHeight = (value) => {
        element.style.height = value + "px";
    }

    const subscription = computed.subscribe(updateElementHeight);
    updateElementHeight(computed.value);
}