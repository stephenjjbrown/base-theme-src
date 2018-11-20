import { TrackedSubject } from "dependency-tracked-subject";

export class Page {
    revealNavigation = new TrackedSubject(false);
}

export const page = new Page();