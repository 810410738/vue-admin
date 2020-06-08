<template>
<div>
  {{test}}
</div>
</template>

<script>
export default {
  created() {
    debugger
    console.log(this.$store.state.Form.formData);
   this.test = this.$store.state.Form.formData.Item;
  },
  components: {
   
  },
  data() {
    return {
      test:''
    };
  },
  methods: {
   
  }
};
</script>
<style lang="less" scoped>
div.control{
  width: 13em;
  // height: 100%;
  div.buttonGroup{
    width: 10em;
    margin: 0 auto;
    .el-button{
      display: block;
      margin: 0 0 0.5em 0;
      width:10em;
      text-align: center;
    }
  }
}
</style>