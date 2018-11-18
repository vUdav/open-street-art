<template>
  <el-container direction="vertical" class="main-layout">
    <Header/>
    <Main/>
  </el-container>
</template>

<script>
import Header from "./Header";
import Main from "./Main";

export default {
  components: { Header, Main }
}
</script>

<style lang="scss" scoped>
.main-layout {
  height: 100vh;
}
</style>
