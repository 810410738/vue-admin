<template>
  <div class="manage_page fillcontain">
    <headTop></headTop>
    <el-row style="height: 100%;">
      <el-col :span="4" style="min-height: 100%; background-color: #324057;">
        <!-- 左边菜单 -->
        <leftMenu></leftMenu>
      </el-col>
      <el-col :span="20" style="height: 100%;overflow: auto;">
          <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import leftMenu from "@/components/index/leftMenu"
import headTop from "@/components/headTop";
export default {
  components: {
    leftMenu,
    headTop
  }
};
</script>


<style lang="scss" scoped>
</style>
