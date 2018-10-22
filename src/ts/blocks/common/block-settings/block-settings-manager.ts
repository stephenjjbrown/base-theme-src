import {MutableBlockSettingsManager} from "./mutable-block-settings-manager";
import {ImmutableBlockSettingsManager} from "./immutable-block-settings-manager";

export type BlockSettingsManager<TSettings> = MutableBlockSettingsManager<TSettings> | ImmutableBlockSettingsManager<TSettings>;
