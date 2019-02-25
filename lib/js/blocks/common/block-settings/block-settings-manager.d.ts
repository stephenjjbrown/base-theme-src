import { MutableBlockSettingsManager } from "./mutable-block-settings-manager";
import { ImmutableBlockSettingsManager } from "./immutable-block-settings-manager";
export declare type BlockSettingsManager<TSettings> = MutableBlockSettingsManager<TSettings> | ImmutableBlockSettingsManager<TSettings>;
