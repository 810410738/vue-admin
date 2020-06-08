<template>
  <!-- 
  后天管理系统的左侧菜单
  -->
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
export default {
  data() {
    return {
      // 菜单内容
      authorityList: [
        {
          nodeId: "1",
          nodeName: "系统管理",
          nodeUrl: "",
          checked: true,
          chkDisable: false,
          icon: "",
          nodeUrl: "",
          children: [
            {
              nodeId: "2",
              nodeName: "用户管理",
              nodeUrl: "",
              checked: true,
              chkDisable: false,
              icon: "el-icon-user",
              nodeUrl: "/main/userList",
              children: [
                {
                  nodeId: "21",
                  nodeName: "用户管理",
                  nodeUrl: "",
                  checked: true,
                  chkDisable: false,
                  icon: "el-icon-user",
                  nodeUrl: "/main/userList"
                }
              ]
            },
            {
              nodeId: "41",
              nodeName: "表单设计",
              checked: true,
              nodeUrl: "/main/DesignFormList",
              icon: "el-icon-s-order"
            },
            {
              nodeId: "42",
              nodeName: "角色管理",
              checked: true,
              nodeUrl: "/main/roleAuthorityAdmin",
              icon: "el-icon-picture-outline-round"
            },
            {
              nodeId: "43",
              nodeName: "权限管理",
              checked: true,
              nodeUrl: "/main/authorityAdmin",
              icon: "el-icon-open"
            },
            {
              nodeId: "44",
              nodeName: "日志管理",
              checked: true,
              nodeUrl: "/main/logAdmin",
              icon: "el-icon-postcard"
            }
          ]
        }
      ],
      // 控制菜单是否展开
      isCollapse: false
    };
  },
  created() {},
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