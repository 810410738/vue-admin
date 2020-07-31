<template>
  <div>
    <h3 class="headTitle">管理员信息</h3>
    <!-- 操作组件 -->
    <el-card class="primaryCard topCard">
      <el-row>
        <!-- 查找操作组件 -->
        <AdminUserFindComponent @find="find(arguments)"></AdminUserFindComponent>
      </el-row>
    </el-card>
    <!-- 用户表格数据 -->
    <el-card class="primaryCard">
      <el-row>
        <el-button
          class="button-middle"
          type="primary"
          size="small"
          @click="addUserDialogVisible = true"
          icon="el-icon-plus"
        >新增</el-button>
      </el-row>
      <el-table :data="getUserData.records" highlight-current-row stripe>
        <el-table-column type="index" width="80"></el-table-column>
        <el-table-column property="adminNum" label="管理员编号" width="100"></el-table-column>
        <el-table-column property="adminName" label="管理员姓名" width="100"></el-table-column>
        <el-table-column property="primaryClass" label="所属机构" width="150"></el-table-column>
        <el-table-column property="secondaryClass" label="所在单位" width="150"></el-table-column>
        <el-table-column property="loginAccount" label="登陆账号" width="150"></el-table-column>
        <el-table-column property="modifyTime" label="修改时间" width="150"></el-table-column>
        <el-table-column property="adminStatus" label="用户状态" width="100">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.userStatus"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="1"
              inactive-value="0"
              @change="changeUserStatus($event, scope.$index, scope.row.adminId)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="450">
          <template slot-scope="scope">
            <el-button
              type="primary"
              plain
              size="mini"
              icon="el-icon-more"
              @click="checkMore(scope.row)"
            >查看更多</el-button>
            <el-button
              type="success"
              plain
              size="mini"
              icon="el-icon-edit"
              @click="editUserInfo(scope.row)"
            >编辑</el-button>
            <el-button
              type="warning"
              plain
              size="mini"
              icon="el-icon-edit"
              @click="resetPassword(scope.row.adminId)"
            >重置密码</el-button>
            <el-button
              type="danger"
              plain
              size="mini"
              icon="el-icon-delete"
              @click="deleteUser(scope.row.adminId)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <div class="Pagination" style="text-align: left;margin-top: 10px;">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="this.getUserData.current"
          :page-size="this.getUserData.size"
          layout="total, prev, pager, next"
          :page-count="this.getUserData.pages"
          :total="this.getUserData.total"
        ></el-pagination>
      </div>
    </el-card>
    <!-- 新增用户的对话框 -->
    <el-dialog
      title="新增管理员"
      :visible.sync="addUserDialogVisible"
      width="30%"
      :destroy-on-close="true"
      center
    >
      <selfGenerateForm :formJson="addUserFormData" @submit="addUserSubmit(arguments)"></selfGenerateForm>
    </el-dialog>
    <!-- 查看用户的对话框 -->
    <el-dialog
      title="查看管理员信息"
      :visible.sync="checkUserDialogVisible"
      width="30%"
      :destroy-on-close="true"
      center
    >
      <selfGenerateForm :formJson="checkUserFormData" ref="checkUserFrom"></selfGenerateForm>
    </el-dialog>
    <!-- 编辑用户的对话框 -->
    <el-dialog
      title="修改管理员信息"
      :visible.sync="editUserDialogVisible"
      width="30%"
      :destroy-on-close="true"
      center
    >
      <selfGenerateForm
        :formJson="editUserFormData"
        ref="editUserFrom"
        @submit="editUserSubmit(arguments)"
      ></selfGenerateForm>
    </el-dialog>
    <!-- 重置密码的对话框 -->
    <el-dialog
      title="重置密码"
      :visible.sync="resetPasswordDialogVisible"
      width="30%"
      :destroy-on-close="true"
      center
    >
      <selfGenerateForm
        :formJson="resetPasswordFormData"
        ref="resetPasswordForm"
        @submit="resetPasswordSubmit(arguments)"
      ></selfGenerateForm>
    </el-dialog>
  </div>
</template>

<script>
import {
  edit,
  deleteById,
  getById,
  getByPage,
  updateStatus,
  updateLoginPassword,
} from "@/api/systemAdmin/getAdminUserData";
// 表单配置数据的json
import addAdminUserFormJson from "@/assets/JSON/User/addAdminUserForm";
import editAdminUserFormJson from "@/assets/JSON/User/editAdminUserForm";
import checkAdminUserFormJson from "@/assets/JSON/User/checkAdminUserForm";
import resetPasswordFormJson from "@/assets/JSON/User/resetPasswordForm";

