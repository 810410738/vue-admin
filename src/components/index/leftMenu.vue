<template>
  <div>
    <el-button size="mini" circle icon="el-icon-s-operation" @click="isCollapse = !isCollapse"></el-button>
    <el-menu
      class="el-menu-vertical-demo"
      router
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-submenu v-for="item in filterAuthorityList" :key="item.nodeId" :index="item.nodeId">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.nodeName}}</span>
        </template>
        <el-menu-item
          v-for="subItem in item.children"
          v-show="subItem.checked"
          :key="subItem.nodeId"
          :index="subItem.nodeUrl"
        >
          <template slot="title">
            <i :class="subItem.icon"></i>
            <span>{{subItem.nodeName}}</span>
          </template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import  MenuData  from "@/assets/JSON/Menu/menu.json";
export default {
  props: {
    isShowMenu: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      authorityList: [],
      // 控制菜单是否展开
      isCollapse: false
    };
  },
  created() {
    this.isCollapse = !this.isShowMenu;
    // 读取本地json配置，获取菜单
      this.authorityList = MenuData.authorityList;
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
div {
  background: #545c64;
  height: 100%;
  .el-button {
    margin-left: 10%;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
}
</style>