// import HyperHTMLElement from "hyperhtml-element/esm";

// import {BlockSettingsManager} from "../blocks/common/block-settings/block-settings-manager";
// import {ImmutableBlockSettingsManager} from "../blocks/common/block-settings/immutable-block-settings-manager";
// import {MutableBlockSettingsManager} from "../blocks/common/block-settings/mutable-block-settings-manager";
// import {MyPeachesBlockSettings} from "../blocks/my-peaches/my-peaches-block-settings";

// export class MyPeachesElement extends HyperHTMLElement {
//     initialized = false;

//     manager: BlockSettingsManager<MyPeachesBlockSettings>;
//     settingsChangeHandler: number;

//     set joob(value: string) {
//         console.log("joob was set! " + value);
//     }

//     created() {
//         if (this.hasAttribute("data-block-settings")) {
//             let json = this.getAttribute("data-block-settings");

//             try {
//                 var settings = JSON.parse(json);
//             } catch (err) {
//                 console.error(err);
//                 console.log(json);
//             }

//             this.initialize(new ImmutableBlockSettingsManager(settings));
//         }
//     }

//     initialize(blockSettingsManager: BlockSettingsManager<MyPeachesBlockSettings>) {
//         console.log(this.getAttribute("joob"))
//         console.log(this);

//         if (this.initialized) {
//             console.error("Element already initialized");
//         }

//         this.manager = blockSettingsManager;
//         if (this.manager instanceof MutableBlockSettingsManager) {
//             this.settingsChangeHandler = this.manager.onSettingsChange(() => {
//                 this.render();
//             });
//         }

//         this.initialized = true;
//         this.render();
//     }

//     disconnectedCallback() {
//         if (this.manager instanceof MutableBlockSettingsManager) {
//             this.manager.removeSettingsChangeHandler(this.settingsChangeHandler);
//         }
//     }

//     render() {
//         if (!this.initialized)
//             return 'Error: element not initialized';

//         return this.html`<p>My peaches: ${ this.manager.settings.peaches }</p>`;
//     }
// }

// MyPeachesElement.define("my-peaches");