<template>
  <el-row class="controlCard">
    <el-row :gutter="2">
      <el-col :span="5">
        <!-- 所有子系统 -->
        <selfFindSystemComponent ref="findSystem"></selfFindSystemComponent>
      </el-col>
      <el-col :span="5">
        <!-- 状态 -->
        <label>操作状态：</label>
        <el-select size="small" v-model="findComponentData.Status">
          <el-option
            v-for="item in roleStatusClass"
            :key="item.label"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>

      <el-col :span="5">
        <label>操作类型：</label>
        <el-select size="small" v-model="findComponentData.type">
          <el-option
            v-for="item in roleStatusClass"
            :key="item.label"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <label>操作人员:</label>
        <el-input placeholder v-model="findComponentData.userName" size="small">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="block">
          <label>操作时间:</label>
          <el-date-picker
            v-model="findComponentData.time"
            unlink-panels
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="small"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </div>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" size="mini" @click="find">查找</el-button>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
import {} from "@/api/getCommonData";
import selfFindSystemComponent from "@/components/SystemAdmin/selfFindSystemComponent";
export default {
  components: {
    selfFindSystemComponent
  },
  data() {
    return {
      // 角色状态
      roleStatusClass: [
        {
          label: "默认全部",
          value: ""
        },
        {
          label: "成功",
          value: "1"
        },
        {
          label: "失败",
          value: "0"
        }
      ],
      // 查找组件封装数据
      findComponentData: {
        systemIdentify: "",
        Status: "",
        type: "",
        userName:"",
        startTime:"",
        endTime:"",
        time:''
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
      this.findComponentData.systemIdentify = this.$refs.findSystem.getSystemIdentify();
      if(this.findComponentData.time == null || this.findComponentData.time == ''){
        this.findComponentData.startTime = '';
        this.findComponentData.endTime = '';
      }
      else{
        this.findComponentData.startTime = this.findComponentData.time[0];
        this.findComponentData.endTime = this.findComponentData.time[1];
      }
      this.$emit("find", this.findComponentData);
    }
  }
};
</script>

<style lang="scss" scoped>
.controlCard {
  .el-input {
    width: 15em;
  }
  .el-row:first-child {
    margin-bottom: 1em;
  }
}
</style>
