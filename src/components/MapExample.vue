<template>
  <div id="app">
    <l-map :zoom="10" :center="[59.93428, 30.335098]" style="height: 500px; width: 500px">
      <l-tile-layer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
        attribution="&copy; <a href='http://osm.org/copyrighte'>OpenStreetMap</a> contributors"
      />
      <v-marker-cluster>
        <l-marker :lat-lng="[59.94729558555478, 30.411314964294437]" :icon="defaultIcon"/>
        <l-marker :lat-lng="[59.9337277687683, 30.357758563477553]" :icon="defaultIcon"/>
      </v-marker-cluster>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import L from "leaflet";
import Vue2LeafletMarkerCluster from "vue2-leaflet-markercluster";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import icon from "leaflet/dist/images/marker-icon-2x.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

export default {
  name: "App",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    "v-marker-cluster": Vue2LeafletMarkerCluster
  },
  data() {
    return {
      defaultIcon: L.icon({
        iconUrl: icon,
        iconSize: [26, 42],
        iconAnchor: [13, 42],
        shadowUrl: iconShadow,
        shadowSize: [41, 41],
        shadowAnchor: [13, 41]
      })
    };
  }
};
</script>
