<template>
  <div>
    <div class="container">
      <el-button v-if="finishedNum!=-1" type="primary" plain class="beginButton" @click="begin">点击重新开始</el-button>
      <el-button v-else type="primary" plain class="beginButton" @click="begin">点击开始</el-button>
      <div class="scores" v-if="finishedNum!=-1">
        <el-row>
          <el-tag effect="plain" type="success">完成的题目数为：{{finishedNum}}</el-tag>
        </el-row>
        <el-row>
          <el-tag effect="plain" type="danger">最高记录为：{{gameRecord}}</el-tag>
        </el-row>
      </div>
    </div>

     <div v-for="i in testArray" :key="i">
       {{i}}
    </div>

  </div>
</template>

<script>
export default {
  created() {
    this.init();
  },
  components: {},
  data() {
    return {
         testArray:[],
      finishedNum: -1,
      gameRecord:-1
    };
  },
  methods: {
    init() {
       //
      for(var i=0;i<500;i++){
        this.testArray.push(i);
      }
      //
      if (this.$route.query.finishedNum) {
        this.finishedNum = Number(this.$route.query.finishedNum);
        // 把游戏记录持久化保存
        if(localStorage.getItem('gameRecord')){
          this.gameRecord = Number(localStorage.getItem('gameRecord'));
          if(this.gameRecord<this.finishedNum){
            localStorage.setItem('gameRecord',this.finishedNum);
            this.gameRecord = this.finishedNum
          }
        }
        else{
           localStorage.setItem('gameRecord',this.finishedNum);
           this.gameRecord = this.finishedNum;
        }
        this.$message.success("游戏结束!");
      }
    },
    begin() {
      this.$router.push({
        path: "/test"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
div.container {
  // width: 10em;
  margin: 10em auto;
  text-align: center;
  .beginButton {
    // width: 10em;
    font-size: 2em;
  }
  div.scores {
    margin: 1em;
    .el-tag{
      font-size: 1em;
    }
  }
}
</style>