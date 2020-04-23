<template>
  <div>
    <h3 class="headTitle">{{questionData.questionnaireName}}</h3>
    <!-- 问卷题目表格数据 -->
    <div class="table_container">
      <el-table
        size="medium"
        :data="questionData.questionList"
        highlight-current-row
        :row-class-name="tableRowClassName"
        style="width: 100%"
      >
        <el-table-column property="questionNum" label="序号" width="100"></el-table-column>
        <el-table-column property="questionTitle" label="考评项目" width="200"></el-table-column>
        <el-table-column property="questionContent" label="考评要点" width="500"></el-table-column>
        <el-table-column label="评价意见（A,B,C分别代表履责到位、履责基本到位、履责不到位）">
          <template slot-scope="scope">
            <el-radio-group v-model="scope.row.answer">
              <el-radio-button label="A"></el-radio-button>
              <el-radio-button label="B"></el-radio-button>
              <el-radio-button label="C"></el-radio-button>
            </el-radio-group>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-button type="info" @click="turnBack">返回上一级</el-button>
  </div>
</template>

<script>
import { getTempQuestionnaire } from "@/api/getQuestionData";
export default {
  data() {
    return {
      // 问卷标题
      title: "深圳市分行领导干部述责述廉评议表",
      // 副标题，注意事项
      subTitle: "",
      // 答案
      answer: "",
      // 问卷数据
      questionData: {},
      currentRow: null
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      var jsonData = {};
      jsonData.questionnaireId = this.$route.query.questionnaireId;
      getTempQuestionnaire(jsonData).then(res => {
        this.questionData = res.extend.questionnaire;
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.offset = (val - 1) * this.limit;
      this.getUsers();
    },
    /**
     * @description 返回上一级
     */
    turnBack() {
      this.$router.go(-1);
    },
    tableRowClassName(row) {
      if (row.row.questionTitle == "总体评价") {
        return "important-row";
      }
      return "";
    }
  }
};
</script>

<style lang="scss" scoped>
h3 {
  text-align: center;
  color: #696d73;
}
.table_container {
  padding: 20px;
}
</style>
