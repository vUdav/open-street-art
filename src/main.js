import Vue from "vue";
import App from "./App.vue";

// Plugins
import "./plugins/Bugsnag.js";
import "./plugins/Firebase.js";
import "./plugins/Element.js";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
