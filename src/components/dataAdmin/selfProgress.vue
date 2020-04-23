<template>
  <el-progress 
  :text-inside="true" 
  :percentage="progressNumber" 
  :stroke-width="26"
  :color="customColorMethod"
  ></el-progress>
</template>

<script>
export default {
  name: "selfProgress",
  props: {
    progressNumber: {
      type: Number,
      required: true,
      default: 0
    }
  },
  methods: {
    customColorMethod(percentage) {
      if (percentage < 30) {
        return "#909399";
      } else if (percentage < 100) {
        return "#e6a23c";
      } else {
        return "#67c23a";
      }
    }
  }
};
</script>


<style lang="scss" scoped>
</style>
