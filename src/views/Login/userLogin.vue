<template>
  <div class="login-bg">
    <div class="login-wrapper">
      <a class="logo">
        <el-image style="width: 20%; height: 20%" :src="url"></el-image>
      </a>
      <div class="box">
        <div class="content-wrap">
          <h6>请登陆</h6>
          <el-row>
            <el-input
              @keyup.enter.native="login()"
              id="userName"
              type="text"
              placeholder="请输入用户名"
              v-model="userName"
            />
          </el-row>
          <el-row>
            <el-input
              @keyup.enter.native="login()"
              id="password"
              type="password"
              placeholder="请输入密码"
              v-model="password"
            />
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-button
                id="loginBtn"
                type="primary"
                :loading="loadingFlag"
                @click="login()"
              >{{loginButtonText}}</el-button>
            </el-col>
            <el-col :span="6">
              <el-button type="text" @click="adminEnter">管理员入口</el-button>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <el-row class="footContainer">
      <span class="foot">请使用火狐浏览器或谷歌浏览器打开</span>
    </el-row>
  </div>
</template>
 
<script>
import { setHeader } from "@/api/http.js";
import { toLogin } from "@/api/getCommonData";
export default {
  data() {
    return {
      url: require("@/assets/img/logo-black.png"),
      userName: "",
      password: "",
      tips: "",
      loginButtonText: "登陆",
      loadingFlag: false,
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
      if (localStorage.getItem("loginAccount")) {
        this.userName = localStorage.getItem("loginAccount");
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
       params.loginPassword = this.password;
      toLogin(params).then(response => {
        this.loginSuccess(response);
      });
    },
    loginSuccess(response) {
      // 把token保存到localStorage
      localStorage.setItem("authToken", response.extend.tokenId);
      // 把账号保存到localStorage
      localStorage.setItem("loginAccount", this.userName);
      this.$router.push({
        path: "/userIndex"
      });
    },
    /**
     * 跳转到管理员登陆入口
     */
    adminEnter() {
      this.$router.push({
        path:"/"
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.login-bg {
  background: url("../../assets/img/bgs/landscape.jpg") no-repeat center center;
  width: 100%;
  height: 100%;
  position: fixed;
}
#loginTips {
  color: red;
}
.login-wrapper {
  /* position: absolute; */
  margin-top: 90px;
  text-align: center;
  .logo {
    margin-bottom: 45px;
    position: relative;
    left: -2px;
  }
  .box {
    margin: 45px auto 0 auto;
    padding: 35px 0 30px;
    float: none;
    width: 400px;
    box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.65);
    .content-wrap {
      width: 82%;
      margin: 0 auto;
    }
    h6 {
      text-align: left;
      text-transform: uppercase;
      margin: 0 0 30px 0;
      font-size: 20px;
      font-weight: 600;
    }
    .el-input {
      margin-bottom: 10px;
    }
    #loginBtn {
      // margin-top: 10px;
      width: 17.5em;
    }
  }
}

/* responsive */
@media (max-width: 767px) {
  .login-wrapper .box {
    width: 350px;
  }
}
@media (max-width: 480px) {
  .login-wrapper .box {
    width: 90%;
  }
}
.footContainer {
  margin-top: 280px;
  text-align: center;
  span.foot {
    color: white;
  }
}
</style>