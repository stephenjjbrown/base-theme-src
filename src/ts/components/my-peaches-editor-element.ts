// import HyperHTMLElement from "hyperhtml-element/esm";
// import {MutableBlockSettingsManager} from "../blocks/common/block-settings/mutable-block-settings-manager";
// import {MyPeachesBlockSettings} from "../blocks/my-peaches/my-peaches-block-settings";


// export class MyPeachesEditorElement extends HyperHTMLElement {
//     initialized = false;

//     manager: MutableBlockSettingsManager<MyPeachesBlockSettings>;
//     settingsChangeHandler: number;


//     initialize(manager: MutableBlockSettingsManager<MyPeachesBlockSettings>) {
//         if (this.initialized) {
//             console.error("Element already initialized");
//         }

//         this.manager = manager;
//         this.settingsChangeHandler = this.manager.onSettingsChange(() => {
//             this.render();
//         });

//         this.initialized = true;
//         console.log("initialized");

//         this.render();
//     }

//     disconnectedCallback() {
//         this.manager.removeSettingsChangeHandler(this.settingsChangeHandler);
//         console.log('disconnected')
//     }

//     inputValue: number;
//     oninput = (e: Event) => {
//         const el = e.target as HTMLInputElement;

//         const newInputValue = el.valueAsNumber;
//         if (this.inputValue !== newInputValue) {
//             this.inputValue = newInputValue;

//             this.manager.updateSettings({
//                 peaches: el.valueAsNumber
//             });
//         }
//     }

//     render() {
//         if (!this.initialized) {
//             return "Error: Uninitialized"
//         }

//         return this.html`
//             <input type="number" oninput=${this} value=${ this.manager.settings.peaches }/>
//         `
//     }
// }

// MyPeachesEditorElement.define("my-peaches-editor");