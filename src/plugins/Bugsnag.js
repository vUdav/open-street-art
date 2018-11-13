import Vue from "vue";
import bugsnag from "bugsnag-js";
import bugsnagVue from "bugsnag-vue";
const bugsnagClient = bugsnag({
  apiKey: process.env.VUE_APP_BUGSNAG_KEY,
  notifyReleaseStages: ["production", "staging"]
});

bugsnagClient.use(bugsnagVue(Vue));

export default bugsnagClient;
