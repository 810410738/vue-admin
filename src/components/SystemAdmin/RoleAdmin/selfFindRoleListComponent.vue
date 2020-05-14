<template>
  <el-row :gutter="2">
    <el-col :span="6">
      <!-- 所有子系统 -->
      <label>子系统：</label>
      <el-select
        size="small"
        @change="getAllSecoByPrimData"
        v-model="findComponentData.systemIdentify"
      >
        <el-option
          v-for="item in systemIdentifyClass"
          :key="item.label"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-col>
    <el-col :span="6">
      <!-- 角色状态 -->
      <label>角色状态：</label>
      <el-select
        size="small"
        v-model="findComponentData.roleStatus"
      >
        <el-option
          v-for="item in roleStatusClass"
          :key="item.label"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-col>
    <el-col :span="6">
      <el-input placeholder="请输入角色名称或权限字符" v-model="findComponentData.keyword" size="small">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </el-col>
    <el-col :span="6">
      <el-button type="primary" size="mini" @click="find">查找</el-button>
    </el-col>
  </el-row>
</template>

<script>
import {} from "@/api/getCommonData";
export default {
  data() {
    return {
      // 查找数据输入的文本
      findUserInput: "",
      // 一级分类
      systemIdentifyClass: [
        {
          label: "默认全部",
          value: ""
        }
      ],
      // 角色状态
      roleStatusClass: [
        {
          label: "默认全部",
          value: ""
        },
         {
          label: "已启用",
          value: "1"
        },
         {
          label: "未启用",
          value: "0"
        },
      ],
      // 查找组件封装数据
      findComponentData: {
        systemIdentify: "",
        roleStatus: "",
        keyword: ""
      }
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      /**
       * @description 获取所有一级分类
       */
      // getAllPrimaryClass({}).then(res => {
      //   this.primaryClass = res.extend.classList;
      // });
    },
    /**
     * @description 点击查找用户信息，传参到父组件
     */
    find() {
      this.$emit("find", this.findComponentData);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
