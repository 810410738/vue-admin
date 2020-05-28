<template>
  <div>
    <h3>表单列表</h3>
    <el-card class="controlCard">
      <el-row>
        <el-col :span="13" :offset="1">
          <!-- 所有子系统 -->
          <selfFindSystemComponent ref="findSystem"></selfFindSystemComponent>
        </el-col>
        <el-col :span="10">
          <el-button type="primary" size="small" @click="requestFormList('')">全部</el-button>
          <el-button type="success" size="small" @click="requestFormList('1')">已发布</el-button>
          <el-button type="danger" size="small" @click="requestFormList('0')">未发布</el-button>
          <el-button type="warning" size="small" @click="newFormDialogVissible=true">新增表单</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <el-table :data="getFormDesignData.records" highlight-current-row style="width: 100%" stripe>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column property="systemIdentify" label="表单分组" width="200"></el-table-column>
        <el-table-column property="formName" label="表单名称" width="150"></el-table-column>
        <el-table-column property="remark" label="备注说明" width="300"></el-table-column>
        <el-table-column property="modifyTime" label="修改时间" width="200"></el-table-column>
        <el-table-column label="状态" width="200">
          <template slot-scope="scope">
            <el-tag type="success" v-show="scope.row.publishStatus == '1'">已发布</el-tag>
            <el-tag type="danger" v-show="scope.row.publishStatus == '0'">未发布</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" plain size="small" @click="editFormInfo(scope.row,scope)">修改属性</el-button>
            <el-button
              size="small"
              type="success"
              plain
              @click="editForm(scope.row.formId, scope.row.formName)"
            >编辑表单</el-button>
            <el-button size="small" type="danger" plain @click="deleteForm(scope.row.formId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <div class="Pagination" style="text-align: left;margin-top: 10px;">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="this.getFormDesignData.current"
          :page-size="this.getFormDesignData.size"
          layout="total, prev, pager, next"
          :page-count="this.getFormDesignData.pages"
          :total="this.getFormDesignData.total"
        ></el-pagination>
      </div>
    </el-card>
    <!-- 新增表单的对话框 -->
    <el-dialog
      title="新增表单"
      :visible.sync="newFormDialogVissible"
      width="30%"
      :destroy-on-close="true"
      center
    >
      <selfGenerateForm :formJson="newFormData" @submit="addFormSubmit(arguments)"></selfGenerateForm>
    </el-dialog>
     <!-- 编辑表单属性的对话框 -->
    <el-dialog
      title="编辑属性"
      :visible.sync="editFormDialogVissible"
      width="30%"
      :destroy-on-close="true"
      center
    >
      <selfGenerateForm :formJson="editFormData" @submit="editFormSubmit(arguments)" ref="editForm"></selfGenerateForm>
    </el-dialog>
  </div>
</template>

