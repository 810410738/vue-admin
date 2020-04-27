<template>
  <div>
    <headTop></headTop>
    <el-row style="height: 100%;">
      <el-row>
        <el-button type="info" size="small" @click="returnBack" class="returnButton">返回</el-button>
        <h3>{{this.$route.query.formName}} - 表单设计</h3>
      </el-row>

      <el-row>
        <fm-making-form
          ref="makingform"
          style="height: 600px;"
          preview
          generate-code
          generate-json
          clearable
        >
          <template slot="action">
            <el-button type="primary" icon="el-icon-upload" size="small" @click="save">保存</el-button>
          </template>
        </fm-making-form>
      </el-row>
    </el-row>
  </div>
</template>

<script>
import headTop from "@/components/headTop";
import { saveFormData ,getFormData} from "@/api/getFormData";
export default {
  components: {
    headTop
  },
  data() {
    return {
      // 请求表单数据的数据
      requestFormData:{
        formId:'',
      },
      // 表单数据
      getFormData:{}

    };
  },
  mounted () {
    this.init();
  },
  methods: {
    /**
     * @description 初始化，如果不是新增的表单，需要获取服务器的表单数据
     */
    init(){
      // formId存在才执行
      if(this.$route.query.formId){
        this.requestFormData.formId = this.$route.query.formId;
        getFormData(this.requestFormData).then(res=>{
          this.getFormData = res.extend;
          this.$refs.makingform.setJSON(this.getFormData);
        })
      }
    },
    /**
     * @description 返回上一级
     */
    returnBack() {
      this.$router.go(-1);
    },
    /**
     * @description 保存数据
     */
    save() {
      console.log(this.$refs.makingform.getJSON());
      saveFormData(this.$refs.makingform.getJSON()).then(res => {
        // 上传数据成功
        this.$message({
          message: "保存成功",
          type: "success"
        });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.returnButton {
  float: left;
  margin: 15px 0 0 20px;
}
</style>