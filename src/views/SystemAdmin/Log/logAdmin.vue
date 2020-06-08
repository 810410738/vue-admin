<template>
  <div>
    <h3 class="headTitle">日志管理</h3>
    <el-card class="primaryCard topCard">
      <!-- 搜索组件 -->
      <selfFindLogListComponent @find="find(arguments)"></selfFindLogListComponent>
    </el-card>
    <el-card class="primaryCard">
      <!-- 用户表格数据 -->
      <el-table :data="getLogData.records" highlight-current-row style="width: 100%" stripe>
        <el-table-column property="logNum" label="日志编号" width="150"></el-table-column>
        <el-table-column property="systemIdentify" label="系统标识" width="150"></el-table-column>
        <el-table-column property="type" label="操作类型" width="150">
          <template slot-scope="scope">
            <el-tag plain>{{scope.row.type}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column property="userName" label="操作人员" width="150"></el-table-column>
        <el-table-column property="department" label="部门" width="200"></el-table-column>
        <el-table-column label="状态" width="100">
          <template slot-scope="scope">
            <el-tag v-show="scope.row.status == '1'" type="success">成功</el-tag>
            <el-tag v-show="scope.row.status == '0'" type="danger">失败</el-tag>
          </template>
        </el-table-column>
        <el-table-column property="time" label="操作时间" width="200"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="success" plain size="mini" @click="checkMore(scope.row)" icon="el-icon-more">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <div class="Pagination" style="text-align: left;margin-top: 10px;">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="this.getLogData.current"
          :page-size="this.getLogData.size"
          layout="total, prev, pager, next"
          :page-count="this.getLogData.pages"
          :total="this.getLogData.total"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getLogData } from "@/api/systemAdmin/getSystemAdminData";
import { getFormData } from "@/api/getFormData";
import selfFindLogListComponent from "@/components/SystemAdmin/logAdmin/selfFindLogListComponent";
import selfGenerateForm from "@/components/Form/selfGenerateForm";
export default {
  data() {
    return {
      // 获取所有日志列表的请求数据
      requestAllLogData: {
        systemIdentify: ""
      },
      getLogData: {}
    };
  },
  components: {
    selfFindLogListComponent,
    selfGenerateForm
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      getLogData(this.requestAllLogData).then(res => {
        this.getLogData = res.extend.pageData;
      });
    },
    /**
     * @description 获取查找组件的数据，请求日志数据
     * @param arg[0].systemIdentify
     * @param arg[0].startTime
     * @param arg[0].endTime
     * @param arg[0].Status
     * @param arg[0].type
     * @param arg[0].userName
     */
    find(arg) {
      this.initData();
    }
  }
};
</script>

<style lang="scss" scoped>

</style>