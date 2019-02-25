import { TrackedSubject, TrackedComputedSubject } from "dependency-tracked-subject";
export declare class Page {
    revealNavigation: TrackedSubject<boolean>;
    disableScroll: TrackedComputedSubject<boolean>;
    topNavigationRendered: boolean;
    onTopNavigationRendered: (() => void)[];
}
export declare const page: Page;
