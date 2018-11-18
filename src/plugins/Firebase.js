import Vue from "vue";
import VueFire from "vuefire";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

Vue.use(VueFire);

firebase.initializeApp({
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET
  // messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID
});

// Firestore
const db = firebase.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);

// Storage
export const storage = firebase.storage();
export const objectsRef = storage
  .ref()
  .child(process.env.VUE_APP_STORAGE_OBJECTS_PATH);

// Classes
export const GeoPoint = firebase.firestore.GeoPoint;

export default db;
