<template>
  <el-menu
    class="el-menu-vertical-demo"
    router
  >
    <el-submenu 
      v-for="item in filterAuthorityList" 
      :key="item.nodeId"
      :index="item.nodeId"
    >
      <template slot="title">
        <i :class="item.icon"></i>
        <span>{{item.nodeName}}</span>
      </template>
      <el-menu-item
        v-for="subItem in item.children"
        v-show="subItem.checked"
        :key="subItem.nodeId"
        :index="subItem.nodeUrl"
      >{{subItem.nodeName}}</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
import { findAuthorityByLoginRole } from "@/api/getCommonData";
export default {
  data() {
    return {
      authorityList: []
    };
  },
  created() {
    // TODO params
    // 获取菜单
    findAuthorityByLoginRole({}).then(response => {
      this.authorityList = response.extend.authorityList;
    });
  },
  methods: {},
  computed: {
    /**
     * @description 过滤一级菜单显示条件
     */
    filterAuthorityList() {
      return this.authorityList.filter(function(item) {
        return item.checked;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>