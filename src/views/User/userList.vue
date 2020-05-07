<template>
  <div class="table_container">
    <h3 class="headTitle">用户信息</h3>
    <!-- 操作组件 -->
    <el-row>
      <!-- 操作组件 -->
      <el-button
        class="button-middle"
        type="info"
        size="mini"
        @click="downloadTemplate"
        icon="el-icon-download"
      >下载模板</el-button>
      <el-upload
        class="upload-demo"
        action="/EOAS/dataHandle/importUser"
        name="wenjian"
        :show-file-list="false"
        :on-success="uploadDone"
        :on-error="uploadError"
        :limit="1"
      >
        <el-button class="button-middle" type="warning" size="mini" icon="el-icon-upload2">导入</el-button>
        <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
      </el-upload>
      <el-button
        class="button-middle"
        type="success"
        size="mini"
        @click="downloadTemplate"
        icon="el-icon-user"
      >导出</el-button>
      <el-button
        class="button-middle"
        type="primary"
        size="mini"
        @click="showAddUserDialog"
        icon="el-icon-plus"
      >新增</el-button>
    </el-row>
    <el-row>
      <el-col :span="14" :offset="10">
        <!-- 查找操作组件 -->
        <findComponent @find="find(arguments)"></findComponent>
      </el-col>
    </el-row>

    <!-- 用户表格数据 -->
    <el-table :data="getUserData.list" highlight-current-row style="width: 100%" stripe>
      <el-table-column type="index" width="100"></el-table-column>
      <el-table-column property="userNum" label="用户编号" width="150"></el-table-column>
      <el-table-column property="userName" label="用户姓名" width="150"></el-table-column>
      <el-table-column property="primaryClass" label="所在机构" width="180"></el-table-column>
      <el-table-column property="secondaryClass" label="所在网点" width="180"></el-table-column>
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
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button
            type="primary"
            plain
            size="mini"
            icon="el-icon-more"
            @click="checkMore(scope.row.userId)"
          >查看更多</el-button>
          <el-button
            type="success"
            plain
            size="mini"
            icon="el-icon-edit"
            @click="editUserInfo(scope.row.userId)"
          >编辑</el-button>
          <el-button
            type="danger"
            plain
            size="mini"
            icon="el-icon-delete"
            @click="deleteUser(scope.row.userId)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
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

    <!-- 新增用户,修改用户信息,查看用户信息的组件，根据type来区分 -->
    <selfAddUserDialog
      :selfUserData="requestUserData"
      :isShow="addUserDialogVisible"
      @closeDialog="closeAddUserDialog"
      :type="selfUserDialogType"
    ></selfAddUserDialog>
  </div>
</template>

<script>
import {
  getUserList,
  getUserInfo,
  downloadUserTemplate,
  changeUserStatus,
  deleteUser
} from "@/api/getUserData";
import findComponent from "@/components/index/findComponent";
import selfAddUserDialog from "@/components/User/selfAddUserDialog";
export default {
  components: {
    findComponent,
    selfAddUserDialog
  },
  data() {
    return {
      // 新增用户,修改用户信息,查看用户信息的组件，根据selfUserDialogType来区分
      // 0:新增用户；1：修改用户；2：查看用户
      selfUserDialogType: "",
      // 一位用户表单的数据
      form: {},
      // 获取的用户数据
      getUserData: {},
      // 分页请求用户数据的参数,pageNumber默认为1，其余参数默认为空
      requestData: {
        primaryClass: "",
        secondaryClass: "",
        keyword: "",
        pageNumber: "1"
      },
      // 请求一个用户的所有信息的参数
      requestUserData: {
        userId: ""
      },
      // 控制新增用户的对话框是否出现
      addUserDialogVisible: false
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
      getUserList(this.requestData).then(res => {
        this.getUserData = res.extend.page;
      });
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
      this.initData();
    },
    /**
     * @description 点击新增用户按钮，显示新增用户的对话框,selfUserDialogType=0
     */
    showAddUserDialog() {
      this.selfUserDialogType = "0";
      this.addUserDialogVisible = true;
    },
    /**
     * @description 点击查看更多，显示用户信息的对话框，selfUserDialogType = 2
     * @param userId 用户id
     */
    checkMore(userId) {
      this.selfUserDialogType = "2";
      this.addUserDialogVisible = true;
    },
    /**
     * @description 点击编辑按钮，显示用户信息的对话框，selfUserDialogType = 1
     * @param userId 用户id
     */
    editUserInfo(userId) {
      this.selfUserDialogType = "1";
      this.addUserDialogVisible = true;
    },
    /**
     * @description 下载用户模板
     */
    downloadTemplate() {
      window.location.href = "/EOAS/dataHandle/downloadUserTemplate";
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
        type: typeString
      });
      this.$router.push({
        path: "/"
      });
    },
    uploadError() {
      this.$message({
        message: "导入用户信息失败，请重新导入",
        type: "error"
      });
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
        center: true
      })
        .then(() => {
          // 请求修改用户状态接口
          var jsonData = {};
          jsonData.userStatus = $event;
          jsonData.userId = userId;
          changeUserStatus(jsonData).then(res => {
            // 弹出成功提示
            this.$message({
              message: "修改用户状态成功",
              type: "success"
            });
            // 刷新数据
            this.initData();
          });
        })
        .catch(() => {
          // 恢复状态为未修改之前的
          this.getUserData.list[index].userStatus = $event == "1" ? "0" : "1";
        });
    },
    /**
     * @description 关闭新增用户的对话框
     */
    closeAddUserDialog() {
      this.addUserDialogVisible = false;
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
        center: true
      }).then(() => {
        // 请求删除用户接口
        var jsonData = {};
        jsonData.userId = userId;
        deleteUser(jsonData).then(res => {
          // 弹出成功提示
          this.$message({
            message: "删除成功",
            type: "success"
          });
          // 刷新数据
          this.initData();
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.table_container {
  padding: 20px;
}
.el-dialog {
  .el-input {
    width: 70%;
  }
}
.upload-demo {
  display: inline-block;
  margin: 0 1em;
}
</style>
