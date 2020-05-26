<template>
 <div class="control">
          <div class="buttonGroup">
            <el-button round size="small">个人信息</el-button>
             <el-button round size="small">返回导航主页</el-button>
            <el-button round size="small" type="danger">退出系统</el-button>
          </div>
        </div>
</template>

<script>
export default {
  created() {
   
  },
  components: {
   
  },
  data() {
    return {};
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