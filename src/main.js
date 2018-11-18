import Vue from "vue";
import App from "./App.vue";
import store from "./store";

// Plugins
import "./plugins/Bugsnag.js";
import "./plugins/Firebase.js";
import "./plugins/Element.js";

import "./assets/scss/common.scss";

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
