import {LitElement, html, css, customElement, property} from 'lit-element';

declare const require: any;
declare const monaco: any;

@customElement("monaco-editor")
export class MonacoEditorElement extends LitElement {
    uniqueId = "id-" + Math.floor(Math.random() * 1000000);

    createRenderRoot() { return this; }

    firstUpdated() {
        const element = document.querySelector("#" + this.uniqueId);

        console.warn(element);
        require.config({ paths: { 'vs': _wpSiteInfo.themeUrl + '/vs' }});
        require(['vs/editor/editor.main'], function() {
            var editor = monaco.editor.create(element, {
                value: [
                    'function x() {',
                    '\tconsole.log("Hello world!");',
                    '}'
                ].join('\n'),
                language: 'html',
                theme: "vs-dark"
            });
        });
    }

    render() {
        return html`
            <div style="height: 500px;" id=${ this.uniqueId }></div>
        `;
    }
}