<script>
import { editForm, deleteFormById, getFormByPage } from "@/api/getFormData";
import selfFindSystemComponent from "@/components/SystemAdmin/selfFindSystemComponent";
import selfGenerateForm from "@/components/Form/selfGenerateForm";
export default {
  components: {
    selfFindSystemComponent,
    selfGenerateForm
  },
  created() {
    this.init();
  },
  data() {
    return {
      newFormData:{"disabled":false,"isShowButton":true,"submitText":"提交","labelPosition":"right","labelWidth":130,"size":"small","Item":[{"key":"422339821589870833575","name":"systemIdentify","type":"select","label":"所属子系统","placeholder":"请选择所属子系统","width":"100","isClick":true,"disabled":false,"required":true,"errorText":"输入数据的格式不正确","rules":[],"remote":false,"remoteURL":"","options":[{"label":"后台管理系统","value":"ADMIN"}],"isLinkOptions":false,"linkOptionsKey":""},{"key":"407131621589870930247","name":"formName","type":"input","label":"表单名称","placeholder":"请输入表单名称","width":"100","isClick":false,"disabled":false,"required":true,"errorText":"输入数据的格式不正确","rules":[]},{"key":"226589981589958766036","name":"remark","type":"input","label":"表单备注","placeholder":"请输入表单备注","width":"100","isClick":false,"disabled":false,"required":false,"errorText":"输入数据的格式不正确","rules":[]}],"Data":{},"Rules":{}},
      editFormData: {"disabled":false,"isShowButton":true,"submitText":"提交","labelPosition":"right","labelWidth":130,"size":"small","Item":[{"key":"420430751589958811031","name":"createTime","type":"input","label":"创建时间","placeholder":"","width":"100","isClick":false,"disabled":true,"required":false,"errorText":"输入数据的格式不正确","rules":[]},{"key":"685831901589958867531","name":"modifyTime","type":"input","label":"修改时间","placeholder":"","width":"100","isClick":true,"disabled":true,"required":false,"errorText":"输入数据的格式不正确","rules":[]},{"key":"422339821589870833575","name":"systemIdentify","type":"select","label":"所属子系统","placeholder":"请选择所属子系统","width":"100","isClick":false,"disabled":false,"required":true,"errorText":"输入数据的格式不正确","rules":[],"remote":false,"remoteURL":"","options":[{"label":"后台管理系统","value":"ADMIN"}],"isLinkOptions":false,"linkOptionsKey":""},{"key":"407131621589870930247","name":"formName","type":"input","label":"表单名称","placeholder":"请输入表单名称","width":"100","isClick":false,"disabled":false,"required":true,"errorText":"输入数据的格式不正确","rules":[]},{"key":"226589981589958766036","name":"remark","type":"input","label":"表单备注","placeholder":"请输入表单备注","width":"100","isClick":false,"disabled":false,"required":false,"errorText":"输入数据的格式不正确","rules":[]}],"Data":{},"Rules":{}},
      // 控制新增表单的对话框是否显示
      newFormDialogVissible: false,
      // 控制编辑表单属性的对话框是否显示
      editFormDialogVissible:false,
      // 请求列表的参数
      requestFormDesignData: {
        publishStatus: "",
        formGroupId: "",
        keyword: "",
        pageNumber: "1"
      },
      // 获取列表的数据
      getFormDesignData: []
    };
  },
  methods: {
    init() {
      // console.log(JSON.stringify(this.newFormData));
      getFormByPage(this.requestFormDesignData).then(res => {
        this.getFormDesignData = res.extend.pageData;
      });
    },
    /**
     * @description 翻页，获取分页数据
     */
    handleCurrentChange(val) {
      this.requestData.pageNumber = val;
      this.init();
    },
    /**
     * @description 点击修改按钮，进入设计表单页面
     * @param formId 表单id
     * @param formName 表单名称
     */
    editForm(formId, formName) {
      this.$router.push({
        path: "/Form",
        query: {
          formId: formId,
          formName: formName
        }
      });
    },
    /**
     * @description 新增表单点击提交按钮，发送请求到服务器
     * @param arg[0] 新增表单提交的数据的对象
     */
    addFormSubmit(arg) {
      editForm(arg[0]).then(res=>{
        this.$message({
          type:'success',
          message:'新增成功'
        });
        this.newFormDialogVissible = false;
        this.init();
      });
    },
    /**
     * @description 点击编辑表单信息的按钮
     */
    editFormInfo(row){
      this.editFormDialogVissible = true;
      this.$nextTick(()=>{
        this.$refs.editForm.setFormData(row);
        this.$refs.editForm.setParams("formId", row.formId);
      })
    },
    /**
     * @description 编辑表单信息点击提交按钮，发送请求到服务器
     * @param arg[0] 编辑表单提交的数据的对象
     */
    editFormSubmit(arg){
      var jsonData = arg[0];
      jsonData.formId = this.$refs.editForm.getParams("formId");
       editForm(jsonData).then(res=>{
        this.$message({
          type:'success',
          message:'修改信息成功'
        });
        this.editFormDialogVissible = false;
        this.init();
      });
    },
    /**
     * @description 根据不同的状态参数请求表单列表
     * @param publishStatus 状态（'0'，'1'，''）
     */
    requestFormList(publishStatus) {
      this.requestFormDesignData.publishStatus = publishStatus;
      this.init();
    },
    /**
     * @description 删除表单
     * @param formId 表单id
     */
    deleteForm(formId) {
      this.$confirm("请问确定要删除该表单吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      }).then(() => {
        // 请求删除表单接口
        var jsonData = {};
        jsonData.formId = formId;
        deleteFormById(jsonData).then(res => {
          // 弹出成功提示
          this.$message({
            message: "删除成功",
            type: "success"
          });
          // 刷新数据
          this.init();
        });
      });
    }
  }
};
</script>


<style lang="scss" scoped>
.controlCard {
  margin-bottom: 1em;
}
</style>
