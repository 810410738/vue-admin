<template>
  <div>
    <el-row>
      <h3>{{this.$route.query.formName}} - 表单设计</h3>
    </el-row>

    <el-row>
      <fm-generate-form :data="getFormData" ref="generateForm"></fm-generate-form>
    </el-row>
    <el-row>
      <el-button type="info"  @click="returnBack">返回</el-button>
      <el-button type="primary" @click="handleSubmit">提交</el-button>
    </el-row>
  </div>
</template>

<script>
import { getFormData } from "@/api/getFormData";
export default {
  components: {},
  data() {
    return {
      // 请求表单数据的数据
      requestFormData: {
        formId: this.$route.query.formId
      },
      // 表单数据
      getFormData: {}
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    /**
     * @description 初始化，获取服务器的表单数据，显示出来
     */
    init(){
      getFormData(this.requestFormData).then(res=>{
        this.getFormData = res.extend;
      })
    },
    /**
     * @description 点击提交
     */
    handleSubmit () {
      this.$refs.generateForm.getData().then(data => {
        console.log(JSON.stringify(data))
      }).catch(e => {
      })
    },
    /**
     * @description 返回上一级
     */
    returnBack(){
      this.$router.go(-1);
    }
  
  }
};
</script>
<style lang="scss" scoped>

</style>