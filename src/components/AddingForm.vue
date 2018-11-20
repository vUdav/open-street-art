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
        <l-marker
          :lat-lng="getPosition(addingPointPosition)"
          :icon="$store.state.markerSettings.defaultIcon"
        />
      </l-map>
      <el-form :model="objectForm" label-width="150px" ref="objectForm">
        <el-form-item
          label="Название работы"
          prop="name"
          :rules="[
            { required: true, message: 'Введите название', trigger: 'blur' }
          ]"
        >
          <el-input v-model="objectForm.name"/>
        </el-form-item>
        <el-form-item label="Автор" prop="artist">
          <el-select v-model="objectForm.artist" filterable placeholder="Выбрать">
            <el-option
              v-for="(artist, index) in artists"
              :key="index"
              :label="artist.name"
              :value="artist.slug"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Описание" prop="description">
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
          <el-input type="file" @change="getFile" v-model="objectForm.img" class="uploadImg"/>
        </el-form-item>
      </el-form>
    </span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeForm('objectForm')">Отменить</el-button>
      <el-button type="primary" @click="submitForm('objectForm')">Добавить</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import { getMarkerPosition } from "@/plugins/LeafletHelpers.js";
import db, { GeoPoint, objectsRef } from "@/plugins/Firebase.js";

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
      objectForm: {
        name: '',
        artist: '',
        description: '',
        img: ''
      },
      imgFile: null,
      artists: [],
      isAdding: false
    }
  },
  firestore() {
    const artists = db.collection(process.env.VUE_APP_FIRESTORE_ARTISTS_REF);

    return {
      artists
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.isAdding = true;

          const name = this.objectForm.name;
          const description = this.objectForm.description;
          const createdAt = new Date();
          const position = new GeoPoint(this.addingPointPosition.lat, this.addingPointPosition.lng);
          const artist = this.objectForm.artist ? db.doc(`${process.env.VUE_APP_FIRESTORE_ARTISTS_REF}/${this.objectForm.artist}`) : db.doc(`${process.env.VUE_APP_FIRESTORE_ARTISTS_REF}/${process.env.VUE_APP_FIRESTORE_UNKNOWN_ARTISTS_REF}`);
          const imgName = await this.uploadImg();

          await db.collection(process.env.VUE_APP_FIRESTORE_OBJECTS_REF).add({
            name,
            description,
            artist,
            position,
            createdAt,
            imgName
          });

          this.doneAdding(formName);
        }
      });
    },
    closeForm(formName) {
      this.resetForm(formName)
      this.closeAddingForm();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      document.querySelector('.uploadImg input').value = '';
    },
    getPosition(position) {
      return getMarkerPosition(position.lat, position.lng)
    },
    doneAdding(formName) {
      this.isAdding = false;
      this.closeForm(formName);
      this.$store.commit('disableAddingPoint');
    },
    getFile() {
      const file = document.querySelector('.uploadImg input').files[0];
      this.imgFile = file;
    },
    async uploadImg() {
      const file = this.imgFile;
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
