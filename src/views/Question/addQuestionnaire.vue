<template>
  <div>
    <h3 class="headTitle">新增问卷</h3>
    <!-- 操作组件 -->
    <el-row>
      <el-col :span="6" :offset="1">
        <el-button type="warning" size="small" >下载导入模板</el-button>
        <el-button type="success" size="small" >上传模板</el-button>

      </el-col>
      <el-col :span="4" :offset="10">
        <el-button type="primary" size="small" @click="addQuestion">添加题目</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="18" :offset="1">
        <el-form ref="questionData" :model="questionData" label-width="80px" class="questionData">
          <el-form-item label="问卷名称">
            <el-input
              v-model="questionData.questionnaireName"
              placeholder="请输入问卷的标题"
              maxlength="50"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="标题内容">
            <el-input
              type="textarea"
              v-model="questionData.questionnaireName"
              :rows="2"
              maxlength="100"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <!-- 用户表格数据 -->
    <div class="table_container">
      <el-table
        size="medium"
        :data="questionData.questionList"
        highlight-current-row
        empty-text="暂无数据，请添加题目"
        style="width: 100%"
        stripe
      >
        <el-table-column type="index" :index="changeIndex" label="序号" width="100"></el-table-column>
        <el-table-column label="考评项目" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.questionTitle"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="考评要点" width="500">
          <template slot-scope="scope">
            <el-input type="textarea" v-model="scope.row.questionContent"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="danger" @click="deleteQuestion(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 提交 -->
    <el-button type="info" @click="turnBack">返回上一级</el-button>
    <el-button type="success" @click="submit">提交</el-button>
  </div>
</template>

<script>
import { addQuestionnaire } from "@/api/getQuestionData";
export default {
  data() {
    return {
      // 副标题，注意事项
      subTitle: "",
      // 问卷数据
      questionData: {
        questionnaireName: "",
        questionnaireTitle: "",
        questionList: []
      },
      currentRow: null,
      offset: 0,
      limit: 20,
      count: 0,
      currentPage: 1
    };
  },
  components: {},
  created() {},
  methods: {
    handleCurrentChange(val) {},
    /**
     * @description 返回上一级
     */
    turnBack() {
      this.$router.go(-1);
    },
    /**
     * @description 删除一条问题
     */
    deleteQuestion(row) {
      this.questionData.questionList.splice(row.index - 1, 1);
    },
    /**
     * @description 增加一条问题
     */
    addQuestion() {
      this.questionData.questionList.push({
        questionTitle: "",
        questionContent: "",
        questionNum: ""
      });
    },
    /**
     * @description 修改序号
     */
    changeIndex(index) {
      this.questionData.questionList[index].questionNum = index + 1;
      return index + 1;
    },
    /**
     * @description 提交问卷
     */
    submit() {
      // 验证数据
      var showTips = "";
      if (this.questionData.questionList.length == 0) {
        showTips = "请添加问题";
      } else {
        for (var i in this.questionData.questionList) {
          if (this.questionData.questionList[i].questionTitle == "") {
            showTips = "考评项目不可以为空";
            break;
          }
          if (this.questionData.questionList[i].questionContent == "") {
            showTips = "考评要点不可以为空";
            break;
          }
        }
      }
      if (
        this.questionData.questionnaireName == null ||
        this.questionData.questionnaireName == ""
      ) {
        showTips = "请输入问卷标题";
      }
      if (
        this.questionData.questionnaireName != null &&
        this.questionData.questionnaireName.length > 50
      ) {
        showTips = "问卷标题过长，请重新输入";
      }
      if (showTips != "") {
        this.$alert(showTips, "提示", {
          type: "warning",
          center: true
        });
        return;
      }
      this.$confirm("确定要提交吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        // 验证通过后提交到服务器
        addQuestionnaire(this.questionData).then(res => {
          this.$alert("新增问卷成功", "提示", {
            center: true,
            callback: action => {
              this.$router.push({
                path: "/index/adminQuestion"
              });
            }
          });
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
h3 {
  color: #696d73;
  margin-left: 20px;
}
.table_container {
  padding: 0 0 10px 20px;
}

// 新建问卷的表单
.questionData {
  margin: 10px;
}
</style>
