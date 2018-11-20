import HyperHTMLElement from "hyperhtml-element/esm";
import { TrackedSubject } from "dependency-tracked-subject";

declare var wpApiSettings: {
    restUrl: string,
    nonce: string
}

interface BaseThemeSettings {
    footerPageId: number;
}

export class ThemeSettingsElement extends HyperHTMLElement {
    private settings: TrackedSubject<BaseThemeSettings | null> = new TrackedSubject(null);

    private saveInProgress = new TrackedSubject(false);

    created() {
        //this.settings.subscribe((value) => console.log("settings changed", value));
        this.settings.subscribe(() => this.render());
        this.saveInProgress.subscribe(() => this.render());
        

        (() => {
            fetch(wpApiSettings.restUrl + "bt-api/v1/public-settings", {
                // credentials: 'include',
                // headers: new Headers({
                //     'X-WP-Nonce': wpApiSettings.nonce
                // })
            })
                .then(r => r.json())
                .then(s => this.settings.value = s);
        })()

        this.render();
    }

    inputChanged = (event: Event) => {
        this.settings.value = Object.assign(Object.assign({}, this.settings.value), {
            footerPageId: event.target["value"]
        });
    }

    saveClicked = (event: MouseEvent) => {
        this.saveInProgress.value = true;

        
        
        fetch(wpApiSettings.restUrl + "bt-api/v1/public-settings", {
            method: "POST",
            body: JSON.stringify(this.settings.value),
            credentials: 'include',
            headers: new Headers({
                "Content-Type": "application/json",
                'X-WP-Nonce': wpApiSettings.nonce
            })
        })
            .then(r => {
                this.saveInProgress.value = false;
            })


        
    }

    render() {
        console.log("rerender");

        return this.html`
            <h1>Base Theme Settings</h1>

            <hr/>

            ${this.settings.value === null ?
                "Loading..." : 
                ThemeSettingsElement.wire(this)`
                    <label>Footer Page ID</label><br/>
                    <input value=${ this.settings.value.footerPageId || "" } oninput=${ this.inputChanged }/>
                `
            }

            <hr/>

            <button onclick=${ this.saveClicked }>Save</button>

            ${ this.saveInProgress.value ? "Saving..." : null}
        `;
    }
}

ThemeSettingsElement.define("bt-theme-settings");