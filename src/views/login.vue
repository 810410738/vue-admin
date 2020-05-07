<template>
  <div class="login-bg">
    <div class="login-wrapper">
      <a class="logo">
        <el-image style="width: 20%; height: 20%" :src="url"></el-image>
      </a>
      <div class="box">
        <div class="content-wrap">
          <h6>员工排查信息系统</h6>
          <el-input
            @keyup.enter.native="login()"
            id="userName"
            type="text"
            placeholder="请输入用户名"
            v-model="userName"
          />
          <el-input
            @keyup.enter.native="login()"
            id="password"
            type="password"
            placeholder="请输入密码"
            v-model="password"
          />
          <el-button
            id="loginBtn"
            type="primary"
            :loading="loadingFlag"
            @click="login()"
          >{{loginButtonText}}</el-button>
        </div>
      </div>
    </div>
    <el-row class="footContainer">
      <span class="foot">请使用火狐浏览器或谷歌浏览器打开</span>
    </el-row>
  </div>
</template>
 
<script>
import { toLogin } from "@/api/getCommonData";
import {b64_md5} from "@/util/MD5";
export default {
  data() {
    return {
      url: require("@/assets/img/logo-white.png"),
      userName: "",
      password: "",
      tips: "",
      loginButtonText: "登陆",
      loadingFlag: false,
      responseData: ""
    };
  },
  created(){
    
  },
  methods: {
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
      params.account = this.userName;
      // 超级管理员的密码加密传输
      if(this.userName == "admin"){
        params.password = b64_md5(this.password);
      }
      else{
        params.password = this.password;
      }
      toLogin(params).then(response => {
        this.loginSuccess(response);
      });
    },
    loginSuccess() {
      this.$router.push({
        path: "/index"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login-bg {
  background: url("../assets/img/bgs/landscape.jpg") no-repeat center center;
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
  
}
.login-wrapper .logo {
  margin-bottom: 45px;
  position: relative;
  left: -2px;
}
.login-wrapper .box {
  margin: 45px auto 0 auto;
  padding: 35px 0 30px;
  float: none;
  width: 400px;
  box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.65);
}
.login-wrapper .box .content-wrap {
  width: 82%;
  margin: 0 auto;
}
.login-wrapper .box h6 {
  text-transform: uppercase;
  margin: 0 0 30px 0;
  font-size: 18px;
  font-weight: 600;
}
.login-wrapper .box input[type="text"],
.login-wrapper .box input[type="password"] {
  font-size: 15px;
  height: 40px;
  margin-bottom: 18px;
  border-color: #b2bfc7;
  padding-left: 12px;
}

.login-wrapper .box .login {
  text-transform: uppercase;
  font-size: 13px;
  padding: 8px 30px;
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
.el-input {
  margin-top: 5px;
}
#loginBtn {
  margin-top: 10px;
}
.footContainer {
  margin-top: 280px;
  text-align: center;
  span.foot {
    color: white;
  }
}
</style>