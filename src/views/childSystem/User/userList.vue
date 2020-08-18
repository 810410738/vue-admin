<template>
  <div>
    <h3 class="headTitle">用户信息</h3>
    <!-- 操作组件 -->
    <el-card class="primaryCard topCard">
      <el-row>
        <!-- 查找操作组件 -->
        <findComponent @find="find(arguments)"></findComponent>
      </el-row>
    </el-card>
    <!-- 用户表格数据 -->
    <el-card class="primaryCard">
      <el-row class="firstRow">
        <el-col :span="16">
          <!-- 操作组件 -->
          <el-button
            class="button-middle"
            type="info"
            size="small"
            @click="downloadTemplate"
            icon="el-icon-download"
            v-if="controlAuthority.downloadTemplate"
          >{{controlAuthority.downloadTemplate.authorityName}}</el-button>
          <el-button
            class="button-middle"
            type="success"
            size="small"
            @click="downloadTemplate"
            v-if="controlAuthority.exportUser"
            icon="el-icon-user"
          >{{controlAuthority.exportUser.authorityName}}</el-button>
          <el-button
            class="button-middle"
            type="primary"
            size="small"
            @click="addUserDialogVisible = true"
            v-if="controlAuthority.newUser"
            icon="el-icon-plus"
          >{{controlAuthority.newUser.authorityName}}</el-button>
        </el-col>
        <el-col :span="8">
          <!-- 上传的组件 -->
          <uploadUser @uploadSuccess="initData"></uploadUser>
        </el-col>
      </el-row>
      <el-table :data="getUserData.records" highlight-current-row stripe>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column property="userNum" label="用户编号" width="100"></el-table-column>
        <el-table-column property="userName" label="用户姓名" width="150"></el-table-column>
        <el-table-column property="primaryClass" label="所属一级机构" width="180"></el-table-column>
        <el-table-column property="secondaryClass" label="所属二级机构" width="180"></el-table-column>
        <el-table-column property="modifyTime" label="修改时间" width="180"></el-table-column>
        <el-table-column property="userStatus" label="用户状态" width="100">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.userStatus"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="1"
              inactive-value="0"
              @change="changeUserStatus($event, scope.$index, scope.row.userId)"
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
              v-if="controlAuthority.checkMore"
            >{{controlAuthority.checkMore.authorityName}}</el-button>
            <el-button
              type="success"
              plain
              size="mini"
              icon="el-icon-edit"
              @click="editUserInfo(scope.row)"
              v-if="controlAuthority.edit"
            >{{controlAuthority.edit.authorityName}}</el-button>
            <el-button plain size="mini" icon="el-icon-edit" @click="changeUserRole(scope.row)">分配角色</el-button>
            <el-button
              type="danger"
              plain
              size="mini"
              icon="el-icon-delete"
              @click="deleteUser(scope.row.userId)"
              v-if="controlAuthority.deleteUser"
            >{{controlAuthority.deleteUser.authorityName}}</el-button>
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
      title="新增用户"
      :visible.sync="addUserDialogVisible"
      width="30%"
      :destroy-on-close="true"
      center
    >
      <selfGenerateForm :formJson="addUserFormData" @submit="addUserSubmit(arguments)"></selfGenerateForm>
    </el-dialog>
    <!-- 查看用户的对话框 -->
    <el-dialog
      title="查看用户信息"
      :visible.sync="checkUserDialogVisible"
      width="30%"
      :destroy-on-close="true"
      center
    >
      <selfGenerateForm :formJson="checkUserFormData" ref="checkUserFrom"></selfGenerateForm>
    </el-dialog>
    <!-- 编辑用户的对话框 -->
    <el-dialog
      title="修改用户信息"
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

    <!-- 分配角色的对话框  -->
    <el-dialog
      title="分配角色"
      :visible.sync="changeRoleDialogVisible"
      width="30%"
      :destroy-on-close="true"
      center
    >
      <changeUserRole :userId="currentClickUserId" @finishChange="closeChangeRoleDialog(arguments)"></changeUserRole>
    </el-dialog>
  </div>
</template>

<script>
import {
  edit,
  deleteById,
  getUserById,
  getById,
  getByPage,
  updateUserStatus,
  downloadUserTemplate
} from "@/api/childSystemAdmin/getUserData";
// 表单配置数据的json
import addUserFormJson from "@/assets/JSON//User/addUserForm";
import editUserFormJson from "@/assets/JSON//User/editUserForm";
import checkUserFormJson from "@/assets/JSON//User/checkUserForm";
// 查找组件
import findComponent from "@/components/index/findComponent";
// 分配角色的组件
import changeUserRole from "@/components/SystemAdmin/User/changeUserRole";
import uploadUser from "@/components/SystemAdmin/User/uploadUser";

