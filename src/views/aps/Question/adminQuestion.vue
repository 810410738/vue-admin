<template>
  <div class="table_container">
    <h3 class="headTitle">评议问卷列表</h3>
    <!-- 操作组件 -->
    <el-row>
      <el-col :span="20">
        <el-button type="primary" size="small" @click="requestDataByStatus('')">全部</el-button>
        <el-button type="danger" size="small" @click="requestDataByStatus('0')">未发布</el-button>
        <el-button type="success" size="small" @click="requestDataByStatus('1')">已发布</el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="warning" size="small" @click="addQuestionniare">新增问卷</el-button>
      </el-col>
    </el-row>
    <!-- 问卷数据 -->
    <el-table :data="getQuestionData.questionnaireList" highlight-current-row style="width: 100%" stripe>
      <el-table-column type="index" width="100"></el-table-column>
      <el-table-column property="questionnaireName" label="问卷名称" width="350"></el-table-column>
      <el-table-column property="questionnaireFlagValue" label="分配对象" width="150"></el-table-column>
      <el-table-column property="modifyTime" label="修改时间" width="200"></el-table-column>
      <el-table-column label="状态" width="150">
        <template slot-scope="scope">
          <el-tag type="success" v-show="scope.row.publishStatus == '1'">{{scope.row.publishStatusValue}}</el-tag>
          <el-tag type="danger" v-show="scope.row.publishStatus == '0'">{{scope.row.publishStatusValue}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button plain type="primary" @click="matchRole(scope.row)" size="small">分配对象</el-button>
          <el-button plain type="info" @click="checkQuestion(scope.row)" size="small">查看</el-button>
          <el-button
            plain
            type="danger"
            @click="deleteQuestion(scope.row.questionnaireId)"
            size="small"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="Pagination" style="text-align: left;margin-top: 10px;">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="this.getQuestionData.pageNumber"
        :page-size="this.getQuestionData.pageSize"
        layout="total, prev, pager, next"
        :page-count="this.getQuestionData.totalPage"
        :total="this.getQuestionData.totalRow"
      ></el-pagination>
    </div>
    <!-- 分配问卷对象的对话框 -->
    <el-dialog title="分配问卷对象" :visible.sync="dialogVisible" width="30%">
      <el-form :model="form" class="editUserInfoForm">
        <el-form-item label="问卷名称">
          <el-input v-model="form.questionnaireName" autocomplete="off" disabled size="small"></el-input>
        </el-form-item>
        <el-form-item label="分配对象">
          <el-select v-model="form.questionnaireFlag" placeholder="请选择问卷分配的对象" size="small">
            <el-option label="普通问卷(无指定分配对象)" value="0"></el-option>
            <el-option label="主要负责人（非党员）" value="1"></el-option>
            <el-option label="主要负责人（党员）" value="2"></el-option>
            <el-option label="其他领导干部（非党员）" value="3"></el-option>
            <el-option label="其他领导干部（党员）" value="4"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitMatchRole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getQuestionnaires, deleteQuestionnaire, bindQuestionnaireFlag } from "@/api/getQuestionData";
export default {
  data() {
    return {
      // 控制对话框是否显示
      dialogVisible: false,
      // 对话框的数据
      form: {
        questionnaireId: "",
        questionnaireName: "",
        questionnaireFlag: ""
      },
      findUserInput: "",
      // 获取的问卷列表数据
      getQuestionData: {},
      // 获取问卷列表的请求数据,pageNumber默认为1
      requestData: {
        pageNumber: "1",
        publishStatus: ""
      }
    };
  },
  components: {},
  created() {
    this.initData();
  },
  methods: {
    initData() {
      getQuestionnaires(this.requestData).then(res => {
        this.getQuestionData = res.extend;
      });
    },
    /**
     * @description 分页插件翻页触发的操作，请求下一页的数据
     */
    handleCurrentChange(val) {
      this.requestData.pageNumber = val;
      this.initData();
    },
    /**
     * @description 点击未发布，已发布按钮触发的请求数据操作
     */
    requestDataByStatus(publishStatus) {
      this.requestData.publishStatus = publishStatus;
      this.initData();
    },
    /**
     * @description 点击给问卷分配对象的按钮，弹出对话框
     * @param row.questionnareId 问卷id
     * @param row.questionnaireName 问卷名称
     * @param row.questionnaireFlag 问卷属性
     */
    matchRole(row) {
      this.dialogVisible = true;
      this.form.questionnaireId = row.questionnaireId;
      this.form.questionnaireName = row.questionnaireName;
      this.form.questionnaireFlag = row.questionnaireFlag;
    },
    /**
     * @description 提交给问卷分配对象的请求
     */
    submitMatchRole() {
      this.$confirm("确定要修改该问卷分配的对象吗?（一份问卷只能分配给一个对象）", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        bindQuestionnaireFlag(this.form).then(res => {
          // 请求成功后关闭对话框，弹出提示
          this.dialogVisible = false;
          this.$message({
            message: "分配成功",
            type: "success"
          });
          // 重新获取数据，相当于刷新
          this.initData();
        });
      });
    },
    /**
     * @description 新增问卷
     *
     */
    addQuestionniare() {
      this.$router.push({
        path: "/main/addQuestionnaire"
      });
    },
    /**
     * @description 查看问卷
     *
     */
    checkQuestion(row) {
      this.$router.push({
        path: "/main/adminQuestionDetail",
        query: {
          questionnaireId: row.questionnaireId,
        }
      });
    },
    /**
     * @description 删除问卷,请求接口
     */
    deleteQuestion(questionnaireId) {
      this.$confirm("确定要删除该问卷吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error"
      }).then(() => {
        var jsonData = {};
        jsonData.questionnaireId = questionnaireId;
        deleteQuestionnaire(jsonData).then(res => {
          // 请求删除成功后弹出提示
          this.$message({
            message: "删除成功",
            type: "success"
          });
          // 重新获取问卷列表，相当于刷新
          this.initData();
        });
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
  .el-select {
    width: 70%;
  }
}
</style>
