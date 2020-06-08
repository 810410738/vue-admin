<template>
   <!-- 
      下拉选择子系统的组件
     -->
  <div>
    <label>子系统：</label>
    <el-select size="small" v-model="systemIdentify">
      <el-option
        v-for="item in systemIdentifyClass"
        :key="item.label"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
import { getLeafDictByCond } from "@/api/getCommonData";
export default {
  data() {
    return {
      // 所有系统分类
      systemIdentifyClass: [
        {
          label: "默认全部",
          value: ""
        }
      ],
      requestClassData: {
        selectedParam: "1",
        dictType: "system_identify"
      },
      // 查找组件封装数据
      systemIdentify: ""
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      /**
       * @description 获取所有子系统分类
       */
      getLeafDictByCond(this.requestClassData).then(res => {
        this.systemIdentifyClass = [
          {
            label: "默认全部",
            value: ""
          }
        ];
        this.systemIdentifyClass.push.apply(
          this.systemIdentifyClass,
          res.extend.classList
        );
      });
    },
    /**
     * @description 获取选择的子系统
     */
    getSystemIdentify() {
      return this.systemIdentify;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
