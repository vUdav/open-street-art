<template>
  <div style="display: none;">
    <slot v-if="ready"></slot>
  </div>
</template>

<script>
import L, { DomEvent } from 'leaflet';
import { findRealParent, propsBinder } from 'vue2-leaflet';
import "leaflet.locatecontrol";

const props = {
  options: {
    type: Object,
    default() { return {}; },
  },
  visible: {
    type: Boolean,
    custom: true,
    default: true
  }
}

export default {
  props: props,

  data() {
    return {
      ready: false
    }
  },

  beforeDestroy() {
    this.parentContainer.removeLayer(this);
  },

  mounted() {
    this.mapObject = L.control.locate(this.options);
    DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, props);
    this.ready = true;
    this.parentContainer = findRealParent(this.$parent);
    this.mapObject.addTo(this.parentContainer.mapObject, !this.visible);
  }
}
</script>

<style lang="scss" scoped>
@import "~leaflet.locatecontrol/src/L.Control.Locate.scss";
@import "~font-awesome/css/font-awesome.css";
</style>
