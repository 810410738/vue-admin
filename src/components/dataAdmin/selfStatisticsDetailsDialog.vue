 <template>
  <!-- 各网点的统计信息的对话框 -->
  <el-dialog
    title="各网点详情显示"
    :visible.sync="isShow"
    width="60%"
    :before-close="handleClose"
    center
  >
   <el-table :data="getTableData" highlight-current-row style="width: 100%" stripe>
      <el-table-column property="deptName" label="网点/部门名称" ></el-table-column>
      <el-table-column property="done" label="正常参与问卷人数" ></el-table-column>
      <el-table-column property="undone" label="未参与问卷人数" ></el-table-column>
      <el-table-column property="reject" label="问卷驳回异常人数" ></el-table-column>
      <el-table-column property="unusual" label="问卷异常提交人数"></el-table-column>
      <el-table-column label="完成状态" width="150">
         <template slot-scope="scope">
           <selfProgress :progressNumber="scope.row.progress"></selfProgress>
        </template>
      </el-table-column>
    </el-table>
  <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose()">取 消</el-button>
      <el-button type="primary" @click="init()">刷 新</el-button>
    </div>
  </el-dialog>
</template>

<script>
import selfProgress from "@/components/dataAdmin/selfProgress";
import {getDeptData} from "@/api/getDataAdminData";
export default {
  components:{
    // 进度条
    selfProgress
  },
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
      // 表格的数据
      getTableData: []
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    /**
     * @description 初始化，获取表格显示的数据
     */
    init() {
      getDeptData(this.selfStatisticsData).then(res => {
        this.getTableData = res.extend.dataList;
      });
    },
    /**
    @description 关闭对话框
     */
    handleClose() {
      this.$emit("closeDialog");
    },

  }
};
</script>


<style lang="scss" scoped>

</style>
