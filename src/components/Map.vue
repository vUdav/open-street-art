<template>
  <l-map
    :zoom="10"
    :center="[59.934280, 30.335098]"
    class="map"
  >
    <l-tile-layer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    />
    <l-marker
      v-for="(object, idx) in objects"
      :key="idx"
      :lat-lng="getPosition(object.position)"
      :icon="icon"
    />
  </l-map>
</template>

<script>
import { L, LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import MarkerIcon from 'leaflet/dist/images/marker-icon-2x.png';
import MarkerIconShadow from 'leaflet/dist/images/marker-shadow.png';
import db from "../plugins/Firebase.js";

export default {
  name: 'Map',
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data() {
    return {
      icon: L.icon({
        iconUrl: MarkerIcon,
        iconSize: [26, 42],
        iconAnchor: [13, 42],
        shadowUrl: MarkerIconShadow,
        shadowSize: [41, 41],
        shadowAnchor: [13, 41]
      }),
      objects: []
    }
  },
  firestore: function() {
    return {
      objects: db.collection("geo-objects")
    }
  },
  methods: {
    getPosition: position => {
       return L.latLng(position.latitude, position.longitude)
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~leaflet/dist/leaflet.css";

.map {
  height: 100vh;
}
</style>
