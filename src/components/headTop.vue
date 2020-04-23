<template>
  <el-row class="header_container">
    <el-col  :span="12">
      <img src="@/assets/img/logo-white_logo.png"/>  
      <span class="headTitle">中国建设银行 深圳市分行</span>
    </el-col>
    <el-col :span="2">
      <el-tag v-if="roleName != '普通用户'"> {{roleName}}</el-tag>
    </el-col>
    <el-col :span="8">
      <el-tag class="userInfo"> {{loginUser.primaryClass}}-{{loginUser.secondaryClass}}-{{loginUser.userName}} </el-tag>
    </el-col> 
   
    <el-col :span="2">
      <el-button plain type="info" size="small" @click="loginOut">退出</el-button>
    </el-col>
   
    
        
  </el-row>
</template>

<script>
import { baseImgPath } from "@/config/env";
import {logout,getLoginer} from "@/api/getCommonData";

export default {
  data() {
    return {
      baseImgPath,
      avaterPath:'avator.jpg',
      // 当前用户信息
      loginUser:{},
      // 角色类型名称
      roleName:''
    };
  },
  created() {
    this.initData();
  },
  computed: {
  },
  methods: {
    /**
     * @description 初始获取数据
     */
    initData(){
      getLoginer({}).then(res=>{
        this.loginUser = res.extend.loginUser;
        switch(res.extend.roleType){
          case '0':
            this.roleName = '系统管理员';break;
          case '1':
            this.roleName = '普通管理员';break;
          case '2':
            this.roleName = '普通用户';break;
        }
      })
    },
    /**
     * @description 退出登录
     */
    loginOut(){
      logout({}).then(res=>{
        this.$router.push({
          path:'/'
        });
      });
    }
  }
};
</script>

<style lang="less" scoped>
// @import "../style/mixin";
.header_container {
  background-color: #28303a;
  padding:10px;
}
img{
  width: 40px;
  height: 40px;
  vertical-align: middle;
}
.headTitle{
  color: white;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
  font-size: 20px;
}
.leftHead{
  display: inline-block;
}
.rightHead{
  display: inline-block;
  margin-left: 75%;
}
.userInfo{
  margin: 0 auto 0 auto;
}

</style>
