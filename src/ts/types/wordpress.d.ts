// import * as React from "react";
// import {ReactNode} from "react";

export type WordPressElement = any;//ReactNode; // TODO: WPElement Types
export type WordPressComponent = any;//typeof React.Component;
export type WordPressRef<T> = any;//React.RefObject<T>;

export declare interface WordPressApi {
    components: {
        Panel: any,
        PanelBody: any,
        PanelRow: any,
        Button: any,
        TextControl: any,
        CheckboxControl: any,
        ToggleControl: any
    }
    editor: {
        InspectorControls: any,//TODO
        InnerBlocks: any,//TODO
        MediaPlaceholder: any//TODO
    },
    element: {
        Fragment: any; //TODO
        Component: WordPressComponent, // TODO: Component types
        createElement: any;// typeof React.createElement;
        createRef: <T>() => WordPressRef<T>;
        render: any;//TODO
    },
    blocks: {
        registerBlockType: (handle: string, options: {
            title: string,
            icon: string,
            category: string,
            keywords?: string[],
            supports?: any,
            attributes: any,//TODO
            getEditWrapperProps?: any,//TODO
            edit: (...args: any[]) => WordPressElement,//TODO
            save: (...args: any[]) => WordPressElement,//TODO
            deprecated?: any//TODO
        }) => void
    }
}

declare global {
    var wp: WordPressApi;
}