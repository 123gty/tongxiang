<template>
  <div class="container">
    <!-- 导航区域 -->
    <nav-bar></nav-bar>
    <!-- 主内容区域 -->
    <main-content ref="mainContent"></main-content>
  </div>
</template>
<script>
import navBar from '@/layout/navBar/navBar'
import mainContent from '@/layout/mainContent/mainContent'
export default {
  name: 'layout',
  components: {
    navBar,
    mainContent
  }
}
</script>
<style>
</style>
