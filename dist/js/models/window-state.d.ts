import { TrackedSubject } from "dependency-tracked-subject";
export declare class WindowState {
    scrollY: TrackedSubject<number>;
    innerHeight: TrackedSubject<number>;
    clientHeight: TrackedSubject<number>;
    constructor();
}
export declare const windowState: WindowState;
