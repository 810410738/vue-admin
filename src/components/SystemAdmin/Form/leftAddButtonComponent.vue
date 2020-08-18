 <template>
  <!-- 
   表单设计界面左边的新增字段的操作组件
  -->
  <div class="primaryButton">
    <span class="primaryText">基础字段</span>
    <div class="aLine"></div>
    <el-row>
      <el-col :span="12">
        <el-button type="primary" plain size="mini" @click="addItem('input')">普通输入框</el-button>
      </el-col>
      <el-col :span="12">
        <el-button type="primary" plain size="mini" @click="addItem('text')">动态文本</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-button type="primary" plain size="mini" @click="addItem('inputTextarea')">多行输入框</el-button>
      </el-col>
      <el-col :span="12">
        <el-button type="primary" plain size="mini" @click="addItem('select')">下拉框</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-button type="primary" plain size="mini" @click="addItem('radio')">单选框</el-button>
      </el-col>
      <el-col :span="12">
        <el-button type="primary" plain size="mini" @click="addItem('checkbox')">多选框</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-button type="primary" plain size="mini" @click="addItem('switch')">switch开关</el-button>
      </el-col>
      <el-col :span="12">
        <el-button type="primary" plain size="mini" @click="addItem('DatePicker')">日期选择器</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-button type="primary" plain size="mini" @click="addItem('staticText')">静态文本</el-button>
      </el-col>
      <el-col :span="12">
        <el-button type="primary" plain size="mini" >待开发</el-button>
      </el-col>
    </el-row>
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
        rules: [],
        pattern: ""
      }
    };
  },
  mounted() {},
  methods: {
    /**
     * @description 添加表单元素
     * @param ItemType 元素类型
     */
    addItem(ItemType) {
      // 生成随机且唯一的key值
      this.jsonData.key =
        String(Math.random()).substring(2, 10) + String(Date.now());
      this.jsonData.name = ItemType + "_" + this.jsonData.key;
      this.jsonData.type = ItemType;
      switch (ItemType) {
        // 静态文本
        case "staticText":
          this.jsonData.label = "";
          this.jsonData.content = '静态文本'
          this.jsonData.textSize = 16;
          this.jsonData.textColor = '#000000';
          this.jsonData.marginLeft = 30;
          break;
        // 动态文本
        case "text":
          this.jsonData.label = "普通文本";
          this.jsonData.tagType = "info";
          break;
        // 单行输入框
        case "input":
          this.jsonData.label = "input输入框";
          this.jsonData.isPassword = false;
          break;
        case "inputTextarea":
          this.jsonData.label = "多行输入框";
          this.jsonData.rows = "2";
          break;
        // 单项选择框
        case "select":
          this.jsonData.label = "select下拉框";
          this.jsonData.remote = false;
          this.jsonData.remoteURL = "";
          this.jsonData.remoteParmas = [];
          this.jsonData.options = [];
          // 是否联动获取下拉数据
          this.jsonData.isLinkOptions = false;
          // 联动选项的id
          this.jsonData.linkOptionsKey = "";
          this.jsonData.isLinked = false;
          break;
        case "radio":
          this.jsonData.label = "radio单选框";
          this.jsonData.radioType = "primary";
          this.jsonData.options = [
            {
              label: "1",
              value: "1"
            }
          ];
          break;
        case "switch":
          this.jsonData.label = "Switch 开关";
          this.jsonData.activeColor = "#13ce66";
          this.jsonData.inactiveColor = "#ff4949";
          this.jsonData.activeText = "";
          this.jsonData.inactiveText = "";
          break;
        case "checkbox":
          this.jsonData.label = "Checkbox 多选框";
          this.jsonData.checkboxType = "primary";
          this.jsonData.options = [];
          break;
        case "DatePicker":
          this.jsonData.label = "DatePicker日期选择器";
          this.jsonData.datePickerType = "date";
          this.jsonData.format = "yyyy-MM-dd";
          break;
        case "rate":
          break;
      }
      // 添加新的元素到Form.item
      this.$store.commit("Form/addItem", this.jsonData);
    }
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
    .el-button{
      width: 100px;
    }
  }
}
</style>

