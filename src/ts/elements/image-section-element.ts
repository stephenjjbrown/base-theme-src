// import HyperHTMLElement from "hyperhtml-element/esm";
//
// // TODO: Refactor as two column section with generic content in middle
// export class ImageSectionElement extends HyperHTMLElement {
//     imageNodes: NodeListOf<Element>;
//
//     render() {
//         // Currently assumes render will only happen once, otherwise, only retrieve these on firstTime
//         // TODO: Get slot elements safely with error handling
//         const childNodes = this.childNodes;
//         const imageElement = this.childNodes[0].childNodes;
//         const contentNodes = this.childNodes[1].childNodes;
//
//         return this.html`
//             <image-section-column>
//                 ${ imageElement }
//             </image-section-column>
//             <image-section-column>
//                 ${ contentNodes }
//             </image-section-column>
//             <style>
//                 image-section {
//                     display: flex;
//                 }
//                 image-section > image-section-column {
//                     flex: 0 0 50%;
//                 }
//                 image-section > image-section-column > img {
//                     width: 100%;
//                     height: auto;
//                 }
//             </style>
//         `
//     }
// }
//
// //TODO: Prefix element name
// ImageSectionElement.define("image-section");