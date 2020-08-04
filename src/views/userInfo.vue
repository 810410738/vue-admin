<template>
  <div>
    <h3 class="headTitle">个人信息维护</h3>
    <el-card class="primaryCard firstRow">
      <el-row>
        <el-button type="info" size="small" @click="returnBack">返回主页</el-button>
        <el-button type="primary" size="small" @click="showCardTab='userInfo'">修改个人信息</el-button>
        <el-button type="warning" size="small" @click="showCardTab='password'">修改密码</el-button>
      </el-row>
    </el-card>
      <el-card class="primaryCard" v-show="showCardTab=='userInfo'">
        <selfGenerateForm
          :formJson="checkUserSelfFormData"
          ref="checkUserSelfForm"
          @submit="editUserInfoSubmit(arguments)"
        ></selfGenerateForm>
      </el-card>
      <el-card class="primaryCard" v-show="showCardTab=='password'">
        <selfGenerateForm
          :formJson="updatePasswordFormData"
          ref="updatePasswordForm"
          @submit="updatePasswordSubmit(arguments)"
        ></selfGenerateForm>
      </el-card>
  </div>
</template>

<script>
import {
logout,
updatePI,
updatePwd
} from "@/api/getCommonData";
import { b64_md5 } from "@/util/MD5";
// 表单配置数据的json
import checkUserSelfFormJson from "@/assets/JSON/User/checkAdminUserSelfForm";
import updatePasswordFormJson from "@/assets/JSON/User/updatePasswordForm";

import selfGenerateForm from "@/components/SystemAdmin/Form/selfGenerateForm";
export default {
  components: {
    selfGenerateForm,
  },
  data() {
    return {
      checkUserSelfFormData: {},
      updatePasswordFormData: {},
      showCardTab: "userInfo",
    };
  },
  created() {
    this.initData();
  },
  methods: {
    /**
     * @description
     */
    initData() {
      // 获取表单配置数据
      this.checkUserSelfFormData = checkUserSelfFormJson;
      this.updatePasswordFormData = updatePasswordFormJson;
      this.$nextTick(()=>{
        // 获取用户信息，并返显
        this.$refs.checkUserSelfForm.setFormData(this.$store.state.loginUser);
      })
       
    },
    /**
     * 提交修改的事件
     */
    editUserInfoSubmit(arg) {
      var jsonData = {};
      for (var key in arg[0]) {
        jsonData[key] = arg[0][key];
      }
      jsonData.adminId = this.$store.state.loginUser.adminId;
      updatePI(jsonData).then(res=>{
        this.$message.success('修改个人信息成功,请重新登录');
        this.loginOut();
      }); 
    },
    /**
     * 提交修改密码的事件
     */
    updatePasswordSubmit(arg){
      var jsonData = {};
      for (var key in arg[0]) {
        jsonData[key] = arg[0][key];
      }
      jsonData.oldPwd = b64_md5(jsonData.oldPwd);
      jsonData.newPwd = b64_md5(jsonData.newPwd);
      jsonData.adminId = this.$store.state.loginUser.adminId;
      updatePwd(jsonData).then(res=>{
        this.$message.success('修改密码成功,请重新登录');
        this.loginOut();
      }); 
    },
    /**
     * 退出登录，返回登录页面
     */
    loginOut() {
      logout({}).then(res => {
        // 删除本地的token
        localStorage.removeItem("tokenId");
        // 跳转到登陆页面
        this.$router.push({
          path: "/"
        });
      });
    },
    /**
     * 返回主页
     */
    returnBack() {
      this.$router.push({
        path: "/main",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.firstRow {
  margin-bottom: 1em;
}
// 控制动画
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.v-leave-active {
  position: absolute;
}
</style>
