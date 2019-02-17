import { TrackedSubject, TrackedComputedSubject } from "dependency-tracked-subject";

export class Page {
    revealNavigation = new TrackedSubject(false);
    disableScroll = new TrackedComputedSubject(() => this.revealNavigation.value); // Maybe move to a page wrapper model? 

    topNavigationRendered = false;
    onTopNavigationRendered: (() => void)[] = [];
}

export const page = new Page();