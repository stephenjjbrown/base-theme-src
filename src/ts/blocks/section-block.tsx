(function() { 
    const { InspectorControls, InnerBlocks, MediaPlaceholder } = wp.editor;
    const { Fragment } = wp.element;
    const { Panel, PanelBody, PanelRow, Button, TextControl } = wp.components;

    const settings = wp.blocks.registerBlockType( 'base-theme/section', {
        title: 'Section',

        icon: 'id',

        category: 'layout',

        keywords: [],

        attributes: {
            backgroundImageUrl: {
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
            // TODO: add types for image returned from dialog?
            function onSelectImage(image) {
                console.log("Image selected!", arguments);
                props.setAttributes({
                    backgroundImageUrl: image.url
                });
            }

            function onRemoveImage() {
                props.setAttributes({
                    backgroundImageUrl: ''
                })
            }

            function onchange(e) {
                const el = e.target as HTMLInputElement;
                props.setAttributes({
                    backgroundImageUrl: el.value
                })
            }

            function onkeyup(e: KeyboardEvent) {
                if (e.key === 'enter') {
                    onchange(e);
                }
            }

            const sectionStyle = props.attributes.backgroundImageUrl ? {
                backgroundImage: "url('" + props.attributes.backgroundImageUrl + "')"
            } : {}

            let classArray = ['bt-section'];
            if (props.attributes.additionalClasses)
                classArray = classArray.concat(props.attributes.additionalClasses.split(" "));
            const className = classArray.join(" ");

            const fragment = <Fragment>
                <div className={className} style={sectionStyle}>
                    <div className="bt-section-container">
                        <InnerBlocks
                            template={[]}
                            templateLock={ false }/>
                    </div>
                </div>
                <InspectorControls>
                <PanelBody
                        title="Background"
                        initialOpen={ true }
                    >
                        <p>Background Image</p>
                        {props.attributes.backgroundImageUrl ?
                            <Button style={{width: '100%', textAlign: 'center'}} isDefault onClick={onRemoveImage}>Remove Background Image</Button> :
                            <MediaPlaceholder
                                icon="format-image"
                                labels={ {
                                    title: "Media area",
                                } }
                                onSelect={ onSelectImage }
                                accept="image/*"
                                allowedTypes={ ['image'] }
                            />
                        }
                    </PanelBody>
                    <PanelBody
                        title="CSS"
                        initialOpen={ false }
                    >
                        <TextControl
                            label="Additional CSS Classes"
                            value={ props.attributes.additionalClasses || "" }
                            onChange={(value) => props.setAttributes({additionalClasses: value})}
                        />
                    </PanelBody>
                </InspectorControls> 
            </Fragment>;

            console.log("Created fragment");

            return fragment;
        },

        save: function(props) {
            const sectionStyle = props.attributes.backgroundImageUrl ? {
                backgroundImage: "url('" + props.attributes.backgroundImageUrl + "')"
            } : {}

            let classArray = ['bt-section'];
            if (props.attributes.additionalClasses)
                classArray = classArray.concat(props.attributes.additionalClasses.split(" "));
            const className = classArray.join(" ");

            return <Fragment>
                <div className={className} style={sectionStyle}>
                    <div className="bt-section-container">
                        <InnerBlocks.Content />
                    </div>
                </div>
            </Fragment>
        }
    } );

    console.log('settings', settings);
})();