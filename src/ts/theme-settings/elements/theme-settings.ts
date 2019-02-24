import {LitElement, html, css, customElement, property} from 'lit-element';
import { PublicSettingsClient } from '../clients/public-settings-client';
import { PublicSettings, showPageHeadingsMap } from '../models/public-settings';


@customElement('base-theme-settings')
export class ThemeSettingsElement extends LitElement {
    private publicSettingsClient;

    @property()
    loading = true;

    @property()
    saving = false;

    @property({type: Object, reflect: true})
    private publicSettings: PublicSettings;

    constructor() {
        super();
        this.publicSettingsClient = new PublicSettingsClient();
        this.getSettings();
    }

    setPublicSetting(data: Partial<PublicSettings>) {
        this.publicSettings = Object.assign(Object.assign({}, this.publicSettings), data);
    }

    private async getSettings() {
        this.loading = true;
        this.publicSettings = await this.publicSettingsClient.get();
        this.loading = false;
    }

    private async saveSettings() {
        this.saving = true;
        await this.publicSettingsClient.update(this.publicSettings);
        this.publicSettings = await this.publicSettingsClient.get();
        this.saving = false;
    }

    render() {
        return html`
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

            <div class="container">
                <br><br>
                <h1>Base Theme Settings <span class="badge badge-info">Beta</span></h1>
                <hr>
                ${ this.loading ?
                    html`
                        <div class="d-flex align-items-center" role="status">
                            <strong>Loading...</strong>
                            <div class="spinner-border ml-auto"></div>
                        </div>
                    ` :
                    html`
                        <h2>Page Headers</h2>

                        <div class="form-group">
                            <label>Show Page Headers</label>
                            <select
                                class="form-control ts-input-small"
                                .value=${ this.publicSettings.showPageHeadings }
                                @change=${ e => this.setPublicSetting({showPageHeadings: e.target.value}) }>
                                ${ Object.keys(showPageHeadingsMap).map(key => html`
                                    <option
                                        value=${ key }
                                        ?selected=${ this.publicSettings.showPageHeadings == key }>
                                        ${ showPageHeadingsMap[key] }
                                    </option>
                                `) }
                            </select>
                            <p class="form-text text-muted ts-input-small">When and where to add H1 headings to pages and posts</p>
                        </div>
                        
                        <hr>

                        <h2>Footer</h2>

                        <div class="form-group">
                            <label>Footer Page ID</label>
                            <input
                                class="form-control ts-input-small"
                                .value=${ this.publicSettings.footerPageId || "" }
                                @input=${ e => this.setPublicSetting({footerPageId: e.target.value}) }>
                            <p class="form-text text-muted ts-input-small">Set this to the ID of a (private) post or page to be included as footer. This enables you to use the entire page builder (Gutenberg or otherwise) to compose site footer, rather than being confined to only classic-style widgets.</p>
                        </div>
                        
                        <hr>

                        <button
                            class="btn btn-success"
                            ?disabled=${ this.saving }
                            @click=${ () => this.saveSettings() }>
                            ${ this.saving ?
                                html`<span class="spinner-border spinner-border-sm"></span> Saving...` :
                                "Save"
                            }
                        </button>
                    `
                }
            </div>
            <style>
                .ts-input-small {
                    max-width: 400px;
                }
            </style>
        `;
    }

    //                     <label>Footer Page ID</label><br/>
//                     <input value=${ this.settings.value.footerPageId || "" } oninput=${ this.footerPageIdInputChanged }/>
//                     <hr>
//                     <label>Show Page Headers</label><br>
//                     <select onchange=${ this.pageHeadersSelectChanged }>
//                         ${ Object.keys(showPageHeadingsMap).map(item => wire({item})`
//                             <option
//                                 value=${ item }>
//                                 ${ showPageHeadingsMap[item] }
//                             </option>`)}
//                     </select>
}



//import HyperHTMLElement from "hyperhtml-element/esm";
//import { TrackedSubject } from "dependency-tracked-subject";

// declare var wpApiSettings: {
//     restUrl: string,
//     nonce: string
// }

// const showPageHeadingsMap = <const> {
//     always: "Always",
//     excludeGutenbergPages: "All except Gutenberg pages"
// };
// type ShowPageHeadingsMode = keyof typeof showPageHeadingsMap;

// interface BaseThemeSettings {
//     footerPageId: number;
//     showPageHeadings?: ShowPageHeadingsMode;
// }

// export class ThemeSettingsElement extends HyperHTMLElement {
//     private settings: TrackedSubject<BaseThemeSettings | null> = new TrackedSubject(null);

//     private saveInProgress = new TrackedSubject(false);

//     created() {
//         //this.settings.subscribe((value) => console.log("settings changed", value));
//         this.settings.subscribe(() => this.render());
//         this.saveInProgress.subscribe(() => this.render());
        

//         (() => {
//             fetch(wpApiSettings.restUrl + "base-api/v1/public-settings", {
//                 // credentials: 'include',
//                 // headers: new Headers({
//                 //     'X-WP-Nonce': wpApiSettings.nonce
//                 // })
//             })
//                 .then(r => r.json())
//                 .then(s => this.settings.value = s);
//         })()

//         this.render();
//     }

//     footerPageIdInputChanged = (event: Event) => {
//         this.settings.value = Object.assign(Object.assign({}, this.settings.value), {
//             footerPageId: event.target["value"]
//         });
//     }

//     pageHeadersSelectChanged = (event: Event) => {
//         console.log(event);
//         console.log(this.settings.value);
//         this.settings.value = Object.assign(Object.assign({}, this.settings.value), {
//             showPageHeadings: event.target["value"]
//         })
//         console.log(this.settings.value);
//     }

//     saveClicked = (event: MouseEvent) => {
//         this.saveInProgress.value = true;

//         fetch(wpApiSettings.restUrl + "base-api/v1/public-settings", {
//                 method: "POST",
//                 body: JSON.stringify(this.settings.value),
//                 credentials: 'include',
//                 headers: new Headers({
//                     "Content-Type": "application/json",
//                     'X-WP-Nonce': wpApiSettings.nonce
//                 })
//             }).then(r => {
//                 this.saveInProgress.value = false;
//             });
        
//     }

//     render() {
//         console.log("rerender");

//         const {wire} = ThemeSettingsElement;

//         return this.html`
//             <h1>Base Theme Settings</h1>

//             <hr/>

//             ${this.settings.value === null ?
//                 "Loading..." : 
//                 wire(this.settings.value)`
//                     <label>Footer Page ID</label><br/>
//                     <input value=${ this.settings.value.footerPageId || "" } oninput=${ this.footerPageIdInputChanged }/>
//                     <hr>
//                     <label>Show Page Headers</label><br>
//                     <select onchange=${ this.pageHeadersSelectChanged }>
//                         ${ Object.keys(showPageHeadingsMap).map(item => wire({item})`
//                             <option
//                                 value=${ item }>
//                                 ${ showPageHeadingsMap[item] }
//                             </option>`)}
//                     </select>
//                 `
//             }

//             <hr/>

//             <button onclick=${ this.saveClicked }>Save</button>

//             ${ this.saveInProgress.value ? "Saving..." : null}
//         `;
//     }
// }

// ThemeSettingsElement.define("base-theme-settings");