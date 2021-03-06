<template>
  <div>
    <l-map
      :zoom="$store.state.mapSettings.zoom"
      :center="$store.state.mapSettings.center"
      :class="['map', { 'map--adding-point': $store.state.mapSettings.isAddingPoint }]"
      @click="clickOnMap"
    >
      <locate-control/>
      <l-tile-layer
        :url="$store.state.layerSettings.url"
        :attribution="$store.state.layerSettings.attribution"
      />
      <v-marker-cluster>
        <l-marker
          v-for="(object, index) in objects"
          :key="index"
          :lat-lng="[object.position.latitude, object.position.longitude]"
          :icon="$store.state.markerSettings.defaultIcon"
          @click="openObjectDetail(index)"
        />
      </v-marker-cluster>
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
import Vue2LeafletMarkerCluster from "vue2-leaflet-markercluster";
import db from "@/plugins/Firebase.js";
import Detail from "@/components//Detail";
import AddingForm from "@/components/AddingForm";
import LocateControl from "@/components/LocateControl";

export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    Detail,
    AddingForm,
    LocateControl,
    "v-marker-cluster": Vue2LeafletMarkerCluster
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
@import "~leaflet.markercluster/dist/MarkerCluster.css";
@import "~leaflet.markercluster/dist/MarkerCluster.Default.css";

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