import AdminUserFindComponent from "@/components/SystemAdmin/AdminUser/AdminUserFindComponent";
import selfGenerateForm from "@/components/SystemAdmin/Form/selfGenerateForm";
export default {
  components: {
    AdminUserFindComponent,
    selfGenerateForm,
  },
  data() {
    return {
      // 用户表单的配置数据
      addUserFormData: {},
      checkUserFormData: {},
      editUserFormData: {},
      resetPasswordFormData: {},
      // 获取的用户数据
      getUserData: {},
      // 分页请求用户数据的参数,pageNumber默认为1，其余参数默认为空
      requestData: {
        primaryClass: "",
        secondaryClass: "",
        // 用户编号或名称
        keyword: "",
        // 当前指定页数
        pageNumber: "1",
        // 系统唯一标识
        systemIdentify: "",
      },
      // 控制新增用户的对话框是否出现
      addUserDialogVisible: false,
      checkUserDialogVisible: false,
      editUserDialogVisible: false,
      resetPasswordDialogVisible: false,
    };
  },
  created() {
    this.initData();
  },
  methods: {
    /**
     * @description 初始化分页获取用户数据
     */
    initData() {
      getByPage(this.requestData).then((res) => {
        this.getUserData = res.extend.pageData;
      });
      this.addUserFormData = addAdminUserFormJson;
      this.checkUserFormData = checkAdminUserFormJson;
      this.editUserFormData = editAdminUserFormJson;
      this.resetPasswordFormData = resetPasswordFormJson;
    },
    /**
     * @description 翻页，获取分页用户数据
     */
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
      this.requestData.systemIdentify = arg[0].systemIdentify;
      this.initData();
    },
    /**
     * @description 改变用户状态
     * @param $event 改变后的用户状态值 （0，1）
     * @param index 用户信息的索引，代表第几个用户
     * @param adminId 用户id
     */
    changeUserStatus($event, index, adminId) {
      this.$confirm("请问确定要修改用户状态吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          // 请求修改用户状态接口
          var jsonData = {};
          jsonData.userStatus = $event;
          jsonData.adminId = adminId;
          updateStatus(jsonData).then((res) => {
            // 弹出成功提示
            this.$message({
              message: "修改用户状态成功",
              type: "success",
            });
            // 刷新数据
            this.initData();
          });
        })
        .catch(() => {
          // 恢复状态为未修改之前的
          this.getUserData.records[index].userStatus = $event == "1" ? "0" : "1";
        });
    },
    /**
     * @description 点击查看更多，显示用户信息的对话框
     * @param row 用户信息组
     */
    checkMore(row) {
      this.checkUserDialogVisible = true;
      this.$nextTick(() => {
        this.$refs.checkUserFrom.setFormData(row);
      });
    },
    /**
     * @description 点击编辑按钮，显示用户信息的对话框
     * @param row 用户信息组
     */
    editUserInfo(row) {
      this.editUserDialogVisible = true;
      this.$nextTick(() => {
        this.$refs.editUserFrom.setFormData(row);
        this.$refs.editUserFrom.setParams("adminId", row.adminId);
      });
    },
    resetPassword(adminId) {
      this.resetPasswordDialogVisible = true;
      this.$nextTick(() => {
        this.$refs.resetPasswordForm.setParams("adminId", adminId);
      });
    },
    /**
     * @description 删除用户
     * @param adminId 用户id
     */
    deleteUser(adminId) {
      this.$confirm("请问确定要删除该用户吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      }).then(() => {
        // 请求删除用户接口
        var jsonData = {};
        jsonData.adminId = adminId;
        deleteById(jsonData).then((res) => {
          // 弹出成功提示
          this.$message({
            message: "删除成功",
            type: "success",
          });
          // 刷新数据
          this.initData();
        });
      });
    },
    /**
     * @description 提交新增用户的请求
     * @param arg[0] 包含表单所有元素的值的对象
     */
    addUserSubmit(arg) {
      var jsonData = {};
      for (var key in arg[0]) {
        jsonData[key] = arg[0][key];
      }
      edit(jsonData).then((res) => {
        this.$message({
          type: "success",
          message: "新增用户成功",
        });
        // 刷新数据
        this.initData();
        this.addUserDialogVisible = false;
      });
    },
    /**
     * @description 提交修改用户信息的请求
     * @param arg[0] 包含表单所有元素的值的对象
     */
    editUserSubmit(arg) {
      var jsonData = {};
      for (var key in arg[0]) {
        jsonData[key] = arg[0][key];
      }
      jsonData.adminId = this.$refs.editUserFrom.getParams("adminId");
      edit(jsonData).then((res) => {
        this.$message({
          type: "success",
          message: "修改用户信息成功",
        });
        // 刷新数据
        this.initData();
        this.editUserDialogVisible = false;
      });
    },
    /**
     * @description 提交重置密码的请求
     * @param arg[0] 包含表单所有元素的值的对象
     */
    resetPasswordSubmit(arg){
      var jsonData = {};
      for (var key in arg[0]) {
        jsonData[key] = arg[0][key];
      }
      jsonData.adminId = this.$refs.resetPasswordForm.getParams("adminId");
      updateLoginPassword(jsonData).then((res) => {
        this.$message({
          type: "success",
          message: "重置密码成功",
        });
        // 刷新数据
        this.initData();
        this.resetPasswordDialogVisible = false;
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.el-dialog {
  .el-input {
    width: 70%;
  }
}
.upload-demo {
  display: inline-block;
  margin: 0 1em;
}
.firstRow {
  margin-bottom: 1em;
}
</style>
