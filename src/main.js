import Vue from "vue";
import "./plugins/Bugsnag.js";
import "./plugins/Firebase.js";
import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
