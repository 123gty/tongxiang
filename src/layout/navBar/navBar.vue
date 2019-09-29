<template>
  <div>
    <div class="menu-bar-container">
      <el-menu class="left-menu">
        <el-submenu index="1">
          <template slot="title">
            <span>村民协商</span>
          </template>
          <el-menu-item index="1-1" @click="link('peopleAgree')">村规民约</el-menu-item>
          <el-menu-item index="1-2" @click="link('peopleProceed')">百姓议事会</el-menu-item>
          <el-menu-item index="1-3" @click="link('peopleCounselor')">乡贤参事会</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <span>服务村民</span>
          </template>
          <el-menu-item index="2-1" @click="link('serviceTeam')">百事服务团</el-menu-item>
          <el-submenu index="2-2">
            <template slot="title">
              <span>法律服务团</span>
            </template>
              <el-menu-item index="2-2-1" @click="link('leagTeam')">法律团队</el-menu-item>
              <el-menu-item index="2-2-2" @click="link('commonProblem')">居民常见问题</el-menu-item>
              <el-menu-item index="2-2-3" @click="link('leagAdvice')">法律咨询</el-menu-item>
          </el-submenu>
          <el-menu-item index="2-3" @click="link('moralJudgment')">道德评判团</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <span>村治管理</span>
          </template>
          <el-menu-item index="3-1" @click="link('peopleTalk')">村民说事</el-menu-item>
          <el-menu-item index="3-2" @click="link('peopleSupervision')">村务监督</el-menu-item>
          <el-submenu index="3-3">
            <template slot="title">
              <span>乡风文明</span>
            </template>
            <el-menu-item index="3-3-1" @click="link('commitment')">承诺书</el-menu-item>
            <el-menu-item index="3-3-2" @click="link('goodAtmosphere')">文明乡风</el-menu-item>
            <el-menu-item index="3-3-3" @click="link('badAtmosphere')">不良乡风</el-menu-item>
          </el-submenu>
          <el-menu-item index="3-3-4" @click="link('peopleReward')">奖励村民</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>
<script>
export default {
  name: 'navBar',
  data () {
    return {}
  },
  methods: {
    link (path) {
      this.$router.push({path: path})
    }
  }
}
</script>
<style scoped lang="scss">
  $text-color: #5fc6e9;
  .menu-bar-container {
    position: fixed;
    top: 0px;
    left: 0;
    bottom: 0;
    z-index: 1020;
    width:180px;
    .left-menu {
      background: linear-gradient(#000a1e, #002046, #000a1e);
      background-color: transparent;
      width:100%
    }
    .el-menu {
      position: absolute;
      text-align: left;
      height: 100%;
      /deep/ .el-submenu__title {
        color: $text-color;
        i {
          color: $text-color;
        }
      }
    }
    /deep/ .el-menu--inline {
          background: transparent;
      li {
        color: $text-color;
        i {
          color: $text-color;
        }
      }
    }
    /deep/ .el-menu-item,
    /deep/ .el-submenu__title {
      &:hover,
      &:focus {
        color: #00aeff;
        background: transparent;
      }
      i {
        color: #00aeff;
      }
    }
    /deep/ .el-menu-item.is-active,
    /deep/ .el-submenu.is-active .el-submenu__title {
      color: #00aeff;
      i {
        color: #00aeff;
      }
    }
    .el-submenu {
      .el-menu-item {
        min-width: 100px;
        padding:0px;
      }
    }
  }
</style>
