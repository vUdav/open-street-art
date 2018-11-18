<template>
  <el-dialog
    v-loading="isAdding"
    title="Добавление нового объекта"
    :visible.sync="isAddingFormOpen"
    :before-close="closeAddingForm"
  >
    <span>
      <l-map :zoom="15" :center="[addingPointPosition.lat, addingPointPosition.lng]" class="map">
        <l-tile-layer
          :url="$store.state.layerSettings.url"
          :attribution="$store.state.layerSettings.attribution"
        />
        <l-marker :lat-lng="getPosition(addingPointPosition)" :icon="icon"/>
      </l-map>
      <el-form :model="objectForm" :label-width="formLabelWidth" ref="objectForm">
        <el-form-item
          label="Название работы"
          prop="name"
          :rules="[
            { required: true, message: 'Введите название', trigger: 'blur' }
          ]"
        >
          <el-input v-model="objectForm.name"/>
        </el-form-item>
        <el-form-item label="Автор">
          <el-select v-model="objectForm.artist" filterable placeholder="Выбрать">
            <el-option
              v-for="(artist, index) in artists"
              :key="index"
              :label="artist.name"
              :value="artist.slug"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Описание">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 8}"
            v-model="objectForm.description"
          />
        </el-form-item>
        <el-form-item
          label="Изображение"
          prop="img"
          :rules="[
            { required: true, message: 'Загрузить изображение' }
          ]"
        >
          <el-input type="file" @change="getFile" class="uploadImg"/>
        </el-form-item>
      </el-form>
    </span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="resetForm('objectForm')">Отменить</el-button>
      <el-button type="primary" @click="submitForm('objectForm')">Добавить</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { L, LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import MarkerIcon from 'leaflet/dist/images/marker-icon-2x.png';
import MarkerIconShadow from 'leaflet/dist/images/marker-shadow.png';
import db, { GeoPoint, objectsRef } from "../plugins/Firebase.js";

export default {
  name: 'AddingForm',
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  props: {
    isAddingFormOpen: {
      type: Boolean,
      default: false
    },
    closeAddingForm: Function,
    addingPointPosition: {
      type: Object,
      required: true
    }
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
      objectForm: {
        name: '',
        artist: '',
        description: '',
        img: null
      },
      formLabelWidth: "150px",
      artists: [],
      isAdding: false
    }
  },
  firestore: function () {
    return {
      artists: db.collection("artists")
    }
  },
  methods: {
    submitForm: function (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.isAdding = true;
          const name = this.objectForm.name;
          const description = this.objectForm.description;
          const createdAt = new Date();
          const position = new GeoPoint(this.addingPointPosition.lat, this.addingPointPosition.lng);
          const artist = this.objectForm.artist ? db.doc(`artists/${this.objectForm.artist}`) : db.doc('artists/other');
          const imgName = await this.uploadImg();

          await db.collection('geo-objects').add({
            name,
            description,
            artist,
            position,
            createdAt,
            imgName
          });

          this.doneAdding();
        }
      });
    },
    resetForm: function (formName) {
      this.$refs[formName].resetFields();
      this.closeAddingForm();
    },
    getPosition: position => {
      return L.latLng(position.lat, position.lng)
    },
    doneAdding: function () {
      this.isAdding = false;
      this.resetForm('objectForm');
      this.$store.commit('disableAddingPoint');
    },
    getFile: function () {
      const file = document.querySelector('.uploadImg input').files[0];
      this.objectForm.img = file;
    },
    uploadImg: async function () {
      const file = this.objectForm.img;
      const name = `${(+new Date())} - ${file.name}`;
      const metadata = {
        contentType: file.type
      };
      await objectsRef.child(name).put(file, metadata);

      return name;
    }
  }
}
</script>

<style lang="scss" scoped>
.map {
  height: 150px;
  margin-bottom: 20px;
}
</style>
