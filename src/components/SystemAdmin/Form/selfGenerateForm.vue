 <template>
  <!-- 根据json生成表单 -->
  <el-form
    :inline="Form.isInline"
    :disabled="Form.disabled"
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
      <!-- 多行输入框 -->
      <el-input
        v-if="item.type == 'inputTextarea'"
        type="textarea"
        :rows="item.rows"
        :placeholder="item.placeholder"
        :style="'width:' + item.width + '%'"
        :disabled="item.disabled"
        v-model="Form.Data[item.name]"
      ></el-input>
      <!-- switch开关 -->
      <el-switch
        v-else-if="item.type == 'switch'"
        :active-color="item.activeColor"
        :inactive-color="item.inactiveColor"
        :active-text="item.activeText"
        :inactive-text="item.inactiveText"
        :style="'width:' + item.width + '%'"
        :disabled="item.disabled"
        v-model="Form.Data[item.name]"
        :validate-event="false"
      ></el-switch>
      <!-- radio单选框 -->
      <el-radio-group
        v-else-if="item.type == 'radio'"
        v-model="Form.Data[item.name]"
        :disabled="item.disabled"
        :style="'width:' + item.width + '%'"
      >
        <div v-if="item.radioType == 'primary'">
          <el-radio
            v-for="item1 in item.options"
            :key="item1.value"
            :label="item1.value"
          >{{item1.label}}</el-radio>
        </div>
        <div v-else-if="item.radioType == 'button'">
          <el-radio-button
            v-for="item1 in item.options"
            :key="item1.value"
            :label="item1.value"
          >{{item1.label}}</el-radio-button>
        </div>
        <div v-else-if="item.radioType == 'borderButton'">
          <el-radio
            border
            v-for="item1 in item.options"
            :key="item1.value"
            :label="item1.value"
          >{{item1.label}}</el-radio>
        </div>
      </el-radio-group>
      <!-- checkbox多选框 -->
      <el-checkbox-group
        v-else-if="item.type == 'checkbox'"
        v-model="Form.Data[item.name]"
        :style="'width:' + item.width + '%'"
        :disabled="item.disabled"
      >
        <div v-if="item.checkboxType == 'primary'">
          <el-checkbox
            v-for="item1 in item.options"
            :key="item1.value"
            :label="item1.value"
          >{{item1.label}}</el-checkbox>
        </div>
        <div v-else-if="item.checkboxType == 'button'">
          <el-checkbox-button
            v-for="item1 in item.options"
            :key="item1.value"
            :label="item1.value"
          >{{item1.label}}</el-checkbox-button>
        </div>
        <div v-else-if="item.checkboxType == 'borderButton'">
          <el-checkbox
            border
            v-for="item1 in item.options"
            :key="item1.value"
            :label="item1.value"
          >{{item1.label}}</el-checkbox>
        </div>
      </el-checkbox-group>
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

      <!-- DatePicker日期选择器 -->
      <el-date-picker
        v-else-if="item.type == 'DatePicker'"
        v-model="Form.Data[item.name]"
        :type="item.datePickerType"
        placeholder="选择日期"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        unlink-panels
        format="yyyy 年 MM 月 dd 日"
        :value-format="item.format"
      ></el-date-picker>

      <!-- 动态文本 -->
      <el-tag type="info" v-else-if="item.type == 'text'">{{Form.Data[item.name]}}</el-tag>

      <!-- 静态文本 -->
      <p
        :style="{color:item.textColor, fontSize:(item.textSize + 'px'), marginLeft:(item.marginLeft + 'px')}"
        v-if="item.type == 'staticText'"
      >{{item.content}}</p>
    </el-form-item>
    <!-- 提交表单 -->
    <el-form-item v-if="Form.isShowButton">
      <el-button type="primary" @click="submitForm('Form')">{{Form.submitText}}</el-button>
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
      Form: {},
      params: {}
    };
  },
  created() {
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
        if (ItemNode.type == "checkbox" && ItemNode.checkboxType != "signal") {
          this.$set(this.Form.Data, ItemNode.name, []);
        } else {
          this.$set(this.Form.Data, ItemNode.name, "");
        }

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
        // 遍历查找被联动的下拉框
        if (ItemNode.isLinkOptions) {
          var key = ItemNode.linkOptionsKey;
          for (var j in this.Form.Item) {
            if (this.Form.Item[j].key == key) {
              this.Form.Item[j].isLinked = true;
            }
          }
        }
        // 元素类型为下拉框且不是被联动，获取数据
        if (
          (ItemNode.type == "select" && ItemNode.isLinked == false) ||
          ItemNode.type == "checkbox"
        ) {
          if (ItemNode.remoteURL == "" || ItemNode.remoteURL == null) {
            ItemNode.remote = false;
          } else {
            ItemNode.remote = true;
            // 设置远程方法的参数
            var jsonData = {};
            for (var j in ItemNode.remoteParmas) {
              jsonData[ItemNode.remoteParmas[j].key] =
                ItemNode.remoteParmas[j].value;
            }
            // 调用远程方法
            this.remoteSelectDataFunction(jsonData, ItemNode.remoteURL, i);
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
        // 验证规则通过
        if (valid) {
          this.$emit("submit", this.Form.Data);
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
    remoteSelectDataFunction(requestData, remoteURL, index) {
      // 重置
      this.Form.Item[index].options = [
        {
          label: "",
          value: ""
        }
      ];
      // this.Form.Data[this.Form.Item[index].name] = "";
      post(remoteURL, requestData).then(res => {
        this.Form.Item[index].options = res.extend.classList;
      });
    },
    /**
     * @description 选择下拉框数据后触发的事件
     * 如果该下拉框为联动类型，则调用方法获取联动的下拉框的数据，否则什么也不做
     * @param value 下拉框选择的数据
     * @param isLinkOptions 是否为联动类型的下拉框
     * @param linkOptionsKey 联动的下拉框的key值
     */
    changeSelect(value, isLinkOptions, linkOptionsKey) {
      if (!isLinkOptions) {
        return;
      }
      var requestData = {};
      requestData.selectedParam = value;

      // 根据key寻找联动的下拉框
      for (var i in this.Form.Item) {
        if (this.Form.Item[i].key == linkOptionsKey) {
          // 设置远程方法的参数
          for (var j in this.Form.Item[i].remoteParmas) {
            requestData[this.Form.Item[i].remoteParmas[j].key] = this.Form.Item[
              i
            ].remoteParmas[j].value;
          }
          this.remoteSelectDataFunction(
            requestData,
            this.Form.Item[i].remoteURL,
            i
          );
          break;
        }
      }
    },
    // 以下方法是提供给外部组件调用

    /**
     * @description 根据传入的对象，给表单的各个元素赋值
     */
    setFormData(row) {
      try {
        for (var key in this.Form.Data) {
          if(row[key]){
            this.Form.Data[key] = row[key];
          }
        }
      } catch (e) {
        console.log(e);
      }
    },
    /**
     * @description 设置参数，存放临时参数
     */
    setParams(key, value) {
      this.params[key] = value;
    },
    getParams(key) {
      return this.params[key];
    },
    /**
     * @description 提交表单
     * formName 表单名字
     */
    getFormData() {
      return this.Form.Data;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
