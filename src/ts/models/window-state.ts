import { TrackedSubject } from "dependency-tracked-subject";
import { animationLoop } from "dom-loop";

export class WindowState {
    scrollY = new TrackedSubject(window.scrollY || document.documentElement.scrollTop);
    innerHeight = new TrackedSubject(window.innerHeight);
    clientHeight = new TrackedSubject(document.documentElement.clientHeight);

    constructor() {
        console.log('dadsadsa')
        animationLoop.read(() => {
            this.scrollY.value = window.scrollY || document.documentElement.scrollTop;
            this.innerHeight.value = window.innerHeight
            this.clientHeight.value = document.documentElement.clientHeight;
        }, false); 
    }
}

export const windowState = new WindowState();