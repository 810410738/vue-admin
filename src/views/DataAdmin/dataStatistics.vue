<template>
  <div>
    <h3>数据管理-数据统计</h3>
    <el-row>
      <el-col :span="12" :offset="12">
        <el-row>
          <el-col :span="8">
            <el-button type="primary" size="mini" @click="requestQuestionnaire('')">全部</el-button>
            <el-button type="success" size="mini" @click="requestQuestionnaire('1')">已完成</el-button>
            <el-button type="danger" size="mini" @click="requestQuestionnaire('0')">待完成</el-button>
          </el-col>
          <el-col :span="8">
            <el-input placeholder="请输入问卷名称" v-model="keyword" size="mini">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" size="mini" @click="find()">查找</el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-table :data="getQuestionnaireData" highlight-current-row style="width: 100%" stripe>
      <el-table-column property="questionnaireName" label="问卷名称" width="350"></el-table-column>
      <el-table-column property="questionnaireTitle" label="问卷标题" width="150"></el-table-column>
      <el-table-column property="time" label="发布时间" width="200"></el-table-column>
      <el-table-column label="完成状态" width="150">
        <template slot-scope="scope">
          <el-tag type="success" v-show="scope.row.publishStatus == '2'">已完成</el-tag>
          <el-tag type="danger" v-show="scope.row.publishStatus == '1'">待完成</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" @click="showStatisticsDialog(scope.row.questionnaireId)">查看统计信息</el-button>
          <el-button size="small" @click="checkDetails(scope.row.questionnaireId)">排查详情</el-button>
          <el-button size="small" @click="showDeptData(scope.row.questionnaireId)">机构详情</el-button>
          <el-button
            size="small"
            type="danger"
            @click="closeQuestionnaire(scope.row.questionnaireId)"
          >结束问卷</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 各机构详情展示 -->
    <div v-if="isShowDepartList">
      <h3>各机构详情展示</h3>
      <el-table :data="getDepartmentData" highlight-current-row style="width: 100%" stripe>
        <el-table-column property="deptName" label="支行/部门名称" width="250"></el-table-column>
        <el-table-column property="done" label="正常参与问卷人数" width="150"></el-table-column>
        <el-table-column property="undone" label="未参与问卷人数" width="150"></el-table-column>
        <el-table-column property="reject" label="问卷驳回异常人数" width="150"></el-table-column>
        <el-table-column property="unusual" label="问卷异常提交人数" width="150"></el-table-column>
        <el-table-column label="完成状态" width="150">
          <template slot-scope="scope">
            <selfProgress :progressNumber="scope.row.progress"></selfProgress>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" @click="showDeptDetailsData(scope.row.deptName)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 饼装统计图的对话框 -->
    <selfStatisticsDialog
      :selfStatisticsData="requestStatisticsData"
      :isShow="chartsDialogVisible"
      @closeDialog="closeChartsDialog"
    ></selfStatisticsDialog>

    <!-- 查看网点详情的对话框 -->
    <selfStatisticsDetailsDialog
      :selfStatisticsData="requestDepartDetailsData"
      :isShow="departDetailsDialogVisible"
      @closeDialog="closeDepartDetailsDialog"
    ></selfStatisticsDetailsDialog>
  </div>
</template>

