// import HyperHTMLElement from "hyperhtml-element";
// const { render, Fragment } = wp.element;
// const { InnerBlocks, MediaPlaceholder } = wp.editor;
//
// export class InnerBlocksElement extends HyperHTMLElement {
//     created() {
//         const div = document.createElement("div");
//         this.appendChild(div);
//         div.innerText = "Hiya"
//         // console.log("About to call render()!")
//         render(
//             <Fragment>
//                 <p>Rendered via React</p>
//                 <MediaPlaceholder
//                     icon="format-image"
//                     labels={{
//                         title: "Image",
//                         name: "an Image",
//                     }}
//                     className="place"
//                     onSelect={ () => { console.log("HIya")}}
//                     // notices={ noticeUI }
//                     // onError={ noticeOperations.createErrorNotice }
//                     accept="image/*"
//                     type="image"
//                 />
//             </Fragment>,
//             div
//         )
//     }
//
//     render() {
//         return this.html`
//         You should not see this`
//     }
// }
//
// InnerBlocksElement.define("inner-blocks");