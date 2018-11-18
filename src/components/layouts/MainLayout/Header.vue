<template>
  <el-header class="header" height="auto">
    <div class="logo">open street art</div>
    <div class="add-object">
      <el-popover
        placement="left"
        width="160"
        v-model="$store.state.mapSettings.isAddingPoint"
        trigger="manual"
      >
        <p>Укажите точку на карте</p>
        <div style="text-align: right; margin: 0">
          <el-button type="danger" size="mini" @click="cancelAddingObject">Отменить</el-button>
        </div>
        <el-button
          round
          icon="el-icon-plus"
          @click="onClickAddObject"
          :disabled="$store.state.mapSettings.isAddingPoint"
          slot="reference"
        >Добавить объект</el-button>
      </el-popover>
    </div>
  </el-header>
</template>

<script>
export default {
  methods: {
    onClickAddObject: function () {
      this.$store.commit('enableAddingPoint');
    },
    cancelAddingObject: function () {
      this.$store.commit('disableAddingPoint');
    }
  }
}
</script>


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
