<template>
  <el-dialog
    :title="data.name"
    :visible.sync="isObjectDetailOpen"
    :before-close="beforeClose"
  >
    <img :src="data.imgUrl" :alt="data.name" width="100%">
    <div v-html="data.description" />
    <hr />
    <h2>Автор</h2>
    <p>{{ data.artist.name }}</p>
    <p>Контакты:</p>
    <ul>
      <li
        v-for="(link, index) in data.artist.links"
        :key="index"
      >
        <a :href="link" target="_blank">{{ link }}</a>
      </li>
    </ul>
  </el-dialog>
</template>

<script>
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
  }
}
</script>
