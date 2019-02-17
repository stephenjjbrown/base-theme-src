(function() {
    const { InspectorControls, InnerBlocks, MediaPlaceholder } = wp.editor;
    const { Fragment } = wp.element;
    const { Panel, PanelBody, PanelRow, Button, TextControl } = wp.components;

    const settings = wp.blocks.registerBlockType( 'base-theme/anchor-group', {
        title: 'Anchor Group',

        icon: 'id',

        category: 'layout',

        keywords: [],

        attributes: {
            href: {
                type: 'string'
            },
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
            return <Fragment>
                <a className={ props.attributes.additionalClasses || "" }
                    href={ props.attributes.href || null}
                    onClick={(e) => { e.preventDefault(); console.log('hi')}}>
                    <InnerBlocks
                        template={[]}
                        templateLock={ false }/>
                </a>
                <InspectorControls>
                    <PanelBody
                        title="Anchor"
                        initialOpen={ true }
                    >
                        <TextControl
                            label="Link URL"
                            value={ props.attributes.href || "" }
                            onChange={(value) => props.setAttributes({href: value})}
                        />
                    </PanelBody>
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
                    <a className={ props.attributes.additionalClasses || "" } href={ props.attributes.href || null }>
                        <InnerBlocks.Content />
                    </a>
                </Fragment>
        }
    } );
})();