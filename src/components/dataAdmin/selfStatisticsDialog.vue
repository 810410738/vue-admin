 <template>
  <!-- 问卷统计信息的对话框 -->
  <el-dialog
    title="问卷完成情况统计信息"
    :visible.sync="isShow"
    width="40%"
    @open="open()"
    :before-close="handleClose"
    center
  >
    <!--统计图-->
    <div ref="bar_dv" class="chartDiv"></div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose()">取 消</el-button>
      <el-button type="primary" @click="init()">刷 新</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getCompletionStatus } from "@/api/getDataAdminData";
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    selfStatisticsData: {
      type: Object,
      default: false
    }
  },
  data() {
    return {
      // 统计图表的数据
      getChartData: []
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    /**
     * @description 初始化，获取图表显示的数据
     */
    init() {
      getCompletionStatus(this.selfStatisticsData).then(res => {
        this.getChartData = res.extend.chartData;
      });
    },
    open() {
      this.$nextTick(function() {
        this.drawLine();
      });
    },
    /**
    @description 关闭对话框
     */
    handleClose() {
      this.$emit("closeDialog");
    },
    /**
     * @description 使用echarts画扇形统计图
     */
    drawLine() {
      var bar_dv = this.$refs.bar_dv;
      var myChart = this.$echarts.init(bar_dv);
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)"
        },
        series: [
          {
            name: "数据展示",
            type: "pie",
            radius: "55%",
            data: this.getChartData
          }
        ]
      });
    }
  }
};
</script>


<style lang="scss" scoped>
.chartDiv {
  width: 600px;
  height: 400px;
  // margin:0 auto 0 auto;
}
</style>
