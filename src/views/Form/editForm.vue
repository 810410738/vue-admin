<template>
  <div>
    <headTop></headTop>
    <el-row style="height: 100%;">
      <el-row>
        <el-button type="info" size="small" @click="returnBack" class="returnButton">返回</el-button>
        <h3>{{this.$route.query.formName}} - 表单设计</h3>
      </el-row>
      <!-- 自己写的表单生成器 -->
      <el-row>
        <!-- 基础控件 -->
        <el-col :span="3" class="primaryButton">
          <span class="primaryText">基础字段</span>
          <div class="aLine"></div>
          <el-row>
            <el-button type="primary" plain size="mini">普通输入框</el-button>
            <el-button type="primary" plain size="mini">下拉框</el-button>
          </el-row>
        </el-col>
        <!-- 表单效果 -->
        <el-col :span="15" class="mainFrom">
          <el-row>
            <div class="controlButton">
              <el-button type="primary" size="small">保存</el-button>
              <el-button type="info" size="small">清空</el-button>
            </div>
          </el-row>
          <el-row>
            <el-form
              :label-position="Form.labelPosition"
              :label-width="Form.labelWidth"
              :model="Form.Data"
              :rules="Form.rules"
              :size="Form.size"
              ref="Form"
            >
            <div class="formItem" v-for="(item, index) in Form.Item" :key="item.key" @click="editItem(index)" :class="{'clickFormItem':item.isClick}">
              <el-form-item :label="item.label" :prop="item.name">
                <el-input  v-if="item.type == 'input'" :placeholder="item.placeholder"></el-input>
                <el-select v-else-if="item.type == 'select'" :placeholder="item.placeholder"></el-select>
              </el-form-item>
            </div>
            </el-form>
          </el-row>
        </el-col>
        <!-- 右边编辑属性 -->
        <el-col :span="4" :offset="1">
          <span>
            字段属性
          </span>
          <el-form v-for="item in Form.Item" :key="item.key" v-show="item.isClick">
            <el-form-item label="字段名字">
              <el-input v-model="item.name"></el-input>
            </el-form-item>
            <el-form-item label="标题">
              <el-input v-model="item.label"></el-input>
            </el-form-item>
            <el-form-item label="输入提示">
              <el-input v-model="item.placeholder"></el-input>
            </el-form-item>
             <el-form-item label="宽度">
              <el-input></el-input>
            </el-form-item>
             <el-form-item label="校验">
              <el-input></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row>
        <fm-making-form
          ref="makingform"
          style="height: 600px;"
          preview
          generate-code
          generate-json
          clearable
        >
          <template slot="action">
            <el-button type="primary" icon="el-icon-upload" size="small" @click="save">保存</el-button>
          </template>
        </fm-making-form>
      </el-row>
    </el-row>
  </div>
</template>

<script>
import headTop from "@/components/headTop";
import { saveFormData, getFormData,getUserFormData } from "@/api/getFormData";
export default {
  components: {
    headTop
  },
  data() {
    return {
      Form: {},
      // 请求表单数据的数据
      requestFormData: {
        formId: ""
      },
      // 表单数据
      getFormData: {}
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    /**
     * @description 初始化，如果不是新增的表单，需要获取服务器的表单数据
     */
    init() {
      // formId存在才执行
      getUserFormData().then(res=>{
        this.Form = res.extend.userInfoForm;
      });
      if (this.$route.query.formId) {
        this.requestFormData.formId = this.$route.query.formId;
        getFormData(this.requestFormData).then(res => {
          this.getFormData = res.extend;
          this.$refs.makingform.setJSON(this.getFormData);
        });
      }
    },
    /**
     * @description 点击元素，右边可以编辑属性
     * @param index 元素的索引值
     */
    editItem(index){
      // 所有元素都重置为未点击的状态
      for(var i in this.Form.Item){
        this.Form.Item[i].isClick = false;
      }
      this.Form.Item[index].isClick = true;
    },
    /**
     * @description 返回上一级
     */
    returnBack() {
      this.$router.go(-1);
    },
    /**
     * @description 保存数据
     */
    save() {
      console.log(this.$refs.makingform.getJSON());
      saveFormData(this.$refs.makingform.getJSON()).then(res => {
        // 上传数据成功
        this.$message({
          message: "保存成功",
          type: "success"
        });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.returnButton {
  float: left;
  margin: 15px 0 0 20px;
}
// 基础字段
.primaryButton {
  span.primaryText {
    margin-left: 1em;
  }
  div.aLine {
    margin: 1em 0;
    background-color: #e6e3e3;
    height: 1px;
  }
}
// 表单界面
.mainFrom{
  .controlButton{
    margin-left: 4em;
    margin-bottom: 1em;
  }
  .formItem{
    margin-bottom: 1em;
    border:2px solid white;
  }
  .formItem:hover{
    border-color: #409EFF;
  }
  .clickFormItem{
    border-color: #409EFF;
  }
}

</style>