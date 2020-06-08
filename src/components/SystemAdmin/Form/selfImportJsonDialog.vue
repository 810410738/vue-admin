 <template>
  <!-- 导入json的对话框 -->
  <el-dialog
    title="表单设计的JSON数据"
    :visible.sync="this.$store.state.Form.selfImportJsonDialogVisible"
    width="40%"
    :before-close="handleClose"
    :destroy-on-close="true"
    @open="init"
    center
  >
    <el-input type="textarea" :rows="20" v-model="jsonString"></el-input>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="importJson">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      jsonString: ""
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    /**
     * @description 初始化
     */
    init() {
      this.jsonString = "";
    },
    /**
     * @description 导入json
     */
    importJson() {
      if (this.jsonString == "") {
        this.$message({
          type: "warning",
          message: "json数据不可以为空"
        });
        return;
      }
      try {
        if (typeof JSON.parse(this.jsonString) == "object") {
          var jsonData = JSON.parse(this.jsonString);
          this.$store.commit("Form/resetData", jsonData);
          this.$message({
            type: "success",
            message: "导入成功！"
          });
          this.handleClose();
        } else {
          this.$message({
            type: "error",
            message: "json格式不正确，请重新输入"
          });
          return;
        }
      } catch (e) {
        this.$message({
          type: "error",
          message: "json格式不正确，请重新输入"
        });
      }
    },
    /**
    @description 关闭对话框
     */
    handleClose() {
      this.$store.commit("Form/setImportJsonDialogVisible", false);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
