<template>
  <div>
    <h3>数据管理-数据排查</h3>
    <el-row>
      <el-col :span="2" :offset="1">
        <el-button type="warning" size="small" >数据导出</el-button>
      </el-col>
      <!-- 查找操作组件 -->
      <el-col :span="14" :offset="7">
        <!-- 查找操作组件 -->
        <findComponent @find="find(arguments)"></findComponent>
      </el-col>
    </el-row>
    <el-table :data="getUserData" highlight-current-row style="width: 100%" stripe>
      <el-table-column property="" label="用户姓名" width="350"></el-table-column>
      <el-table-column property="" label="用户编号" width="150"></el-table-column>
      <el-table-column property="" label="归属机构" width="200"></el-table-column>
      <el-table-column label="用户角色" width="150">
        <template slot-scope="scope">
          <el-tag>{{scope.row.publishStatus}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="完成状态">
        <template slot-scope="scope">
            <el-tag>{{scope.row.publishStatus}}</el-tag>
        </template>
      </el-table-column>
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
    }
  }
};
</script>


<style lang="scss" scoped>
</style>
