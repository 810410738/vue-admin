<template>
  <el-row :gutter="2">
    <el-col :span="8">
          <el-button type="primary" size="small" plain @click="find('')">全部</el-button>
          <el-button type="success" size="small" plain @click="find('1')">已启用</el-button>
          <el-button type="danger" size="small" plain @click="find('0')">禁用</el-button>
        </el-col>
    <el-col :span="6">
      <el-input placeholder="请输入用户编号或姓名" v-model="findComponentData.keyword" size="small">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </el-col>
    <el-col :span="2">
      <el-button type="primary" size="small" @click="find(null)">查找</el-button>
    </el-col>
  </el-row>
</template>

<script>
import { getAllPrimaryClass, getAllSecoByPrim } from "@/api/getCommonData";
export default {
  components: {
    
  },
  data() {
    return {
      // 查找数据输入的文本
      findUserInput: "",
      // 查找组件封装数据
      findComponentData:{
        keyword:'',
        adminStatus:''
      }
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
     
    },
    /**
     * @description 点击查找用户信息，传参到父组件 
     */
    find(status){
      if(status!=null)
      {
        this.findComponentData.adminStatus = status;
      }
      this.$emit('find', this.findComponentData);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
