(function () {
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
            });
        }
        return wp.element.createElement(PanelBody, { title: "Background", initialOpen: true },
            wp.element.createElement(ToggleControl, { label: "Use simple (CSS) background", checked: !props.attributes.backgroundIsElement, onChange: (backgroundIsNotElement) => props.setAttributes({ backgroundIsElement: !backgroundIsNotElement }) }),
            !props.attributes.backgroundIsElement ?
                // Simple background controls
                wp.element.createElement(Fragment, null,
                    wp.element.createElement("p", null, "Background Image"),
                    props.attributes.backgroundUrl ?
                        wp.element.createElement(Fragment, null,
                            wp.element.createElement(Button, { style: { display: 'block', width: '100%', textAlign: 'center' }, isDefault: true, onClick: onRemoveImage }, "Remove Background Image"))
                        :
                            wp.element.createElement(MediaPlaceholder, { icon: "format-image", labels: {
                                    title: "Select image",
                                }, onSelect: onSelectImage, accept: "image/*", allowedTypes: ['image'] }))
                :
                    // Element background controls
                    wp.element.createElement(Fragment, null,
                        wp.element.createElement(TextControl, { label: "Background Element CSS Classes", value: props.attributes.backgroundElementClasses || "", onChange: (value) => props.setAttributes({ backgroundElementClasses: value }) }),
                        wp.element.createElement(ToggleControl, { label: "Use video background", checked: props.attributes.backgroundIsVideo, onChange: (backgroundIsVideo) => props.setAttributes({ backgroundIsVideo }) }),
                        props.attributes.backgroundUrl ?
                            wp.element.createElement(Fragment, null,
                                wp.element.createElement(Button, { style: { display: 'block', width: '100%', textAlign: 'center' }, isDefault: true, onClick: onRemoveImage }, "Remove Background Image/Video"))
                            :
                                wp.element.createElement(Fragment, null, props.attributes.backgroundIsVideo ?
                                    "(Not implemented)"
                                    :
                                        wp.element.createElement(MediaPlaceholder, { icon: "format-image", labels: {
                                                title: "Select image",
                                            }, onSelect: onSelectImage, accept: "image/*", allowedTypes: ['image'] }))));
    };
    const cssPanel = (props) => wp.element.createElement(PanelBody, { title: "CSS", initialOpen: false },
        wp.element.createElement(TextControl, { label: "Additional CSS Classes", value: props.attributes.additionalClasses || "", onChange: (value) => props.setAttributes({ additionalClasses: value }) }));
    const inspectorControls = (props) => {
        return wp.element.createElement(InspectorControls, null, [backgroundPanel(props), cssPanel(props)]);
    };
    const render = (props, innerBlocks) => {
        const sectionStyle = {};
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
        return wp.element.createElement("div", { className: className, style: sectionStyle },
            props.attributes.backgroundIsElement ?
                wp.element.createElement("div", { className: backgroundClassName }, props.attributes.backgroundIsVideo ?
                    null :
                    wp.element.createElement("div", { className: "bt-background-image", style: { backgroundImage: "url('" + props.attributes.backgroundUrl + "')" } })) : null,
            wp.element.createElement("div", { className: "bt-section-container" }, innerBlocks()));
    };
    const settings = wp.blocks.registerBlockType('base-theme/section', {
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
            return { "data-align": "full" };
        },
        edit: function (props, state) {
            return wp.element.createElement(Fragment, null,
                render(props, () => wp.element.createElement(InnerBlocks, { template: [], templateLock: false })),
                inspectorControls(props));
        },
        save: function (props) {
            return render(props, () => wp.element.createElement(InnerBlocks.Content, null));
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
                save: function (props) {
                    const innerBlocks = () => wp.element.createElement(InnerBlocks.Content, null);
                    const sectionStyle = {};
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
                    return wp.element.createElement("div", { className: className, style: sectionStyle },
                        props.attributes.backgroundIsElement ?
                            wp.element.createElement("div", { className: backgroundClassName }, props.attributes.backgroundIsVideo ?
                                null :
                                wp.element.createElement("div", { className: "bt-background-image-wrapper" },
                                    wp.element.createElement("img", { src: props.attributes.backgroundUrl, alt: "Background image", "aria-hidden": "true" }))) : null,
                        wp.element.createElement("div", { className: "bt-section-container" }, innerBlocks()));
                }
            }
        ]
    });
})();
