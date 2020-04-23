<template>
  <div>
    <h3 class="headTitle">{{questionData.questionnaireName}}</h3>
    <!-- 组件 -->
    <el-row>
      <!-- 被评议人信息组件 -->
      <el-col :span="6">
        <span>被评议人单位：{{appraiseObject.primaryClass}}-{{appraiseObject.secondaryClass}}</span>
      </el-col>
      <el-col :span="4">
        <span>被评议人姓名：{{appraiseObject.appraiseObjectName}}</span>
      </el-col>
      <el-col :span="6" :offset="8">
        <el-button @click="downloadAnnex(appraiseObject.appraiseObjectId)">被评议人2019年度述责述廉报告</el-button>
      </el-col>
    </el-row>
    <!-- 问卷题目表格数据 -->
    <div class="table_container">
      <el-table
        size="medium"
        :data="questionData.questionList"
        highlight-current-row
        :row-class-name="tableRowClassName"
        style="width: 100%"
        
      >
        <el-table-column
          property="questionNum"
          label="序号"
          width="100"
        ></el-table-column>
        <el-table-column property="questionTitle" label="考评项目" width="200"></el-table-column>
        <el-table-column property="questionContent" label="考评要点" width="500"></el-table-column>
        <el-table-column label="评价意见（A,B,C分别代表履责到位、履责基本到位、履责不到位）">
          <template slot-scope="scope">
            <el-radio-group v-model="scope.row.answer" :disabled="isDo == '1'">
              <el-radio-button label="A"></el-radio-button>
              <el-radio-button label="B"></el-radio-button>
              <el-radio-button label="C"></el-radio-button>
            </el-radio-group>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 提交 -->
    <el-button type="info" @click="turnBack">返回上一级</el-button>
    <el-button type="success" @click="submit" v-if="isDo == '0'">提交</el-button>
  </div>
</template>

<script>
import { getQuestionnaireDetail, commitComment } from "@/api/getQuestionData";
export default {
  data() {
    return {
      // 问卷标题
      title: "深圳市分行领导干部述责述廉评议表",
      // 副标题，注意事项
      subTitle: "",
      // 提交到服务器的数据
      requestData: {
        recordId: this.$route.query.recordId,
        questionList: []
      },
      // 问卷数据
      questionData: {},
      // 被评议人数据
      appraiseObject: {},
      // 问卷完成的标志，0-未完成;1-已完成
      isDo: ""
    };
  },
  components: {},
  created() {
    this.initData();
  },
  methods: {
    sortByNum(a, b) {
      console.log(a);
      console.log(b);
    },
    tableRowClassName(row) {

      if (row.row.questionTitle == "总体评价") {
        return "important-row";
      }
      return "";
    },
    initData() {
      // 获取问卷数据
      var jsonData = {};
      jsonData.recordId = this.$route.query.recordId;
      getQuestionnaireDetail(jsonData).then(res => {
        this.questionData = res.extend.questionnaire;
        this.appraiseObject = res.extend.appraiseObject;
        this.isDo = res.extend.isDo;
      });
    },
    /**
     * @description 返回上一级
     */
    turnBack() {
      this.$router.go(-1);
    },
    /**
     * @description 提交答案到服务器
     */
    submit() {
      // 赋值给rquestData,检查是否有未作答的题目
      this.requestData.questionList.splice(
        0,
        this.requestData.questionList.length
      );
      for (var i in this.questionData.questionList) {
        if (
          this.questionData.questionList[i].answer == "" ||
          this.questionData.questionList[i].answer == null
        ) {
          this.$alert("还存在未完成的题目，请完成后再提交", "提示", {
            type: "warning",
            center: true
          });
          return;
        }
        var jsonData = {};
        jsonData.questionId = this.questionData.questionList[i].questionId;
        jsonData.answer = this.questionData.questionList[i].answer;
        this.requestData.questionList.push(jsonData);
      }
      // 检查成功后提交数据
      this.$confirm("确定要提交吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        // 验证通过后提交到服务器
        commitComment(this.requestData).then(res => {
          this.$alert("提交成功", "提示", {
            center: true,
            callback: action => {
              this.$router.push({
                path: "/index/questionList"
              });
            }
          });
        });
      });
    },
    /**
     * @description 下载被评议人附件
     */
    downloadAnnex(appraiseObjectId) {
      window.location.href =
        "/EOAS/dataHandle/downloadAnnexByAO?appraiseObjectId=" +
        appraiseObjectId;
    }
  }
};
</script>

<style lang="scss">
.table_container {
  padding: 20px;
  font-size: 14px;
}
 .el-table .important-row{
    background-color: #fdf5e6;
    font-size: 16px;
    font-weight: bold;
  }
</style>

