 <template>
  <!-- 根据json生成表单 -->
  <el-form
    :label-position="Form.labelPosition"
    :label-width="Form.labelWidth + 'px'"
    :model="Form.Data"
    :rules="Form.rules"
    :size="Form.size"
    ref="Form"
  >
    <el-form-item v-for="(item) in Form.Item" :key="item.key" :label="item.label" :prop="item.name">
      <el-input
        v-if="item.type == 'input'"
        :placeholder="item.placeholder"
        :style="'width:' + item.width + '%'"
        :disabled="item.disabled"
        v-model="item[item.name]"
      ></el-input>
      <el-select
        v-else-if="item.type == 'select'"
        :placeholder="item.placeholder"
        :style="'width:' + item.width + '%'"
        :disabled="item.disabled"
        v-model="item[item.name]"
      >
        <el-option
          v-for="(item1,index1) in item.options"
          :key="index1"
          :label="item1.label"
          :value="item1.value"
        ></el-option>
      </el-select>
    </el-form-item>

    <!-- 提交表单 -->
    <el-form-item>
      <el-button type="primary" @click="submitForm('Form')">提交</el-button>
      <el-button @click="resetForm('Form')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  components: {},
  props: {
    formJson: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      Form: {}
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    /**
     * @description 初始化,根据json生成表单
     * 根据name生成元素绑定的值
     * 如果为下拉框类型，根据remote判断是否获取远程数据，根据options的内容生成下拉选择数据
     */
    init() {
      // 深拷贝
      this.Form = JSON.parse(JSON.stringify(this.formJson));
      // 根据name生成元素绑定的值
      for (var i in this.Form.Item) {
        // 往每个元素添加绑定的属性值
        var ItemNode = this.Form.Item[i];
        this.Form.Item[i][ItemNode.name] = "";
        if(ItemNode.type == "select"){
          if(ItemNode.remoteURL == ''){
            ItemNode.remote = false;
          }
          else{
            ItemNode.remote = true;
            // 调用远程方法
            this.Form.Item[i].options = [];
            this.Form.Item[i].options = remoteSelectDataFunction('ItemNode.remoteURL')
          }
        }
      }
    },
    /**
     * @description 提交表单
     * formName 表单名字
     */
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
        } else {
          return false;
        }
      });
    },
    /**
     * @description 重置表单
     * formName 表单名字
     */
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    /**
     * @description 根据url访问接口，返回下拉列表数据
     * @param remoteURL 接口访问的url
     */
    remoteSelectDataFunction(remoteURL){
      return [];
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
