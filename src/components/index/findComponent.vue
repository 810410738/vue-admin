<template>
  <el-row :gutter="2">
    <el-col :span="6">
      <!-- 一级机构 -->
      <el-select size="mini" @change="getAllSecoByPrimData" v-model="findComponentData.primaryClass">
        <el-option v-for="item in primaryClass" :key="item.label" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-col>
    <el-col :span="6">
      <!-- 二级机构 -->
      <el-select size="mini" v-model="findComponentData.secondaryClass">
        <el-option v-for="item in secondClass" :key="item.label" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-col>
    <el-col :span="6">
      <el-input placeholder="请输入用户编号或姓名" v-model="findComponentData.keyword" size="mini">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </el-col>
    <el-col :span="6">
      <el-button type="primary" size="mini" @click="find">查找</el-button>
    </el-col>
  </el-row>
</template>

<script>
import { getAllPrimaryClass, getAllSecoByPrim } from "@/api/getCommonData";
export default {
  data() {
    return {
      // 查找数据输入的文本
      findUserInput: "",
      // 一级分类
      primaryClass: [
        {
          label:'默认全部',
          value:''
        }
      ],
      // 二级分类
      secondClass: [
         {
          label:'默认全部',
          value:''
        }
      ],
      // 查找组件封装数据
      findComponentData:{
        primaryClass:'',
        secondaryClass:'',
        keyword:''
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
      getAllPrimaryClass({}).then(res => {
        this.primaryClass = res.extend.classList;
      });
    },
    /**
     * @description 获取所有二级分类
     */
    getAllSecoByPrimData(value) {
      // 重置
      this.secondClass=[
         {
          label:'默认全部',
          value:''
        }
      ];
      this.findComponentData.secondaryClass = '';
      // 获取数据
      var jsonData = {};
      jsonData.primaryClass = value;
      getAllSecoByPrim(jsonData).then(res => {
         this.secondClass =  this.secondClass.concat(res.extend.classList);
        for(var i in resultList){
          this.secondClass.push({
            label:resultList[i],
            value:resultList[i]
          })
        }
      });
    },
    /**
     * @description 点击查找用户信息，传参到父组件 
     */
    find(){
      this.$emit('find', this.findComponentData);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
