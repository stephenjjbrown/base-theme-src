import { times, memoize } from "lodash";
import { MyPeachesEditorElement } from "../../components/my-peaches-editor-element";
import { DidMount } from "../../components/react/did-mount";
import {MyPeachesElement} from "../../components/my-peaches-element";
import {mutableBlockSettingsManagerStore} from "../common/block-settings/mutable-block-settings-manager-store";
import {defaultMyPeachesBlockSettings} from "./my-peaches-block-settings";

const { InspectorControls, InnerBlocks } = wp.editor;
const { createRef, Fragment } = wp.element;



const columnsTemplate = (columns) => times( columns, () => [ 'core/column' ] );



const getManager = (props) => {
    return mutableBlockSettingsManagerStore.getOrCreate(
        props.clientId,
        defaultMyPeachesBlockSettings,
        props.attributes.blockSettingsJson,
        json => props.setAttributes({
            blockSettingsJson: json
        })
    )
};

wp.blocks.registerBlockType( 'base-theme/my-peaches', {
    title: 'My Peaches',

    icon: 'palmtree',

    category: 'layout',

    attributes: {
        blockSettingsJson: {
            type: 'string'
        }
    },

    edit: function(props) {
        const manager = getManager(props);

        const mainRef = createRef<MyPeachesElement>();
        const mainDidMount = () => {
            const main = mainRef.current;
            main.initialize(manager);
        };

        const editorRef = createRef<MyPeachesEditorElement>();
        const editorDidMount = () => {
            const editor = editorRef.current;
            editor.initialize(manager);
        };

        const joobValue = "gorbo";
        console.log("new code");

        return [
            <my-peaches ref={ mainRef } joob={ joobValue }/>,
            <DidMount callback={ mainDidMount }/>,
            <InnerBlocks
                template={columnsTemplate(3)}
                templateLock="all"
                allowedBlocks={[ 'core/column' ]}/>,
            <InspectorControls>
                <my-peaches-editor ref={ editorRef }/>
                <DidMount callback={ editorDidMount }/>
            </InspectorControls>
        ]
    },

    save: function(props) {
        return <Fragment>
            <my-peaches data-block-settings={ props.attributes.blockSettingsJson }/>,
            <InnerBlocks.Content />
        </Fragment>
    },
} );