<script>
import { getQuestionnaires, endQuestionnaire } from "@/api/getQuestionData";
import { getDeptData } from "@/api/getDataAdminData";
import selfProgress from "@/components/dataAdmin/selfProgress";
import selfStatisticsDialog from "@/components/dataAdmin/selfStatisticsDialog";
import selfStatisticsDetailsDialog from "@/components/dataAdmin/selfStatisticsDetailsDialog";
export default {
  components: {
    // 进度条
    selfProgress,
    // 饼装统计图的对话框
    selfStatisticsDialog,
    // 查看网点详情的对话框
    selfStatisticsDetailsDialog
  },
  created() {
    this.init();
  },
  data() {
    return {
      // 查找的关键词
      keyword: "",
      // 请求问卷列表的参数
      requestQuestionnaireData: {
        publishStatus: "1",
        doneTag: '',
        questionnaireName: ''
      },
      // 问卷列表
      getQuestionnaireData: [],
      // 控制机构详情列表是否显示
      isShowDepartList: false,
      // 请求部门列表的参数
      requestDepartmentData: {
        questionnaireId: ""
      },
      // 部门列表
      getDepartmentData: [],
      // 控制统计信息对话框的显示
      chartsDialogVisible: false,
      // 控制查看网点详情的对话框的显示
      departDetailsDialogVisible: false,
      // 请求统计信息对话框的数据
      requestStatisticsData: {
        questionnaireId: ""
      },
      // 请求查看网点详情对话框的详情
      requestDepartDetailsData: {
        questionnaireId: "",
        deptName: ""
      }
    };
  },
  methods: {
    /**
     * @description 初始化页面，获取问卷列表
     */
    init() {
      getQuestionnaires(this.requestQuestionnaireData).then(res => {
        this.getQuestionnaireData = res.extend.questionnaireList;
      });
    },
    /**
     * @description 查找问卷列表
     */
    find() {
      this.requestQuestionnaireData.questionnaireName = this.keyword;
      this.init();
    },
    /**
     * @description 关闭问卷
     * @params questionnaireId 问卷id
     */
    closeQuestionnaire(questionnaireId) {
      this.$alert(
        "结束问卷后，所有用户无法再作答，该问卷终止排查，请慎重选择",
        "提示",
        {
          callback: action => {
            this.$confirm("请问确定要结束问卷吗？", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
              center: true
            }).then(() => {
              // 请求结束问卷接口
              var jsonData = {};
              jsonData.questionnaireId = questionnaireId;
              endQuestionnaire(jsonData).then(res => {
                // 弹出成功提示
                this.$message({
                  message: "结束问卷成功",
                  type: "success"
                });
                // 刷新数据
                this.init();
              });
            });
          }
        }
      );
    },
    /**
     * @description 查看机构详情
     * @params questionnaireId 问卷id
     */
    showDeptData(questionnaireId) {
      this.isShowDepartList = true;
      this.requestDepartmentData.questionnaireId = questionnaireId;
      getDeptData(this.requestDepartmentData).then(res => {
        this.getDepartmentData = res.extend.dataList;
      });
    },
    /**
     * @description 查看统计信息对话框,请求统计信息
     * @params questionnaireId 问卷id
     */
    showStatisticsDialog(questionnaireId) {
      this.requestStatisticsData.questionnaireId = questionnaireId;
      this.chartsDialogVisible = true;
    },
    /**
     * @description 关闭统计图对话框
     */
    closeChartsDialog() {
      this.chartsDialogVisible = false;
    },
    /**
     * @description 点击查看网点详情
     * @param deptName 部门名称
     */
    showDeptDetailsData(deptName) {
      this.requestDepartDetailsData.questionnaireId = this.requestDepartmentData.questionnaireId;
      this.requestDepartDetailsData.deptName = deptName;
      this.departDetailsDialogVisible = true;
    },
    /**
     * @description 关闭查看网点详情对话框
     */
    closeDepartDetailsDialog() {
      this.departDetailsDialogVisible = false;
    },
    /**
     * @description 根据完成状态筛选问卷
     * @param doTag
     */
    requestQuestionnaire(doTag){
      this.requestQuestionnaireData.doneTag = doTag;
      this.init();
    },
    /**
     * @description 查看一张问卷的排查详情
     * @param questionnaireId 问卷id
     */
    checkDetails(questionnaireId){
      this.$router.push({
        path:'/index/statisticsDetails',
        query:{
          questionnaireId:questionnaireId
        }
      })
    }
  }
};
</script>


<style lang="scss" scoped>
h3 {
  color: #696d73;
  margin-left: 20px;
}
.el-table {
  margin-top: 20px;
}
</style>
