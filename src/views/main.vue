<template>
  <div>
    <headTop></headTop>
    <div class="body">
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
import headTop from "@/components/headTop";
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
      var systemIdentify = this.$route.query.systemIdentify;
      if (systemIdentify) {
      } else {
        this.$router.push({
          path: "/error"
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
div.body {
  display: flex;
  width: 100%;
  height: 90vh;
  div.left {
    position: relative;
    display: inline-block;
    height: 100%;
  }
  div.right {
    display: inline-block;
    width: 100%;
  }
}
</style>
