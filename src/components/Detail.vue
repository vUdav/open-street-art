<template>
  <el-dialog :title="data.name" :visible.sync="isObjectDetailOpen" :before-close="beforeClose">
    <img v-if="imgUrl" :src="imgUrl" :alt="data.name" width="100%">
    <div v-if="data.description" v-html="data.description"/>
    <hr>
    <div v-if="data.artist.name">
      <h2>Автор</h2>
      <p>{{ data.artist.name }}</p>
      <div v-if="data.artist.links">
        <p>Контакты:</p>
        <ul>
          <li v-for="(link, index) in data.artist.links" :key="index">
            <a :href="link" target="_blank">{{ link }}</a>
          </li>
        </ul>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { storage } from "../plugins/Firebase.js";
export default {
  name: 'Detail',
  props: {
    data: {
      type: Object,
      required: true
    },
    isObjectDetailOpen: {
      type: Boolean,
      default: false
    },
    beforeClose: Function
  },
  data() {
    return {
      imgUrl: ''
    };
  },
  methods: {
    getImgPath: function () {
      const imgRef = storage.ref().child(process.env.VUE_APP_STORAGE_OBJECTS_PATH).child(this.data.imgName);
      imgRef.getDownloadURL().then((url) => {
        this.imgUrl = url;
      }).catch((error) => {
        console.error(error);
      });
    }
  },
  created() {
    this.getImgPath();
  }
}
</script>
