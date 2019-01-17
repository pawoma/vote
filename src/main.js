
/* eslint-disable */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


// require('@/assets/js/Common_V.js')

// var OpenID = "";
// if ($.cookie("wb_openid")) {
//   OpenID = $.cookie("wb_openid");
//   Check();
// }
// else {
//   if (GetQueryString("code") == null || GetQueryString("from") != null) {
//     Go();
//     return;
//   }

//   GetOpenID();
// }

// $.cookie("userInfo", JSON.stringify({
//   openid: '2311312321131231'+Math.random(),
//   nickname: 'pcli',
//   headimgurl: '2131231'
// }))


if (!$.cookie("userInfo") && (!GetQueryString("code") || GetQueryString("from") != null)) {
  Go('', '1');
} else {

  Vue.config.productionTip = false

  new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app')
}
