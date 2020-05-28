<template>
  <div>
    <h3>用户异常作答记录统计</h3>
    <el-row>
      <el-col :span="10" :offset="14">
         <el-button type="primary" size="small" @click="requestQuestionnaire('')">全部</el-button>
            <el-button type="success" size="small" @click="requestQuestionnaire('1')">已完成</el-button>
            <el-button type="danger" size="small" @click="requestQuestionnaire('0')">待完成</el-button>
      </el-col>
    </el-row>
     <el-table :data="getQuestionnaireData" highlight-current-row style="width: 100%" stripe>
      <el-table-column property="questionnaireName" label="问卷名称" width="350"></el-table-column>
      <el-table-column property="questionnaireTitle" label="问卷标题" width="200"></el-table-column>
      <el-table-column property="time" label="发布时间" width="200"></el-table-column>
      <el-table-column label="完成状态" width="200">
        <template slot-scope="scope">
          <el-tag type="success" v-show="scope.row.publishStatus == '2'">已完成</el-tag>
          <el-tag type="danger" v-show="scope.row.publishStatus == '1'">待完成</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" @click="checkDetails(scope.row.questionnaireId)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getQuestionnaires} from "@/api/getQuestionData";
export default {
  components: {
   
  },
  created() {
    this.init();
  },
  data() {
    return {
       // 请求问卷列表的参数
      requestQuestionnaireData: {
        publishStatus: "1",
        doneTag: '',
        questionnaireName: ''
      },
      // 问卷列表
      getQuestionnaireData: [],
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
     * @description 根据完成状态筛选问卷
     * @param doTag
     */
    requestQuestionnaire(doTag){
      this.requestQuestionnaireData.doneTag = doTag;
      this.init();
    },
    /**
     * @description 查看异常记录详情
     * @param questionnaireId
     */
    checkDetails(questionnaireId){
      this.$router.push({
        path:'/index/abnormalDetails',
        query:{
          questionnaireId:questionnaireId
        }
      })
    }
  }
};
</script>


<style lang="scss" scoped>
</style>
