 <template>
  <!-- 对话框 -->
  <!-- 新增用户,查看用户，修改用户信息共用组件 -->
  <div>
    <el-dialog
      :title="buldTitle"
      :visible.sync="isShow"
      width="40%"
      :before-close="handleClose"
      :destroy-on-close="true"
      @open="init"
      center
    >
      <el-row>
        <fm-generate-form
          :data="getFormData"
          :value="getUserData"
          :remote="remoteFuncs"
          :remote-option="optionData"
          ref="generateForm"
        ></fm-generate-form>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose()">关 闭</el-button>
        <el-button type="primary" @click="save()" v-if="type!='2'">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAllPrimaryClass, getAllSecoByPrim } from "@/api/getCommonData";
import { getFormData } from "@/api/getFormData";
import { getUserInfo } from "@/api/getUserData";
export default {
  components: {},
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    selfUserData: {
      type: Object,
      default: false
    },
    // type 0:新增用户；1：修改用户；2：查看用户
    type: {
      type: String,
      defalut: "0"
    }
  },
  data() {
    return {
      // 用户的信息
      getUserData: {},
      // 表单数据
      getFormData: {},
      // 动态下拉的option数据
      optionData: {
        // 一级分类
        primaryOption: [
            {value: '1111', label: '1111'},
          {value: '2222', label: '2222'},
          {value: '3333', label: '3333'}
        ],
        // 二级分类
        secondOption: []
      },
      remoteFuncs:{}
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    /**
     * @description 初始化，获取表单数据，然后如果type为1，则获取新增用户的数据,如果type为2，则禁止编辑
     */
    init() {
      getFormData(this.requestFormData).then(res => {
        this.getFormData = res.extend;
        if (this.type == "1" || this.type == "2") {
          getUserInfo(this.selfUserData).then(res1 => {
            this.getUserData = res1.extend.user;
          });
        } else {
          this.getUserData = {};
        }
        // 禁止编辑
        if (this.type == 2) {
          for (var i in this.getFormData.list) {
            this.getFormData.list[i].options.disabled = true;
          }
        }
      });
      /**
       * @description 获取所有一级分类
       */
      // getAllPrimaryClass({}).then(res => {
      //   this.optionData.primaryOption = [];
      //   var resultList = res.extend.classList;
      //   for (var i in resultList) {
      //     this.optionData.primaryOption.push({
      //       label: resultList[i],
      //       value: resultList[i]
      //     });
      //   }
      // });
    },
    /**
    @description 关闭对话框
     */
    handleClose() {
      this.$emit("closeDialog");
    },
    /**
     * @description 保存用户信息，提交到服务器
     */
    save() {
      this.$refs.generateForm
        .getData()
        .then(data => {
          console.log(JSON.stringify(data));
        })
        .catch(e => {});
    }
  },
  computed: {
    buldTitle() {
      switch (this.type) {
        case "0":
          return "新增用户";
        case "1":
          return "修改信息";
        case "2":
          return "查看信息";
      }
    }
  }
};
</script>


<style lang="scss" scoped>
</style>
