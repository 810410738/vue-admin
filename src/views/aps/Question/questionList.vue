<template>
  <div class="table_container">
    <h3 class="headTitle">需要评议的对象列表</h3>
    <!-- 操作组件 -->
    <el-row>
      <el-col :span="10">
        <el-button type="primary" size="small" @click="requestDataByStatus('')">全部</el-button>
        <el-button type="success" size="small" @click="requestDataByStatus('1')">已评议</el-button>
        <el-button type="danger" size="small" @click="requestDataByStatus('0')">未评议</el-button>
      </el-col>
    </el-row>
    <!-- 用户表格数据 -->
    <el-table :data="sortData" highlight-current-row style="width: 100%" stripe @row-click="doQuestion" empty-text="暂无需要完成的评议">
      <el-table-column type="index" width="100"></el-table-column>
      <el-table-column property="appraiseObjectName" label="评议对象" width="220"></el-table-column>
      <el-table-column property="AOPrimaryClass" label="所在机构"></el-table-column>
      <el-table-column property="AOSecondaryClass" label="所在网点"></el-table-column>
      <el-table-column property="isLeaderValue" label="当前用户角色"></el-table-column>
      <el-table-column property="modifyTime" label="发布时间"></el-table-column>
      <el-table-column  label="状态">
        <template slot-scope="scope">
          <el-tag type="danger" v-show="scope.row.isDo=='0'"> {{scope.row.isDoValue}}</el-tag>
           <el-tag type="success" v-show="scope.row.isDo=='1'"> {{scope.row.isDoValue}}</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <span>（其他领导干部评议顺序按照姓氏首字母排序）</span>
    </el-row>
  </div>
</template>

<script>
import { getCommentListForReviewer } from "@/api/getQuestionData";
export default {
  data() {
    return {
      findUserInput: "",
      getData: [],
      sortData:[],
      // 请求数据
      requestData :{
        isDo:''
      }
    };
  },
  components: {},
  created() {
    this.initData();
  },
  methods: {
    initData() {
      getCommentListForReviewer(this.requestData).then(res => {
        this.getData = res.extend.commentList;
        this.sortGetData();
      });
    },
    /**
     * @description 对待评议人记录进行排序，主要负责人在最前面，其他人按照名字拼音排序
     */
    sortGetData(){
      // 清空sortData
      this.sortData.splice(0, this.sortData.length);
      // 把主要负责人放在最前面
      for(var i in this.getData){
        if(this.getData[i].isLeader == "1"){
          this.sortData.push(this.getData[i]);
          // 删除该元素记录
          this.getData.splice(i,1);
        }
      }
      // 把剩下的记录按照名字拼音转化
      for(var i in this.getData){
        if( this.getData[i].appraiseObjectName.indexOf("沈") >= 0 ){
          this.getData[i].pinyinAppraiseObjectName = "神";
        }
        else{
          this.getData[i].pinyinAppraiseObjectName = this.getData[i].appraiseObjectName;
        }
        
      }
      // 把剩下的记录按照名字拼音排序
      this.getData = this.getData.sort(this.sortByName);
      // 结果合并在一起
      this.sortData = this.sortData.concat(this.getData);
    },
    /**
     * @desciption a~z 姓名首字母拼音排序
     */
    sortByName(a,b){
      return a.pinyinAppraiseObjectName.localeCompare(b.pinyinAppraiseObjectName, 'zh'); //a~z 首字母拼音排序   
    },
    /**
     * @description 根据状态请求数据
     */
    requestDataByStatus(isDo){
      this.requestData.isDo = isDo;
      this.initData();
    },
    // 修改选中的用户信息
    handleEdit(userId){
      
    },
    /**
     * @description 做问卷
     * @param row.userId 用户id
     */
    doQuestion(row){
      this.$router.push(
        {
          path:'/index/doQuestion',
          query:{
            recordId:row.recordId,
          }
        }
      );
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
</style>
