<template>
  <div class="table_container">
    <h3 class="headTitle">用户角色分配</h3>
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
    <!-- 修改用户角色的对话框 -->
    <el-dialog title="修改用户角色" :visible.sync="dialogVisible" width="30%">
      <el-form :model="form" class="editUserInfoForm">
        <el-form-item label="用户编号">
          <el-input v-model="form.userNum" autocomplete="off" disabled size="small"></el-input>
        </el-form-item>
        <el-form-item label="用户姓名">
          <el-input v-model="form.userName" autocomplete="off" disabled size="small"></el-input>
        </el-form-item>
        <el-form-item label="所属机构">
          <el-input v-model="form.primaryClass" autocomplete="off" disabled size="small"></el-input>
        </el-form-item>
        <el-form-item label="所在网点">
          <el-input v-model="form.secondaryClass" autocomplete="off" disabled size="small"></el-input>
        </el-form-item>
        <el-form-item label="用户角色">
          <el-select v-model="form.roleId" placeholder="请选择用户角色" size="small">
            <el-option
              v-for="item in roleList"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateUserRoleData">确 定</el-button>
      </div>
    </el-dialog>

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
      // 控制对话框是否可见
      dialogVisible: false,
      // 一位用户表单的数据
      form: {},
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
     * @description 点击修改按钮，获取数据，弹出对话框
     */
    handleEdit(userId) {
      var jsonData = {};
      jsonData.userId = userId;
      // 根据用户id获取用户信息
      getUserInfo(jsonData).then(res => {
        this.form = res.extend.user;
      });
      // 获取所有角色
      getAllRoleExceptAdmin({}).then(res => {
        this.roleList = res.extend.roleList;
      });
      // 显示修改用户信息的对话框
      this.dialogVisible = true;
    },
    /**
     * @description 请求接口，修改用户角色
     */
    updateUserRoleData() {
      this.$confirm("确定要修改该用户的角色吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        var jsonData = {};
        jsonData.userId = this.form.userId;
        jsonData.roleId = this.form.roleId;
        updateUserRole(jsonData).then(res => {
          // 请求成功后关闭对话框，弹出提示
          this.dialogVisible = false;
          this.$message({
            message: "修改角色成功",
            type: "success"
          });
            // 重新获取用户列表，相当于刷新
          this.initData();
        });
      });
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
