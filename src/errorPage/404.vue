<template>
  <div class="main">
    <div class="title"> 
      404 找不到页面
    </div> 
    <div class="button">
      <el-button type="primary" round @click="returnIndex">返回主页</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name:'pageNotFound',
  created() {
    this.init();
  },
  components: {
   
  },
  data() {
    return {};
  },
  methods: {
    init() {
    },
    /**
     * @description 返回主页
     */
    returnIndex(){
      this.$router.push({
        path:'/index'
      })
    }
  }
};
</script>
<style lang="scss" scoped>
div.main{
  background: linear-gradient(60deg, rgba(84,58,183,1) 0%, rgba(0,172,193,1) 100%);
  width: 100%;
  height: 100%;
  position: fixed;
  div.title{
  text-align: center;
  font-size: 4em;
  color: white;
  width: 50%;
  margin:4em auto 0 auto;
}
  div.button{
    text-align: center;
    width: 50%;
    margin:0.5em auto 0 auto;
    .el-button{
      width: 20em;
    }
  }
}

</style>