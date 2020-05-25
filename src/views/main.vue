<template>
  <div>
    <headTop></headTop>
    <el-row style="height: 100%;">
      <el-col :span="4" style="min-height: 100%; background-color: #324057;">
        <!-- 左边菜单 -->
        <leftMenu></leftMenu>
      </el-col>
      <el-col :span="20" style="height: 100%;overflow: auto;">
        <!-- 主页面 -->
          <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import leftMenu from "@/components/index/leftMenu"
import headTop from "@/components/headTop";
import {setRequestParams} from "@/api/http";
export default {
  components: {
    leftMenu,
    headTop
  },
  created(){
    this.init();
  },
  methods: {
    /**
     * @description 初始化页面
     */
    init() {
      var systemIdentify = this.$route.query.systemIdentify;
      if(systemIdentify){

      }else{
        this.$router.push({
          path:'/error'
        });
      }
    }
  },
};
</script>


<style lang="scss" scoped>
</style>
