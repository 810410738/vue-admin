<template>
  <!-- 
  后台管理系统的登录页面
  -->
  <div class="body">
    <div class="main">
      <h3 class="title">深圳建行行内系统后台管理入口</h3>
      <div class="tips">请使用管理账号登录</div>
      <div class="form-group">
        <el-input
          @keyup.enter.native="login()"
          type="text"
          placeholder="请输入用户名"
          v-model="userName"
        />
      </div>
      <div class="form-group">
        <el-input
          @keyup.enter.native="login()"
          type="password"
          placeholder="请输入密码"
          v-model="password"
        />
      </div>
      <div class="form-group">
        <el-button class="loginButton" @click="login">登 录</el-button>
      </div>
      <div class="form-check">
        <el-checkbox v-model="isRemember">记住账号</el-checkbox>
        <el-button type="text" @click="userLogin">普通用户登陆</el-button>
      </div>
    </div>
  </div>
</template>
 
<script>
import { setHeader } from "@/api/http.js";
import { toLogin } from "@/api/getCommonData";
import { b64_md5 } from "@/util/MD5";
export default {
  data() {
    return {
      url: require("@/assets/img/logo-black.png"),
      // 是否记住密码的标志
      isRemember: true,
      userName: "",
      password: "",
      responseData: ""
    };
  },
  created() {
    this.init();
  },
  watch: {
    $route(to, from) {
      this.init();
    }
  },
  methods: {
    /**
     * @description 初始化页面
     */
    init() {
      if (this.$route.query.message == "notLogin") {
        this.$message({
          type: "warning",
          message: "请登陆"
        });
      }
      // 显示已保存的账号
      if (localStorage.getItem("adminLoginAccount")) {
        this.userName = localStorage.getItem("adminLoginAccount");
      }
    },
    // 清求登陆接口
    login() {
      if (this.userName == "") {
        this.$message({
          message: "用户名不可以为空",
          type: "error"
        });
        return false;
      }
      if (this.password == "") {
        this.$message({
          message: "请输入密码！",
          type: "error"
        });
        return false;
      }
      var params = {};
      params.loginAccount = this.userName;
      // 管理员的密码加密传输
      params.loginPassword = b64_md5(this.password);
      toLogin(params).then(response => {
        this.loginSuccess(response);
      });
    },
    loginSuccess(response) {
      // 把token保存到localStorage
      localStorage.setItem("authToken", response.extend.tokenId);
      // 把账号保存到localStorage
      if (this.isRemember) {
        localStorage.setItem("adminLoginAccount", this.userName);
      } else {
        localStorage.removeItem("adminLoginAccount");
      }
      // 跳转页面
      this.$router.push({
        path: "/main"
      });
    },
    /**
     * 普通用户登陆入口
     */
    userLogin() {
      this.$router.push({
        path: "/userLogin"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
$elementHeight: 50px;
div.body {
  width: 100%;
  height: 100%;
  position: fixed;
  background: #f2edf3;
  div.main {
    background: #ffffff;
    margin: 3em auto 0 auto;
    padding: 2.5em;
    width: 20%;
    height: 50%;
    .title {
      margin-bottom: 0.3em;
    }
    .tips {
      margin-bottom: 2.5em;
    }
    div.form-group {
      margin: 1.5em 0;
      .el-input__inner {
        height: $elementHeight;
      }
      .loginButton {
        height: $elementHeight;
        width: 100%;
        font-size: 20px;
        font-weight: bold;
        color: #ffffff;
        background: linear-gradient(to right, #da8cff, #9a55ff);
      }
    }
    div.form-check{
      .el-button{
        margin-left: 10em;
      }
    }
  }
}
</style>