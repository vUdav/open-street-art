import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    mapSettings: {
      zoom: 10,
      center: [59.93428, 30.335098],
      isAddingPoint: false
    }
  },

  mutations: {
    enableAddingPoint(state) {
      state.mapSettings.isAddingPoint = true;
    },

    disableAddingPoint(state) {
      state.mapSettings.isAddingPoint = false;
    }
  }
});
