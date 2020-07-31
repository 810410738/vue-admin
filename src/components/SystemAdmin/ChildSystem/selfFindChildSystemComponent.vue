<template>
  <el-row :gutter="2">
    <el-col :span="6">
      <el-button size="small" plain type="primary" @click="find('')">全部</el-button>
      <el-button size="small" plain type="success" @click="find('1')">已启用</el-button>
      <el-button size="small" plain type="danger" @click="find('0')">未启用</el-button>
    </el-col>
    <el-col :span="6">
      <el-input placeholder="请输入子系统编码或名称" v-model="findComponentData.keyword" size="small">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </el-col>
    <el-col :span="2">
      <el-button type="primary" size="mini" @click="find('')">查找</el-button>
    </el-col>
  </el-row>
</template>

<script>
import {} from "@/api/getCommonData";
export default {
  components: {
    
  },
  data() {
    return {
      // 查找组件封装数据
      findComponentData: {
        systemStatus: "",
        keyword: ""
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
    find(systemStatus) {
      this.findComponentData.systemStatus = systemStatus;
      this.$emit("find", this.findComponentData);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
