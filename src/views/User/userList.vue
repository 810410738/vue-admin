<template>
  <div class="table_container">
    <h3 class="headTitle">用户信息</h3>
    <!-- 操作组件 -->
    <el-row>
      <!-- 导入用户组件 -->
      <el-col :span="2">
        <el-button type="info" size="mini" @click="downloadTemplate">下载导入模板</el-button>
      </el-col>
      <el-col :span="8">
        <el-upload
          class="upload-demo"
          action="/EOAS/dataHandle/importUser"
          name="wenjian"
          :show-file-list="true"
          :on-success="uploadDone"
          :on-error="uploadError"
          :limit="1"
        >
          <el-button type="warning" size="mini">导入用户信息</el-button>
          <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
        </el-upload>
      </el-col>
      <el-col :span="14">
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
      <el-table-column property="isLeaderValue" label="是否为主要负责人"></el-table-column>
      <el-table-column property="isPartyMemberValue" label="是否党员"></el-table-column>
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
import { getUserList, getUserInfo, downloadUserTemplate } from "@/api/getUserData";
import findComponent from "@/components/index/findComponent";
export default {
  components: {
    findComponent
  },
  data() {
    return {
      // 一位用户表单的数据
      form: {},
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
        path:'/'
      })
    },
    uploadError() {
      this.$message({
        message: "导入用户信息失败，请重新导入",
        type: "error"
      });
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
.el-dialog {
  .el-input {
    width: 70%;
  }
}
</style>
