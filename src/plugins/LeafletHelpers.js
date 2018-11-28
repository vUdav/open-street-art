import { L } from "vue2-leaflet";

export const getMarkerPosition = (lat, lng) => {
  return L.latLng(lat, lng);
};
