 <template>
  <!-- 
  表单设计右边的控制模块
  -->
  <el-tabs v-model="activeName" type="border-card" :stretch="true">
    <el-tab-pane label="字段属性" name="item">
      <itemProperty></itemProperty>
    </el-tab-pane>
    <el-tab-pane label="表单属性" name="form">
      <formProperty></formProperty>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import {itemProperty} from "@/components/Form/rightControl/itemProperty"
import {formProperty} from "@/components/Form/rightControl/formProperty"
export default {
  components: {
    itemProperty,
    formProperty
  },
  data() {
    return {
      // 右边操作属性的标签切换的名字
      activeName: "item",
    };
  },
  methods: {
    /**
     * @description 改动下拉框的选项值
     * @param index 元素的索引值
     * @param type 改动操作的类型（add:添加元素；delete：删除元素）
     */
    changeSelectOption(index, type) {
      switch (type) {
        case "add":
          this.Form.Item[index].options.push({
            label: "",
            value: ""
          });
          break;
        case "delete":
          this.Form.Item[index].options.splice(
            this.Form.Item[index].options.length - 1,
            1
          );
      }
    },
    /**
     * @description 改动下拉框获取远程数据的参数
     * @param index 元素的索引值
     * @param type 改动操作的类型（add:添加元素；delete：删除元素）
     */
    changeSelectParams(index, type) {
      switch (type) {
        case "add":
          this.Form.Item[index].remoteParmas.push({
            key: "",
            value: ""
          });
          break;
        case "delete":
          this.Form.Item[index].remoteParmas.splice(
            this.Form.Item[index].remoteParmas.length - 1,
            1
          );
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
