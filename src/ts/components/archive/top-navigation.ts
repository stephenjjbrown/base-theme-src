// import { MenuItemClient } from "../api/menu-item-client";
//
//
// Vue.component("top-navigation", {
//     data: function() {
//         return {
//             items: []
//         };
//     },
//     created: function() {
//         const client = new MenuItemClient();
//
//         client.getAll()
//             .then(items => this.items = items)
//             .catch(err => console.error(err));
//     },
//     template: `
//         <div class="pa-top-navigation">
//             <a class="pa-top-navigation-logo" :href="_wpSiteInfo.homeUrl">
//                 <template v-if="_wpSiteInfo.customLogo">
//                     <div v-html="_wpSiteInfo.customLogo.imageHtml"></div>
//                 </template>
//                 <template v-else>{{ _wpSiteInfo.siteDisplayName }}</template>
//             </a>
//
//             <template v-for="item of items">
//                 <a class="pa-top-navigation-item" :href="item.url">{{ item.title }}</a>
//             </template>
//         </div>
//     `
// });