/// <reference path="../../../../node_modules/monaco-editor/monaco.d.ts"/>
import {LitElement, html, css, customElement, property} from 'lit-element';

declare const require: any;


@customElement("monaco-editor")
export class MonacoEditorElement extends LitElement {
    // Disable shadow DOM for Monaco to work
    createRenderRoot() { return this; }

    private uniqueId = "id-" + Math.floor(Math.random() * 1000000);

    @property({type: String, reflect: true})
    value: string;

    private editor: monaco.editor.IStandaloneCodeEditor;
    private model: monaco.editor.ITextModel;

    firstUpdated() {
        //const element = this; //this.shadowRoot.querySelector("#" + this.uniqueId) as HTMLElement;
        Object.assign(this.style, {
            display: "block",
            height: "280px",
            width: "100%",
            background: "#333"
        });

        require.config({ paths: { 'vs': _wpSiteInfo.themeUrl + '/base-theme/js/monaco-editor/vs' }});
        // Final folder has to actually be named /vs to work because of hard-coded paths in Monaco library

        require(['vs/editor/editor.main'], () => {
            this.editor = monaco.editor.create(this, {
                value: this.value,
                language: 'html',
                theme: "vs-dark",
                minimap: {
                    enabled: false
                },
                fontSize: 15,
                automaticLayout: true
            });

            this.model = this.editor.getModel() as monaco.editor.ITextModel;

            this.model.onDidChangeContent((e) => {
                console.log('changed')
                this.value = this.model.getValue();

                this.dispatchEvent(new Event("change"));
            });
        });
    }

    // updated(changedProperties) {
    //     // console.log('updated')
    //     // this.model && this.model.setValue(changedProperties.value);
    // }
}