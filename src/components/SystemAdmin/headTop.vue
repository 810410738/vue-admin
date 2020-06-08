<template>
  <el-row class="header_container">
    <el-col :span="12">
      <img src="@/assets/img/logoWhite.png" />
      <!-- <span class="headTitle">中国建设银行 深圳市分行</span> -->
    </el-col>
    <el-col :span="2">
      <el-tag v-if="roleName != '普通用户'">{{roleName}}</el-tag>
    </el-col>
    <el-col :span="8">
      <el-tag
        class="userInfo"
      >{{loginUser.primaryClass}}-{{loginUser.secondaryClass}}-{{loginUser.userName}}</el-tag>
    </el-col>

    <el-col :span="2">
      <!-- <el-button plain type="info" size="small" @click="loginOut">退出</el-button> -->
      <el-popover placement="bottom-end" width="180" trigger="hover">
        <div class="control">
          <div class="buttonGroup">
            <el-button round size="small">个人信息</el-button>
            <el-button round size="small" @click="returnIndex">返回导航主页</el-button>
            <el-button round size="small" type="danger" @click="loginOut">退出系统</el-button>
          </div>
        </div>
        <el-button size="small" slot="reference" icon="el-icon-more-outline"></el-button>
      </el-popover>
    </el-col>
  </el-row>
</template>

<script>
import { baseImgPath } from "@/config/env";
import { logout, getLoginer } from "@/api/getCommonData";

export default {
  data() {
    return {
      baseImgPath,
      avaterPath: "avator.jpg",
      // 当前用户信息
      loginUser: {},
      // 角色类型名称
      roleName: ""
    };
  },
  created() {
    this.initData();
  },
  computed: {},
  methods: {
    /**
     * @description 初始获取数据
     */
    initData() {
      getLoginer({}).then(res => {
        this.loginUser = res.extend.loginUser;
        switch (res.extend.roleType) {
          case "0":
            this.roleName = "系统管理员";
            break;
          case "1":
            this.roleName = "普通管理员";
            break;
          case "2":
            this.roleName = "普通用户";
            break;
        }
      });
    },
    /**
     * @description 退出登录
     */
    loginOut() {
      logout({}).then(res => {
        // 删除本地的token
        localStorage.removeItem("authToken");
        // 跳转到登陆页面
        this.$router.push({
          path: "/"
        });
      });
    },
    /**
     * @description 返回导航主页
     */
    returnIndex() {
      // 跳转页面
      this.$router.push({
        path: "/index"
      });
    }
  }
};
</script>

<style lang="less" scoped>
// @import "../style/mixin";
.header_container {
  background-color: #28303a;
  padding: 10px;
}
img {
  // width: 40px;
  height: 35px;
  vertical-align: middle;
}
.headTitle {
  color: white;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
  font-size: 20px;
}
.leftHead {
  display: inline-block;
}
.rightHead {
  display: inline-block;
  margin-left: 75%;
}
.userInfo {
  margin: 0 auto 0 auto;
}

div.control {
  width: 13em;
  // height: 100%;
  div.buttonGroup {
    width: 10em;
    margin: 0 auto;
    .el-button {
      display: block;
      margin: 0 0 0.5em 0;
      width: 10em;
      text-align: center;
    }
  }
}
</style>
