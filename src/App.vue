<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import { setRequestParams } from "@/api/http";
export default {
  created() {
    this.changeSystemIdentify();
  },
  methods: {
    changeSystemIdentify() {
      if (this.$route.query.systemIdentify) {
        setRequestParams("systemIdentify", this.$route.query.systemIdentify);
      }
    }
  },
  watch: {
    // 当路由发生变化，重新设置请求参数systemIdentify
    $route(to, from) {
      this.changeSystemIdentify();
    }
  }
};
</script>
<style lang="scss" scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
</style>
