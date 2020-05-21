 <template>
  <!-- 
   表单设计界面右边控制组件的
   控制表单属性组件
  -->
  <el-form label-position="top">
    <el-form-item>
      <el-checkbox v-model="disabled">禁用表单</el-checkbox>
    </el-form-item>

    <el-form-item label="标签对齐方式">
      <el-radio-group v-model="labelPosition">
        <el-radio-button label="left">左对齐</el-radio-button>
        <el-radio-button label="right">右对齐</el-radio-button>
        <el-radio-button label="top">顶部对齐</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="表单标签宽度">
      <el-input-number v-model="labelWidth" :step="10"></el-input-number>
    </el-form-item>
    <el-form-item label="组件尺寸">
      <el-radio-group v-model="size">
        <el-radio-button label="medium">medium</el-radio-button>
        <el-radio-button label="small">small</el-radio-button>
        <el-radio-button label="mini">mini</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="显示提交按钮">
      <el-switch v-model="isShowButton"></el-switch>
    </el-form-item>
    <el-form-item label="提交按钮的文字内容" v-show="this.$store.state.Form.formData.isShowButton">
      <el-input v-model="submitText"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name:'formProperty',
  props: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  computed: {
    disabled: {
      get() {
        return this.$store.state.Form.formData.disabled;
      },
      set(value) {
        this.$store.commit("Form/setFormData", "disabled", value);
      }
    },
    labelPosition: {
      get() {
        return this.$store.state.Form.formData.labelPosition;
      },
      set(value) {
        this.$store.commit("Form/setFormData", "labelPosition", value);
      }
    },
    labelWidth: {
      get() {
        return this.$store.state.Form.formData.labelWidth;
      },
      set(value) {
        this.$store.commit("Form/setFormData", "labelWidth", value);
      }
    },
    size:{
      get() {
        return this.$store.state.Form.formData.size;
      },
      set(value) {
        this.$store.commit("Form/setFormData", "size", value);
      }
    },
    isShowButton: {
      get() {
        return this.$store.state.Form.formData.isShowButton;
      },
      set(value) {
        this.$store.commit("Form/setFormData", "isShowButton", value);
      }
    },
    submitText: {
      get() {
        return this.$store.state.Form.formData.submitText;
      },
      set(value) {
        this.$store.commit("Form/setFormData", "submitText", value);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
