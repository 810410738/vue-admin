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
    isInline: {
      get:function(){
        return this.$store.state.Form.formData.isInline;
      },
      set:function(value) {
        var jsonData = {key:"isInline", value:value};
        this.$store.commit("Form/setFormData",jsonData);
      }
    },
    disabled: {
      get:function(){
        return this.$store.state.Form.formData.disabled;
      },
      set:function(value) {
        var jsonData = {key:"disabled", value:value};
        this.$store.commit("Form/setFormData",jsonData);
      }
    },
    labelPosition: {
      get:function() {
        return this.$store.state.Form.formData.labelPosition;
      },
      set:function(value) {
        var jsonData = {key:"labelPosition", value:value};
        this.$store.commit("Form/setFormData", jsonData);
      }
    },
    labelWidth: {
      get:function() {
        return this.$store.state.Form.formData.labelWidth;
      },
      set:function(value) {
        var jsonData = {key:"labelWidth", value:value};
        this.$store.commit("Form/setFormData", jsonData);
      }
    },
    size:{
      get:function() {
        return this.$store.state.Form.formData.size;
      },
      set:function(value) {
        var jsonData = {key:"size", value:value};
        this.$store.commit("Form/setFormData", jsonData);
      }
    },
    isShowButton: {
      get:function() {
        return this.$store.state.Form.formData.isShowButton;
      },
      set:function(value) {
        var jsonData = {key:"isShowButton", value:value};
        this.$store.commit("Form/setFormData", jsonData);
      }
    },
    submitText: {
      get:function() {
        return this.$store.state.Form.formData.submitText;
      },
      set:function(value) {
        var jsonData = {key:"submitText", value:value};
        this.$store.commit("Form/setFormData", jsonData);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
