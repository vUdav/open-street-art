<template>
<div>
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
      v-for="(object, index) in objects"
      :key="index"
      :lat-lng="getPosition(object.position)"
      :icon="icon"
      @click="openObjectDetail(index)"
    />
  </l-map>

  <Detail
    v-if="objects[openedObjectIndex]"
    :data="objects[openedObjectIndex]"
    :isObjectDetailOpen="isObjectDetailOpen"
    :beforeClose="closeObjectDetail"
  />
</div>
</template>

<script>
import { L, LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import MarkerIcon from 'leaflet/dist/images/marker-icon-2x.png';
import MarkerIconShadow from 'leaflet/dist/images/marker-shadow.png';
import db from "../plugins/Firebase.js";
import Detail from "./Detail";

export default {
  name: 'Map',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    Detail
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
      objects: [],
      isObjectDetailOpen: false,
      openedObjectIndex: null
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
    },
    openObjectDetail: function(index) {
      this.isObjectDetailOpen = true;
      this.openedObjectIndex = index;
    },
    closeObjectDetail: function() {
      this.isObjectDetailOpen = false;
      this.openedObjectIndex = null;
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
