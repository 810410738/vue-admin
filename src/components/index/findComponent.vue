<template>
  <el-row :gutter="2">
    <el-col :span="8">
          <el-button type="primary" size="small" plain @click="find('')">全部</el-button>
          <el-button type="success" size="small" plain @click="find('1')">已启用</el-button>
          <el-button type="danger" size="small" plain @click="find('0')">禁用</el-button>
        </el-col>
    <el-col :span="4">
      <!-- 一级机构 -->
      <el-select size="small" @change="getAllSecoByPrimData" v-model="findComponentData.primaryClass">
        <el-option v-for="item in primaryClass" :key="item.label" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-col>
    <el-col :span="4">
      <!-- 二级机构 -->
      <el-select size="small" v-model="findComponentData.secondaryClass">
        <el-option v-for="item in secondClass" :key="item.label" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-col>
    <el-col :span="4">
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
        keyword:'',
        status:''
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
        this.primaryClass = this.primaryClass.concat(res.extend.classList);
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
      jsonData.selectedParam = value;
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
    find(status){
      if(status!=null)
      {
        this.findComponentData.status = status;
      }
      this.$emit('find', this.findComponentData);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
