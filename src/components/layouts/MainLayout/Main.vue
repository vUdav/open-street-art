<template>
  <el-main class="main">
    <Map/>
  </el-main>
</template>

<script>
import Map from "@/components/Map";

export default {
  components: { Map }
}
</script>

<style lang="scss" scoped>
.main {
  padding: 0;
  height: 100%;
}
</style>
