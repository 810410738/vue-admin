 <template>
  <!-- 根据json生成表单 -->
  <el-form
    :label-position="Form.labelPosition"
    :label-width="Form.labelWidth + 'px'"
    :model="Form.Data"
    :rules="Form.Rules"
    :size="Form.size"
    ref="Form"
  >
    <el-form-item v-for="(item) in Form.Item" :key="item.key" :label="item.label" :prop="item.name">
      <el-input
        v-if="item.type == 'input'"
        :placeholder="item.placeholder"
        :style="'width:' + item.width + '%'"
        :disabled="item.disabled"
        v-model="Form.Data[item.name]"
      ></el-input>
      <el-select
        v-else-if="item.type == 'select'"
        :placeholder="item.placeholder"
        :style="'width:' + item.width + '%'"
        :disabled="item.disabled"
        v-model="Form.Data[item.name]"
        @change="changeSelect(Form.Data[item.name], item.isLinkOptions,item.linkOptionsKey)"
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
    </el-form-item>
  </el-form>
</template>

<script>
import { post } from "@/api/http";
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
        this.$set(this.Form.Data, ItemNode.name, "");
        // this.Form.Data[ItemNode.name] = "";
        // 为每个元素添加校验规则
        if (ItemNode.required == true) {
          this.Form.Item[i].rules.push({
            required: true,
            message: ItemNode.placeholder,
            trigger: "blur"
          });
        }
        if (ItemNode.pattern != "") {
          this.Form.Item[i].rules.push({
            pattern: ItemNode.pattern,
            message: ItemNode.errorText
          });
        }
        this.$set(this.Form.Rules, ItemNode.name, ItemNode.rules);
        // 元素类型为下拉框且不是被联动
        if (ItemNode.type == "select" && ItemNode.isLinked == false) {
          if (ItemNode.remoteURL == "") {
            ItemNode.remote = false;
          } else {
            ItemNode.remote = true;
            // 调用远程方法
            this.remoteSelectDataFunction({},ItemNode.remoteURL, i);
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
     * @param requestData 请求数据
     * @param remoteURL 接口访问的url
     * @param index 元素索引
     */
    remoteSelectDataFunction(requestData, remoteURL,index) {
      post(remoteURL, requestData).then(res => {
        this.Form.Item[index].options =  res.extend.classList;
      });
    },
    /**
     * @description 选择下拉框数据后触发的事件
     * 如果该下拉框为联动类型，则调用方法获取联动的下拉框的数据，否则什么也不做
     * @param value 下拉框选择的数据
     * @param isLinkOptions 是否为联动类型的下拉框
     * @param linkOptionsKey 联动的下拉框的key值
     */
    changeSelect(value, isLinkOptions,linkOptionsKey){
      if(!isLinkOptions){
        return ;
      }
      var requestData = {};
      requestData.parentClass = value;
      // 根据key寻找联动的下拉框
      for(var i in this.Form.Item){
        if(this.Form.Item[i].key == linkOptionsKey){
          this.remoteSelectDataFunction(requestData, this.Form.Item[i].remoteURL, i);
        }
      }
    },
  }
};
</script>

<style lang="scss" scoped>
</style>
