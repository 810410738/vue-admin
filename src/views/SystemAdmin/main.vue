<template>
  <div class="body">
    <div>
      <headTop class="head"></headTop>
    </div>
    <div class="main">
      <div class="left">
        <!-- 左边菜单 -->
        <leftMenu></leftMenu>
      </div>
      <div class="right">
        <!-- 主页面 -->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import leftMenu from "@/components/index/leftMenu";
import headTop from "@/components/SystemAdmin/headTop";
export default {
  components: {
    leftMenu,
    headTop
  },
  created() {
    this.init();
  },
  methods: {
    /**
     * @description 初始化页面
     */
    init() {
    }
  }
};
</script>

<style lang="scss" scoped>
$headHeight:8vh;
$mainHeight:100vh - $headHeight;
div.body {
  height: 100vh;
  div.head{
    height: $headHeight;
  }
  div.main {
    display: flex;
    width: 100%;
    height: $mainHeight;
    div.left {
      position: relative;
      display: inline-block;
      height: 100%;
    }
    div.right {
      display: inline-block;
      height: 100%;
      width: 100%;
      overflow: auto;
    }
  }
}
</style>
