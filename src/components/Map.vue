<template>
  <div>
    <l-map
      :zoom="$store.state.mapSettings.zoom"
      :center="$store.state.mapSettings.center"
      :class="['map', { 'map--adding-point': $store.state.mapSettings.isAddingPoint }]"
      @click="clickOnMap"
    >
      <l-tile-layer
        :url="$store.state.layerSettings.url"
        :attribution="$store.state.layerSettings.attribution"
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
    <AddingForm
      v-if="addingPointPosition"
      :isAddingFormOpen="isAddingFormOpen"
      :closeAddingForm="closeAddingForm"
      :addingPointPosition="addingPointPosition"
    />
  </div>
</template>

<script>
import { L, LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import MarkerIcon from 'leaflet/dist/images/marker-icon-2x.png';
import MarkerIconShadow from 'leaflet/dist/images/marker-shadow.png';
import db from "../plugins/Firebase.js";
import Detail from "./Detail";
import AddingForm from "./AddingForm";

export default {
  name: 'Map',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    Detail,
    AddingForm
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
      openedObjectIndex: null,
      addingPointPosition: null,
      isAddingFormOpen: false
    }
  },
  firestore: function () {
    return {
      objects: db.collection("geo-objects")
    }
  },
  methods: {
    getPosition: position => {
      return L.latLng(position.latitude, position.longitude)
    },
    openObjectDetail: function (index) {
      this.isObjectDetailOpen = true;
      this.openedObjectIndex = index;
    },
    closeObjectDetail: function () {
      this.isObjectDetailOpen = false;
      this.openedObjectIndex = null;
    },
    clickOnMap: function (e) {
      if (this.$store.state.mapSettings.isAddingPoint) {
        this.addingPointPosition = e.latlng;
        this.openAddingForm();
      }
    },
    openAddingForm: function () {
      this.isAddingFormOpen = true;
    },
    closeAddingForm: function () {
      this.isAddingFormOpen = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~leaflet/dist/leaflet.css";

.map {
  height: 100vh;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }

  &--adding-point {
    cursor: crosshair;
  }
}
</style>
