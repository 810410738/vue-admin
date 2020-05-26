<template>
  <div>
    <h3 class="headTitle">{{questionData.questionnaireName}}</h3>
    <p>{{questionData.title}}</p>
    <!-- 问卷题目表格数据 -->
    <div class="table_container">
      <el-table
        class="el-table"
        height="40em"
        size="medium"
        :data="questionData.list"
        highlight-current-row
        :row-class-name="tableRowClassName"
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" width="100"></el-table-column>

        <el-table-column property="content" label="主要排查内容" width="400"></el-table-column>
        <el-table-column label="自查">
          <template slot-scope="scope">
            <el-radio-group v-model="scope.row.selfAnswer">
              <el-radio-button label="是"></el-radio-button>
              <el-radio-button label="否"></el-radio-button>
            </el-radio-group>
          </template>
        </el-table-column>
        <el-table-column label="他查">
          <template slot-scope="scope">
            <el-radio-group v-model="scope.row.otherAnswer">
              <el-radio-button label="是"></el-radio-button>
              <el-radio-button label="否"></el-radio-button>
            </el-radio-group>
          </template>
        </el-table-column>
        <el-table-column property="remark" label="主要问题描述（非必填）" width="500"></el-table-column>
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
        this.questionData = res.extend;
      });
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
.el-table::-webkit-scrollbar {
  /*滚动条整体*/
  width: 6px;
  height: 6px;
}
.el-table::-webkit-scrollbar-track {
  /*滚动条轨道*/
  background: #ededed;
  border-radius: 10px;
}
.el-table::-webkit-scrollbar-thumb {
  /*滚动条里面的滑块*/
  border-radius: 10px;
  background-color: rgb(98, 198, 255);
}
</style>
