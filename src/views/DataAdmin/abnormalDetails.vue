<template>
  <div>
    <h3>员工异常行为排查清单</h3>
    <el-row>
      <!-- 查找操作组件 -->
      <el-col :span="2" :offset="1">
         <el-button size="small" type="info" plain @click="returnBack">返回</el-button>
      </el-col>
      <el-col :span="14" :offset="7">
        <!-- 查找操作组件 -->
        <findComponent @find="find(arguments)"></findComponent>
      </el-col>
    </el-row>
    <el-table :data="getUserData" highlight-current-row style="width: 100%" stripe>
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column property label="一级机构" ></el-table-column>
      <el-table-column property label="二级机构" ></el-table-column>
      <el-table-column property label="用户编号" ></el-table-column>
      <el-table-column property label="用户姓名"></el-table-column>
      <el-table-column label="用户角色">
        <template slot-scope="scope">
          <el-tag>{{scope.row.publishStatus}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column property label="主要排查内容"></el-table-column>
      <el-table-column property label="自查"></el-table-column>
      <el-table-column property label="他查"></el-table-column>
      <el-table-column property label="主要问题描述"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getQuestionnaires, endQuestionnaire } from "@/api/getQuestionData";
import { getDeptData } from "@/api/getDataAdminData";
import findComponent from "@/components/index/findComponent";
export default {
  components: {
    findComponent
  },
  created() {
    this.init();
  },
  data() {
    return {};
  },
  methods: {
    /**
     * @description 获取查找组件的数据，请求用户数据
     * @param arg[0].keyword
     * @param arg[0].primaryClass
     * @param arg[0].secondaryClass
     */
    find(arg) {
      this.requestData.keyword = arg[0].keyword;
      this.requestData.primaryClass = arg[0].primaryClass;
      this.requestData.secondaryClass = arg[0].secondaryClass;
      this.initData();
    },
    /**
     * @description 返回上一级
     */
    returnBack(){
      this.$router.push({
        path:'/index/abnormal'
      })
    },
    /**
     * @description 点击查看一位用户的异常作答详情
     */
    checkUserAnswerDetails(){
      
    }
  }
};
</script>


<style lang="scss" scoped>
</style>
