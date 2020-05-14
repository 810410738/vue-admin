<template>
  <div class="table_container">
    <h3 class="headTitle">权限管理</h3>
    <!-- 操作组件 -->
    <el-row>
      <!-- 查找操作组件 -->
      <el-col :span="14" :offset="10">
        <!-- 查找操作组件 -->
        <findComponent @find="find(arguments)"></findComponent>
      </el-col>
    </el-row>
    <!-- 用户表格数据 -->
    <el-table :data="getUserData.list" highlight-current-row style="width: 100%" stripe>
      <el-table-column type="index" width="100"></el-table-column>
      <el-table-column property="userNum" label="用户编号"></el-table-column>
      <el-table-column property="userName" label="用户姓名"></el-table-column>
      <el-table-column property="primaryClass" label="所在机构"></el-table-column>
      <el-table-column property="secondaryClass" label="所在网点"></el-table-column>
      <el-table-column property="roleName" label="系统角色"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" plain size="mini" @click="handleEdit(scope.row.userId)">分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="Pagination" style="text-align: left;margin-top: 10px;">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="this.getUserData.pageNumber"
        :page-size="this.getUserData.pageSize"
        layout="total, prev, pager, next"
        :page-count="this.getUserData.totalPage"
        :total="this.getUserData.totalRow"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import {
  getUserList,
  getUserInfo,
  getAllRoleExceptAdmin,
} from "@/api/getUserData";
import {updateUserRole} from "@/api/getSystemAdminData"
import findComponent from "@/components/index/findComponent";
export default {
  components: {
    findComponent
  },
  data() {
    return {
      // 所有角色列表
      roleList: [],
      // 获取的用户数据
      getUserData: {},
      // 请求用户数据的参数,pageNumber默认为1，其余参数默认为空
      requestData: {
        primaryClass: "",
        secondaryClass: "",
        keyword: "",
        pageNumber: "1"
      }
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      getUserList(this.requestData).then(res => {
        this.getUserData = res.extend.page;
      });
    },
    handleCurrentChange(val) {
      this.requestData.pageNumber = val;
      this.initData();
    },
    
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
h3 {
  font-style: normal;
  font-weight: normal;
  color: #696d73;
  margin-left: 20px;
}
.table_container {
  padding: 20px;
}
.editUserInfoForm {
  .el-input {
    width: 70%;
  }
  .el-select {
    width: 70%;
  }
}
</style>
