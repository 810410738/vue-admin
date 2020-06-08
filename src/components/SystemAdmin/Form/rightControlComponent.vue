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
import itemProperty from "@/components/Form/rightControl/itemProperty"
import formProperty from "@/components/Form/rightControl/formProperty"
export default {
  data() {
    return {
      // 右边操作属性的标签切换的名字
      activeName: "item",
    };
  },
  components: {
    itemProperty,
    formProperty
  },
  methods: {

  }
};
</script>

<style lang="scss" scoped>
</style>
