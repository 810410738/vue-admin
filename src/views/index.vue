<template>
  <!-- 登陆成功后的网站门户页面 -->
  <div class="index">
    <headTop></headTop>
    <div class="middle">
      <div class="title">深圳建行内部网上办事大厅</div>
      <div class="cards">
        <el-card
          shadow="hover"
          v-for="item in getSystemData"
          :key="item.id"
          @click.native="enterSystem(item.systemIdentify)"
        >
          <div slot="header" class="clearfix">
            <span>{{item.name}}</span>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import headTop from "@/components/headTop";
export default {
  components: {
    headTop
  },
  data() {
    return {
      getSystemData: [
        {
          systemIdentify: "1",
          name: "线上评议"
        },
        {
          systemIdentify: "2",
          name: "员工行为排查"
        },
        {
          systemIdentify: "3",
          name: "对公客户信息维护"
        },
        {
          systemIdentify: "4",
          name: "人力资源投票统计"
        }
      ]
    };
  },
  methods: {
    /**
     * @description 根据系统标识进入不同的系统
     * @param systemIdentify 系统标识
     */
    enterSystem(systemIdentify) {
      this.$router.push({
        path: "/main",
        query: {
          systemIdentify: systemIdentify
        }
      });
    }
  }
};
</script>


<style lang="scss" scoped>
div.index {
  background: url("../assets/img/bgs/bg.jpg") no-repeat center center;
  width: 100%;
  height: 100%;
  position: fixed;
  .middle {
    width: 50%;
    margin: 0 auto;
    .title {
      margin-top: 4em;
      font-size: 2em;
      letter-spacing: 1em;
      text-align: center;
      color: #fff;
      font-weight: bold;
      text-shadow: 0 2px 8px rgba(47, 53, 87, 0.2);
    }
    .cards {
      margin: 2em auto;
      width: 90%;
      .el-card {
        box-sizing: border-box;
        display: inline-block;
        height: 10em;
        width: 48%;
        padding: 1em;
        margin: 0 1% 1% 1%;
        background-color: rgba(0, 0, 0, 0.1);
        border: 0px;
        span {
          color: #fff;
          font-size: 1em;
          font-weight: bold;
        }
      }
      .el-card:hover{
         box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4,
          0 0 100px #03e9f4;
         background-color: rgba(3, 233, 244, 0.1);
      }
    }
  }
}
</style>
