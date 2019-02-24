(function() { 
    const { InspectorControls, InnerBlocks, MediaPlaceholder } = wp.editor;
    const { Fragment } = wp.element;
    const { Panel, PanelBody, PanelRow, Button, TextControl } = wp.components;

    const settings = wp.blocks.registerBlockType( 'base-theme/group', {
        title: 'Group',

        icon: 'id',

        category: 'layout',

        keywords: [],

        attributes: {
            additionalClasses: {
                type: 'string'
            }
        },

        supports: {
            customClassName: false,
            className: false
        },

        getEditWrapperProps(attributes) {
            // Makes editor block full-width
            return { "data-align": "full"};
        },

        edit: function(props, state) {
            let classArray = ['base-group'];
            if (props.attributes.additionalClasses)
                classArray = classArray.concat(props.attributes.additionalClasses.split(" "));
            const className = classArray.join(" ");

            return <Fragment>
                <div className={ className }>
                    <InnerBlocks
                        template={[]}
                        templateLock={ false }/>
                </div>
                <InspectorControls>
                    <PanelBody
                        title="CSS"
                        initialOpen={ true }
                    >
                        <TextControl
                            label="Additional CSS Classes"
                            value={ props.attributes.additionalClasses || "" }
                            onChange={(value) => props.setAttributes({additionalClasses: value})}
                        />
                    </PanelBody>
                </InspectorControls> 
            </Fragment>;
        },

        save: function(props) {
            return <Fragment>
                    <div className={ props.attributes.additionalClasses || "" }>
                        <InnerBlocks.Content />
                    </div>
                </Fragment>
        }
    } );

    console.log('settings', settings);
})();