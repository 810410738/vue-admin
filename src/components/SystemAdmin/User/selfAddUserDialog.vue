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
      <el-form
        :disabled="userInfoForm.disabled"
        :label-position="userInfoForm.labelPosition"
        :label-width="userInfoForm.labelWidth"
        :model="userInfoForm.Data"
        :rules="userInfoForm.userInfoFormRules"
        :size="userInfoForm.size"
        ref="userInfoForm"
      >
        <el-form-item label="用户编号" prop="userNum">
          <el-input v-model="userInfoForm.Data.userNum" placeholder="请输入8位用户编号"></el-input>
        </el-form-item>
        <el-form-item label="登录账号" prop="loginAccount">
          <el-input v-model="userInfoForm.Data.loginAccount" placeholder="请输入UASS账号（非必填）"></el-input>
        </el-form-item>
        <el-form-item label="用户姓名" prop="userName">
          <el-input v-model="userInfoForm.Data.userName" placeholder="请输入用户姓名"></el-input>
        </el-form-item>
        <el-form-item label="所属一级机构" prop="primaryClass">
          <el-select
            v-model="userInfoForm.Data.primaryClass"
            placeholder="请选择所属一级机构"
            @change="getAllSecoByPrimData"
          >
            <el-option v-for="item in primaryAllClass" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属二级机构" prop="secondaryClass">
          <el-select v-model="userInfoForm.Data.secondaryClass" placeholder="请选择所属二级机构">
            <el-option v-for="item in secondAllClass" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否为党员" prop="isPartyMember">
          <el-select v-model="userInfoForm.Data.isPartyMember" placeholder="请选择是否为党员">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否为主要负责人" prop="isLeader">
          <el-select v-model="userInfoForm.Data.isLeader" placeholder="请选择是否为党员">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="归属子系统" prop="systemIdentify">
          <el-select v-model="userInfoForm.Data.systemIdentify" placeholder="请选择所归属的子系统"></el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="userInfoForm.Data.remark"></el-input>
        </el-form-item>
        <el-form-item>
          <!-- <el-button @click="handleClose()" size="medium">关闭</el-button> -->
          <el-button type="primary" @click="save('userInfoForm')" v-if="type!='2'" size="medium">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getAllPrimaryClass, getAllSecoByPrim } from "@/api/getCommonData";
import { getUserFormData } from "@/api/getFormData";
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
      // 表单设置
      userInfoForm: {},
      // 一级机构
      primaryAllClass: [],
      // 二级机构
      secondAllClass: [],
      // 用户的信息
      getUserData: {},
      // 表单数据
      getFormData: {}
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    /**
     * @description 初始化，获取表单数据，然后如果type为1或2，则获取用户的数据,如果type为2，则禁止编辑
     */
    init() {
      getUserFormData(this.requestFormData).then(res => {
        this.userInfoForm = res.extend.userInfoForm;
        if (this.type == "1" || this.type == "2") {
          getUserInfo(this.selfUserData).then(res1 => {
            this.getUserData = res1.extend.user;
            this.setUserFormData();
          });
        } else {
          this.getUserData = {};
        }
        // 禁止编辑
        if (this.type == 2) {
          this.userInfoForm.disabled = true;
        }
      });
      /**
       * @description 获取所有一级分类
       */
      getAllPrimaryClass({}).then(res => {
        this.primaryAllClass = res.extend.classList;
      });
    },
    /**
     * @description 设置用户表单的用户数据
     */
    setUserFormData() {
      Object.keys(this.getUserData).forEach(key => {
        this.userInfoForm.Data[key] = this.getUserData[key];
      });
    },
    /**
    @description 关闭对话框
     */
    handleClose() {
      this.$emit("closeDialog");
    },
    /**
     * @description 保存用户信息，提交到服务器
     * @param formName 表单的名字
     */
    save(formName) {
      this.$refs[formName].validate(valid => {
        // 通过验证
        if (valid) {
          // 提交用户数据到服务器
          this.$message({
            message: "提交成功",
            type: "success"
          });
        } else {
          return false;
        }
      });
    },
    /**
     * @description 获取所有二级分类
     */
    getAllSecoByPrimData(value) {
      this.secondAllClass = [];
      // 获取数据
      var jsonData = {};
      jsonData.primaryClass = value;
      getAllSecoByPrim(jsonData).then(res => {
        this.secondAllClass = res.extend.classList;
      });
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
$formItemWidth: 100%;
.el-select {
  width: $formItemWidth;
}
</style>
