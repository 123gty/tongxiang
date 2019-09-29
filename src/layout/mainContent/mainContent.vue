<template>
  <div class="main-container">
    <div class="tab-container">
      <el-tabs type="card" v-model="tabName">
        <el-tab-pane :label="tabName" :name="tabName"></el-tab-pane>
      </el-tabs>
    </div>
    <!-- 主内容区域 -->
    <div class="main-content">
      <keep-alive>
        <transition name="fade-transform" mode="out-in">
            <router-view></router-view>
        </transition>
      </keep-alive>
    </div>
  </div>
</template>
<script>
export default {
  name: 'mainContent',
  data () {
    return {
      tabName: this.$route.name
    }
  },
  watch: {
    $route (to, from) {
      this.tabName = to.name
    }
  }
}
</script>
<style scoped lang="scss">
.main-container {
  padding: 0 5px 5px;
  position: absolute;
  top: 5px;
  left: 1px;
  right: 1px;
  bottom: 0px;
  margin-left:180px;
}
</style>
