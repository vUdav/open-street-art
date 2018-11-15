<template>
  <el-header class="header" height="auto">
    <div class="logo">open street art</div>
    <div class="add-object">
      <el-button
        round
        icon="el-icon-plus"
      >Добавить объект</el-button>
    </div>
  </el-header>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
}

.logo {
  font-size: 50px;
}
</style>
