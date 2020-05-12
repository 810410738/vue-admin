<template>
  <div>
    <h3>表单列表</h3>
    <el-row>
      <el-col :span="10" :offset="14">
         <el-button type="primary" size="small" @click="requestQuestionnaire('')">全部</el-button>
            <el-button type="success" size="small" @click="requestQuestionnaire('1')">已发布</el-button>
            <el-button type="danger" size="small" @click="requestQuestionnaire('0')">未发布</el-button>
            <el-button type="warning" size="small" @click="addForm">新增表单</el-button>
      </el-col>
    </el-row>
     <el-table :data="getFormDesignData" highlight-current-row style="width: 100%" stripe>
       <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column property="formGroup" label="表单分组" width="200"></el-table-column>
      <el-table-column property="formName" label="表单名称" width="350"></el-table-column>
      <el-table-column property="time" label="修改时间" width="200"></el-table-column>
      <el-table-column label="状态" width="200">
        <template slot-scope="scope">
          <el-tag type="success" v-show="scope.row.status == '2'">已发布</el-tag>
          <el-tag type="danger" v-show="scope.row.status == '1'">未发布</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="success"  plain @click="editForm(scope.row.formId, scope.row.formName)">修改</el-button>
          <el-button size="small" type="danger" plain  @click="deleteForm(scope.row.formId)" >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getAllFormDesign} from '@/api/getFormData';
export default {
  components: {
   
  },
  created() {
    this.init();
  },
  data() {
    return {
      // 请求列表的参数
      requestFormDesignData:{
        status:'',
        formGroupId:'',
        keyword:''
      },
      // 获取列表的数据
      getFormDesignData:[]
    };
  },
  methods: {
     init(){
       getAllFormDesign(this.requestFormDesignData).then(res=>{
         this.getFormDesignData = res.extend.list;
       });
     },
     /**
      * @description 点击修改按钮，进入设计表单页面
      * @param formId 表单id
      * @param formName 表单名称
      */
     editForm(formId, formName){
       this.$router.push({
         path:'/Form',
         query:{
           formId:formId,
           formName:formName,
         }
       })
     },
     /**
      * @description 点击新增表单，isNewAdd=1表示是新增
      */
     addForm(){
        this.$router.push({
         path:'/Form',
         query:{
           formName:'',
         }
       })
     }
  }
};
</script>


<style lang="scss" scoped>
</style>
