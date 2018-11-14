<template>
  <div>
    <l-map
      :zoom="13"
      :center="[51.505, -0.09]"
      style="height: 500px"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <l-marker
        :lat-lng="marker"
        :icon="icon"
      />
    </l-map>
  </div>
</template>

<script>
import { L, LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import MarkerIcon from 'leaflet/dist/images/marker-icon-2x.png';
import MarkerIconShadow from 'leaflet/dist/images/marker-shadow.png';

export default {
  name: 'Example',
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data() {
    return {
      marker: L.latLng(51.505, -0.09),
      icon: L.icon({
        iconUrl: MarkerIcon,
        iconSize: [26, 42],
        iconAnchor: [13, 42],
        shadowUrl: MarkerIconShadow,
        shadowSize: [41, 41],
        shadowAnchor: [13, 41]
      })
    }
  }
};
</script>

<style>
@import "~leaflet/dist/leaflet.css";
</style>
