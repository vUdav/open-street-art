import Vue from "vue";
import Vuex from "vuex";
import { L } from "vue2-leaflet";
import MarkerIcon from "leaflet/dist/images/marker-icon-2x.png";
import MarkerIconShadow from "leaflet/dist/images/marker-shadow.png";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    mapSettings: {
      zoom: 10,
      center: [59.93428, 30.335098],
      isAddingPoint: false
    },
    layerSettings: {
      url:
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png",
      attribution:
        "&copy; <a href='http://osm.org/copyrighte'>OpenStreetMap</a> contributors"
    },
    markerSettings: {
      defaultIcon: L.icon({
        iconUrl: MarkerIcon,
        iconSize: [26, 42],
        iconAnchor: [13, 42],
        shadowUrl: MarkerIconShadow,
        shadowSize: [41, 41],
        shadowAnchor: [13, 41]
      })
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
