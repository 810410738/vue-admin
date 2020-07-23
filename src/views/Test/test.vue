<template>
  <div>
    <div class="target">
      <el-tag>{{target}}</el-tag>
    </div>
    <div class="main">
      <el-button
        v-for="(item,index) in array"
        :key="item.number"
        class="div"
        @click="clickOneDiv(item.number, index)"
        :class="{'isClickButton':item.isClick,'isHidden':!item.isShow}"
      >{{item.number}}</el-button>
    </div>
    <div class="time">
      <el-tag type="danger"> {{showTime}} </el-tag>
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
      // 完成的题目数量
      finishedNum:0,
      // 目标结果
      target: 10,
      // 计算的结果
      result: 0,
      // 最大能点击的方块数量
      maxClickCount: 3,
      // 延迟显示方块的时间
      delayTime: 1000,
      // 总时长
      Time:20,
      array: []
    };
  },
  methods: {
    init() {
      this.target = this.randomNum(3, 17);
      for (var i = 0; i < 9; i++) {
        this.array.push({
          number: i + 1,
          isClick: false,
          isShow: true
        });
      }
      // 开始计时
      var timeVar = setInterval(() => {
        this.Time-=0.1;
        if(this.Time <=0){
          this.Time = 0;
          clearInterval(timeVar);
          this.gameOver();
        }
      }, 100);
    },
    /**
     * 点击按钮触发的事件
     * 1、让对应的按钮改变颜色
     * 2、累计点击的数字之和
     * @param index
     * @param number
     */
    clickOneDiv(number, index) {
      // 从未点击到已点击的状态
      if (!this.array[index].isClick) {
        if (this.maxClickCount == 0) {
          this.$message.warning("不能继续点击");
          return;
        }
        this.array[index].isClick = true;
        this.maxClickCount--;
        this.result += number;
        this.watchResult();
      }
      // 取消点击
      else {
        this.array[index].isClick = false;
        this.maxClickCount++;
        this.result -= number;
      }
    },
    /**
     * 监控result结果值的变化
     */
    watchResult() {
      // 完成一道题
      if (this.result == this.target) {
        this.$notify({
          title:'提示',
          message:'挑战成功',
          duration:500
        })
        for (var i in this.array) {
          this.array[i].isShow = !this.array[i].isClick;
          // 隐藏了该元素，延迟一段时间后重新显示
          if (!this.array[i].isShow) {
            this.show(this.array[i]);
          }
        }
        this.finishedNum++;
        this.next();
      }
    },
    randomNum(minNum, maxNum) {
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
    },
    show(item) {
      setTimeout(function() {
        item.isShow = true;
        item.isClick = false;
      }, this.randomNum(this.delayTime, this.delayTime*2));
    },
    /**
     * 下一题
     */
    next() {
      this.target = this.randomNum(3, 17);
      this.result = 0;
      this.maxClickCount = 3;
      for (var i in this.array) {
        this.array[i].isClick = false;
      }
    },
    /**
     * 游戏结束
     */
    gameOver(){
      this.$router.push({
        path:'/testBegin',
        query:{
          finishedNum:this.finishedNum
        }
      })
    }
  },
  computed: {
    showTime() {
      return (this.Time).toFixed(2);
    }
  },
};
</script>
<style lang="scss" scoped>
$divWidth: 10em;
$divMargin: 0.2em;
// 每行的块数
$divCount: 3;
.target {
  margin: 1em auto;
  width: $divWidth * $divCount + $divMargin * $divCount;
  text-align: center;
  .el-tag{
    font-size: 3em;
    line-height: 1em;
    height: 1em;
  }
  
}
div.main {
  margin: 0 auto;
  width: $divWidth * $divCount;
  height: $divWidth * $divCount + $divMargin * $divCount * 2;
  .div {
    float: left;
    width: $divWidth;
    height: $divWidth;
    margin: $divMargin;

  }
  .isClickButton {
    background: #9c9c9c;
  }
  .isHidden {
    visibility: hidden;
  }
}
div.time{
  margin: 0 auto;
  width: $divWidth * $divCount;
  text-align: center;
}
</style>