import selfGenerateForm from "@/components/SystemAdmin/Form/selfGenerateForm";
export default {
  components: {
    findComponent,
    changeUserRole,
    uploadUser,
    selfGenerateForm,
  },
  data() {
    return {
      // 当前选择的用户id
      currentClickUserId: "",
      // 权限列表
      authorityList: [
        {
          authorityId: "1",
          authorityName: "下载模板",
          authorityKey: "downloadTemplate",
        },
        {
          authorityId: "2",
          authorityName: "导入",
          authorityKey: "importUser",
        },
        {
          authorityId: "3",
          authorityName: "导出",
          authorityKey: "exportUser",
        },
        {
          authorityId: "4",
          authorityName: "新增",
          authorityKey: "newUser",
        },
        {
          authorityId: "5",
          authorityName: "查看更多",
          authorityKey: "checkMore",
        },
        {
          authorityId: "6",
          authorityName: "编辑",
          authorityKey: "edit",
        },
        {
          authorityId: "7",
          authorityName: "删除",
          authorityKey: "deleteUser",
        },
      ],
      // 根据权限列表生成的控制字段
      controlAuthority: {},
      // 控制所有按钮的显示状态
      isShowButton: {
        downloadTemplateShow: false,
        importUserShow: false,
        exportUserShow: false,
        newUserShow: false,
        checkMoreShow: false,
        editShow: false,
        deleteUserShow: false,
      },
      // 用户表单的配置数据
      addUserFormData: {},
      checkUserFormData: {},
      editUserFormData: {},
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
        userStatus: "",
      },
      // 控制分配角色的对话框显示
      changeRoleDialogVisible: false,
      // 控制新增用户的对话框是否出现
      addUserDialogVisible: false,
      checkUserDialogVisible: false,
      editUserDialogVisible: false,
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
      this.addUserFormData = addUserFormJson;
      this.checkUserFormData = checkUserFormJson;
      this.editUserFormData = editUserFormJson;
      // 获取权限列表数据
      // TODO
      // 根据权限列表数据控制按钮,先把数组转化为对象
      for (var i in this.authorityList) {
        this.controlAuthority[this.authorityList[i].authorityKey] = {
          authorityName: this.authorityList[i].authorityName,
        };
      }
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
      this.requestData.userStatus = arg[0].userStatus;
      this.initData();
    },
    /**
     * @description 下载用户模板
     */
    downloadTemplate() {
      downloadUserTemplate().then(res=>{

      })
    },
    /**
     * @description 上传文件成功
     */
    uploadDone(res) {
      var messageString = "";
      var typeString = "";
      if (res.errCode == 0) {
        messageString = "导入用户信息成功";
        typeString = "success";
        // 重新获取数据，相当于刷新
        this.initData();
      } else {
        messageString = res.errMsg + "\n" + "错误代码： " + res.errCode;
        typeString = "error";
      }
      this.$message({
        message: messageString,
        type: typeString,
      });
      this.$router.push({
        path: "/",
      });
    },
    uploadError() {
      this.$message({
        message: "导入用户信息失败，请重新导入",
        type: "error",
      });
    },
    /**
     * 点击分配角色按钮，弹出对话框
     */
    changeUserRole(row) {
      this.changeRoleDialogVisible = true;
      this.currentClickUserId = row.userId;
    },
    /**
     * @description 改变用户状态
     * @param $event 改变后的用户状态值 （0，1）
     * @param index 用户信息的索引，代表第几个用户
     * @param userId 用户id
     */
    changeUserStatus($event, index, userId) {
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
          jsonData.userId = userId;
          updateUserStatus(jsonData).then((res) => {
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
          this.getUserData.records[index].userStatus =
            $event == "1" ? "0" : "1";
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
        this.$refs.editUserFrom.setParams("userId", row.userId);
      });
    },
    /**
     * @description 删除用户
     * @param userId 用户id
     */
    deleteUser(userId) {
      this.$confirm("请问确定要删除该用户吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      }).then(() => {
        // 请求删除用户接口
        var jsonData = {};
        jsonData.userId = userId;
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
      jsonData.userId = this.$refs.editUserFrom.getParams("userId");
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
    closeChangeRoleDialog(arg) {
      this.changeRoleDialogVisible = false;
    },
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
