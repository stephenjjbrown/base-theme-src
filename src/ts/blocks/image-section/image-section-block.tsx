// const { InspectorControls, InnerBlocks, MediaPlaceholder } = wp.editor;
// const { Fragment } = wp.element;

// const settings = wp.blocks.registerBlockType( 'base-theme/image-section', {
//     title: 'Image Section',

//     icon: 'id',

//     category: 'layout',

//     keywords: [],

//     attributes: {
//         imageUrl: {
//             type: 'string'
//         }
//     },

//     getEditWrapperProps(attributes) {
//         // Makes editor block full-width
//         return { "data-align": "full"};
//     },

//     edit: function(props, state) {
//         // TODO: add types for image returned from dialog?
//         function onSelectImage(image) {
//             console.log("Image selected!", arguments);
//             props.setAttributes({
//                 imageUrl: image.url
//             });
//         }

//         function onchange(e) {
//             const el = e.target as HTMLInputElement;
//             props.setAttributes({
//                 imageUrl: el.value
//             })
//         }

//         function onkeyup(e: KeyboardEvent) {
//             if (e.key === 'enter') {
//                 onchange(e);
//             }
//         }

//         return <Fragment>
//             <div className="base-image-section">
//                 <div className="base-image-section-column">
//                     {props.attributes.imageUrl ?
//                         <img src={props.attributes.imageUrl}/> :
//                         <MediaPlaceholder
//                             icon="format-image"
//                             labels={{
//                                 title: "Image",
//                                 name: "an Image",
//                             }}
//                             className="place"
//                             onSelect={onSelectImage}
//                             // notices={ noticeUI }
//                             // onError={ noticeOperations.createErrorNotice }
//                             accept="image/*"
//                             type="image"
//                         />
//                     }
//                 </div>
//                 <div className="base-image-section-column">
//                     <InnerBlocks
//                         template={ [['core/column']] }
//                         templateLock="all"/>
//                 </div>
//             </div>
//             <InspectorControls>
//                 <input type="text" value={ props.attributes.imageUrl } onBlur={onchange} onKeyUp={onkeyup as any}/>
//             </InspectorControls>
//         </Fragment>;
//     },

//     save: function(props) {
//         return <Fragment>
//             <div className="base-image-section">
//                 <div className="base-image-section-column">
//                     <img src={props.attributes.imageUrl}/>
//                 </div>
//                 <div className="base-image-section-column">
//                     <InnerBlocks.Content />
//                 </div>
//             </div>
//         </Fragment>
//     }
// } );

// console.log('settings', settings);