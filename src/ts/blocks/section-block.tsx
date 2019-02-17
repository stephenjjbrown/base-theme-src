(function() {
    const { InspectorControls, InnerBlocks, MediaPlaceholder } = wp.editor;
    const { Fragment } = wp.element;
    const { Panel, PanelBody, PanelRow, Button, TextControl, CheckboxControl, ToggleControl } = wp.components;


    const backgroundPanel = (props) => {
        // TODO: add types for image returned from dialog?
        function onSelectImage(image) {
            console.log("Image selected!", arguments);
            props.setAttributes({
                backgroundUrl: image.url
            });
        }

        function onRemoveImage() {
            props.setAttributes({
                backgroundUrl: ''
            })
        }

        return <PanelBody
                title="Background"
                initialOpen={ true }>

            <ToggleControl
                label="Use simple (CSS) background"
                checked={ !props.attributes.backgroundIsElement }
                onChange={ (backgroundIsNotElement) => props.setAttributes({backgroundIsElement: !backgroundIsNotElement}) }
            />

            { !props.attributes.backgroundIsElement ?
                
                // Simple background controls
                <Fragment>
                    <p>Background Image</p>
                    { props.attributes.backgroundUrl ?
                        <Fragment>
                            <Button style={{display: 'block', width: '100%', textAlign: 'center'}} isDefault onClick={onRemoveImage}>
                                Remove Background Image
                            </Button>
                        </Fragment>
                        :
                        <MediaPlaceholder
                            icon="format-image"
                            labels={ {
                                title: "Select image",
                            } }
                            onSelect={ onSelectImage }
                            accept="image/*"
                            allowedTypes={ ['image'] }
                        />
                    }
                </Fragment>
                :

                // Element background controls
                <Fragment>
                    <TextControl
                        label="Background Element CSS Classes"
                        value={ props.attributes.backgroundElementClasses || "" }
                        onChange={(value) => props.setAttributes({ backgroundElementClasses: value })}/>

                    <ToggleControl
                        label="Use video background"
                        checked={ props.attributes.backgroundIsVideo }
                        onChange={ (backgroundIsVideo) => props.setAttributes({backgroundIsVideo}) }
                    />

                    { props.attributes.backgroundUrl ?
                        <Fragment>
                            <Button style={{display: 'block', width: '100%', textAlign: 'center'}} isDefault onClick={onRemoveImage}>
                                Remove Background Image/Video
                            </Button>
                        </Fragment>
                        :
                        <Fragment>
                            { props.attributes.backgroundIsVideo ?
                                "(Not implemented)"
                                :    
                                <MediaPlaceholder
                                    icon="format-image"
                                    labels={ {
                                        title: "Select image",
                                    } }
                                    onSelect={ onSelectImage }
                                    accept="image/*"
                                    allowedTypes={ ['image'] }
                                />
                            }
                        </Fragment>
                    }
                </Fragment>
            }

        </PanelBody>
    }

    const cssPanel = (props) => <PanelBody
        title="CSS"
        initialOpen={ false }>
        <TextControl
            label="Additional CSS Classes"
            value={ props.attributes.additionalClasses || "" }
            onChange={(value) => props.setAttributes({ additionalClasses: value })}/>
    </PanelBody>

    const inspectorControls = (props) => {
        return <InspectorControls>
            { [backgroundPanel(props), cssPanel(props)] }
        </InspectorControls>
    }






    const render = (props, innerBlocks) => {
        const sectionStyle: any = {};

        // Style
        if (!props.attributes.backgroundIsElement && props.attributes.backgroundUrl)
            sectionStyle.backgroundImage = "url('" + props.attributes.backgroundUrl + "')";

        // Class
        let classArray = ['bt-section'];
        if (props.attributes.backgroundIsElement)
            classArray.push("bt-section-has-background-element");
        if (props.attributes.additionalClasses)
            classArray = classArray.concat(props.attributes.additionalClasses.split(" "));
        const className = classArray.join(" ");

        // Background Element Classes
        let backgroundElementClasses = ['bt-section-background'];
        if (props.attributes.backgroundElementClasses)
            backgroundElementClasses = backgroundElementClasses.concat(props.attributes.backgroundElementClasses.split(" "));
        const backgroundClassName = backgroundElementClasses.join(" ");

        // Render
        return <div className={className} style={sectionStyle}>
            { props.attributes.backgroundIsElement ?
                <div className={ backgroundClassName }>
                    { props.attributes.backgroundIsVideo ?
                        null :
                        <div className="bt-background-image" style={{backgroundImage: "url('" + props.attributes.backgroundUrl + "')"}}></div>
                    }
                </div> : null    
            }
            <div className="bt-section-container">
                { innerBlocks() }
            </div>
        </div>
    } 








    const settings = wp.blocks.registerBlockType( 'base-theme/section', {
        title: 'Section',

        icon: 'id',

        category: 'layout',

        keywords: [],

        attributes: {
            backgroundIsElement: {
                type: 'boolean',
                defaultValue: false
            },
            backgroundElementClasses: {
                type: 'string'
            },
            backgroundIsVideo: {
                type: 'boolean',
                defaultValue: false
            },
            backgroundUrl: {
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
                { render(props, () => <InnerBlocks template={[]} templateLock={ false }/>) }
                { inspectorControls(props) }
            </Fragment>;
        },

        save: function(props) {
            return render(props, () => <InnerBlocks.Content />)
        },

        deprecated: [
            {
                attributes: {
                    backgroundIsElement: {
                        type: 'boolean',
                        defaultValue: false
                    },
                    backgroundElementClasses: {
                        type: 'string'
                    },
                    backgroundIsVideo: {
                        type: 'boolean',
                        defaultValue: false
                    },
                    backgroundUrl: {
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
    
                // migrate: function( attributes ) {
                //     console.log('migratetried');
                //     return {
                //         backgroundUrl: attributes.backgroundImageUrl,
                //         additionalClasses: attributes.additionalClasses
                //     };
                // },

                // isEligible: function() {
                //     return true;
                // },
    
                save: function(props) {
                    const innerBlocks = () => <InnerBlocks.Content />

                    const sectionStyle: any = {};

                    // Style
                    if (!props.attributes.backgroundIsElement && props.attributes.backgroundUrl)
                        sectionStyle.backgroundImage = "url('" + props.attributes.backgroundUrl + "')";
            
                    // Class
                    let classArray = ['bt-section'];
                    if (props.attributes.backgroundIsElement)
                        classArray.push("bt-section-has-background-element");
                    if (props.attributes.additionalClasses)
                        classArray = classArray.concat(props.attributes.additionalClasses.split(" "));
                    const className = classArray.join(" ");
            
                    // Background Element Classes
                    let backgroundElementClasses = ['bt-section-background'];
                    if (props.attributes.backgroundElementClasses)
                        backgroundElementClasses = backgroundElementClasses.concat(props.attributes.backgroundElementClasses.split(" "));
                    const backgroundClassName = backgroundElementClasses.join(" ");
            
                    // Render
                    return <div className={className} style={sectionStyle}>
                        { props.attributes.backgroundIsElement ?
                            <div className={ backgroundClassName }>
                                { props.attributes.backgroundIsVideo ?
                                    null :
                                    <div className="bt-background-image-wrapper">
                                        <img src={ props.attributes.backgroundUrl } alt="Background image" aria-hidden="true"/>
                                    </div>
                                }
                            </div> : null    
                        }
                        <div className="bt-section-container">
                            { innerBlocks() }
                        </div>
                    </div>
                }
            }
        ]
    } );
})();