 <template>
  <!-- 
   表单设计界面控制按钮的组件
  -->
  <div class="controlButton">
    <el-button type="success" size="small" @click="save" icon="el-icon-upload">保存</el-button>
    <el-button type="danger" size="small" @click="clear" icon="el-icon-delete">清空</el-button>
    <el-button type="warning" size="small" @click="previewForm" icon="el-icon-folder-checked">预览</el-button>
    <el-button
      type="primary"
      size="small"
      @click="selfImportJsonDialogVisible=true"
      icon="el-icon-upload2"
    >导入JSON</el-button>
    <el-button type="info" size="small" @click="buildJSON" icon="el-icon-check">生成JSON</el-button>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      jsonData: {
        key: "",
        name: "",
        type: "",
        label: "",
        placeholder: "",
        width: "100",
        isClick: false,
        disabled: false,
        required: false,
        errorText: "输入数据的格式不正确",
        rules: []
      }
    };
  },
  mounted() {},
  methods: {
    /**
     * @description 保存数据
     */
    save() {
      var jsonData = {};
      jsonData.formId = this.$route.query.formId;
      jsonData.formData = JSON.stringify(this.Form);
      updateFromDataById(jsonData).then(res => {
        // 上传数据成功
        this.$message({
          message: "保存成功",
          type: "success"
        });
      });
    },
  }
};
</script>

<style lang="scss" scoped>
// 基础字段
div.primaryButton {
  margin-left: 1em;
  span.primaryText {
    margin-left: 1em;
  }
  div.aLine {
    margin: 1em 0;
    background-color: #e6e3e3;
    height: 1px;
  }
  .el-row {
    margin-bottom: 0.5em;
  }
}
</style>
