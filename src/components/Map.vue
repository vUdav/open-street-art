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
        :icon="$store.state.markerSettings.defaultIcon"
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
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import { getMarkerPosition } from "@/plugins/LeafletHelpers.js";
import db from "@/plugins/Firebase.js";
import Detail from "@/components//Detail";
import AddingForm from "@/components/AddingForm";

export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    Detail,
    AddingForm
  },
  data() {
    return {
      objects: [],
      isObjectDetailOpen: false,
      openedObjectIndex: null,
      addingPointPosition: null,
      isAddingFormOpen: false
    };
  },
  firestore() {
    const objects = db.collection(process.env.VUE_APP_FIRESTORE_OBJECTS_REF);

    return {
      objects
    };
  },
  methods: {
    getPosition(position) {
      return getMarkerPosition(position.latitude, position.longitude);
    },
    openObjectDetail(index) {
      this.isObjectDetailOpen = true;
      this.openedObjectIndex = index;
    },
    closeObjectDetail() {
      this.isObjectDetailOpen = false;
      this.openedObjectIndex = null;
    },
    clickOnMap(e) {
      if (this.$store.state.mapSettings.isAddingPoint) {
        this.addingPointPosition = e.latlng;
        this.openAddingForm();
      }
    },
    openAddingForm() {
      this.isAddingFormOpen = true;
    },
    closeAddingForm() {
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
