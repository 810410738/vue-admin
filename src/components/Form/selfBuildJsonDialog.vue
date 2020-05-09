 <template>
  <!-- 生成json的对话框 -->
  <el-dialog
    title="表单设计的JSON数据"
    :visible.sync="isShow"
    width="40%"
    :before-close="handleClose"
    :destroy-on-close="true"
    @open="init"
    center
  >
    <el-input type="textarea" :rows="20"  v-model="jsonString"></el-input>
  </el-dialog>
</template>

<script>
export default {
  components: {},
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    selfBuildJsonData: {
      type: Object,
      default: false
    }
  },
  data() {
    return {
      jsonString:''
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
      this.jsonString = JSON.stringify(this.selfBuildJsonData)
    },
    /**
    @description 关闭对话框
     */
    handleClose() {
      this.$emit("closeDialog");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
