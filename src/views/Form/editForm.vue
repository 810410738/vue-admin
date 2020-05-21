<template>
  <div>
    <headTop></headTop>
    <el-row style="height: 100%;">
      <el-row>
        <el-button type="info" size="small" @click="returnBack" class="returnButton">返回</el-button>
        <h3>{{this.$route.query.formName}} - 表单设计</h3>
      </el-row>
      <!-- 自己写的表单生成器 -->
      <el-row class="mainEditForm">
        <!-- 左边基础控件 -->
        <el-col :span="3">
          <leftAddButtonComponent></leftAddButtonComponent>
        </el-col>
        <!-- 表单效果 -->
        <el-col :span="15" class="mainForm">
          <el-row>
            <mainControlButtonComponent ></mainControlButtonComponent>
          </el-row>
          <el-row>
            <el-form
              :label-position="this.$store.state.Form.formData.labelPosition"
              :label-width="this.$store.state.Form.formData.labelWidth + 'px'"
              :model="this.$store.state.Form.formData.Data"
              :rules="this.$store.state.Form.formData.rules"
              :size="this.$store.state.Form.formData.size"
              ref="Form"
            >
              <transition-group tag="div">
                <div
                  class="formItem"
                  v-for="(item, index) in this.$store.state.Form.formData.Item"
                  :key="item.key"
                  @click="editItem(index)"
                  :class="{'clickFormItem':item.isClick}"
                >
                  <!-- 各个元素的操作按钮（删除） -->
                  <div class="itemEdit" v-show="item.isClick">
                    <!-- 删除 -->
                    <el-button
                      type="primary"
                      icon="el-icon-delete"
                      circle
                      size="mini"
                      @click="deleteOneItem(index)"
                    ></el-button>
                    <!-- 复制多一份 -->
                    <el-button
                      type="success"
                      icon="el-icon-copy-document"
                      circle
                      size="mini"
                      @click="copyOneItem(index)"
                    ></el-button>
                    <!-- 上移 -->
                    <el-button
                      icon="el-icon-upload2"
                      circle
                      size="mini"
                      @click="moveOneItem(index,'up')"
                    ></el-button>
                    <!-- 下移 -->
                    <el-button
                      icon="el-icon-download"
                      circle
                      size="mini"
                      @click="moveOneItem(index,'down')"
                    ></el-button>
                  </div>
                  <el-form-item :label="item.label" :prop="item.name">
                    <!-- 单行输入框 -->
                    <el-input
                      v-if="item.type == 'input'"
                      :placeholder="item.placeholder"
                      :style="'width:' + item.width + '%'"
                      :disabled="item.disabled"
                    ></el-input>
                    <!-- 多行输入框 -->
                    <el-input
                      v-else-if="item.type == 'inputTextarea'"
                      type="textarea"
                      :rows="item.rows"
                      :placeholder="item.placeholder"
                      :style="'width:' + item.width + '%'"
                      :disabled="item.disabled"
                    ></el-input>
                    <!-- 单项下拉框 -->
                    <el-select
                      v-else-if="item.type == 'select'"
                      :placeholder="item.placeholder"
                      :style="'width:' + item.width + '%'"
                      :disabled="item.disabled"
                    ></el-select>
                    <!-- radio单选框 -->
                    <el-radio-group
                      v-else-if="item.type == 'radio'"
                      :disabled="item.disabled"
                      :style="'width:' + item.width + '%'"
                    >
                      <div v-if="item.radioType == 'primary'">
                        <el-radio
                          v-for="item1 in item.options"
                          :key="item1.value"
                          :label="item1.value"
                        >{{item1.label}}</el-radio>
                      </div>
                      <div v-else-if="item.radioType == 'button'">
                        <el-radio-button
                          v-for="item1 in item.options"
                          :key="item1.value"
                          :label="item1.value"
                        >{{item1.label}}</el-radio-button>
                      </div>
                      <div v-else-if="item.radioType == 'borderButton'">
                        <el-radio
                          border
                          v-for="item1 in item.options"
                          :key="item1.value"
                          :label="item1.value"
                        >{{item1.label}}</el-radio>
                      </div>
                    </el-radio-group>
                    <span class="itemName">{{item.name}}</span>
                  </el-form-item>
                </div>
              </transition-group>
            </el-form>
          </el-row>
        </el-col>
        <!-- 右边编辑属性 -->
        <el-col :span="5" :offset="1" class="rightControl">
          <rightControlComponent></rightControlComponent>
        </el-col>
      </el-row>
    </el-row>

    <!-- 生成json代码的对话框 -->
    <selfBuildJsonDialog
      :selfBuildJsonData="this.$store.state.Form.formData"
    ></selfBuildJsonDialog>

    <!-- 导入json代码的对话框 -->
    <selfImportJsonDialog
      @generateJsonData="importJsonData(arguments)"
    ></selfImportJsonDialog>

    <!-- 预览表单的对话框 -->
    <el-dialog
      title="预览表单"
      :visible.sync="this.$store.state.Form.previewFormDialogVissible"
      v-if="this.$store.state.Form.previewFormDialogVissible"
      :before-close="closePreviewFormDialogrDialog"
      width="40%"
      ref="perviewFormDialog"
      center
    >
      <!-- 自定义的表单渲染器 -->
      <selfGenerateForm :formJson="this.$store.state.Form.formData"></selfGenerateForm>
    </el-dialog>
  </div>
</template>

<script>
import headTop from "@/components/headTop";
import { updateFromDataById, getFormDataById } from "@/api/getFormData";
import selfBuildJsonDialog from "@/components/Form/selfBuildJsonDialog";
import selfImportJsonDialog from "@/components/Form/selfImportJsonDialog";
import leftAddButtonComponent from "@/components/Form/leftAddButtonComponent";
import mainControlButtonComponent from "@/components/Form/mainControlButtonComponent";
import rightControlComponent from "@/components/Form/rightControlComponent";
import selfGenerateForm from "@/components/Form/selfGenerateForm";
export default {
  components: {
    headTop,
    selfBuildJsonDialog,
    selfGenerateForm,
    selfImportJsonDialog,
    leftAddButtonComponent,
    mainControlButtonComponent,
    rightControlComponent
  },
  data() {
    return {
      // 请求表单数据的数据
      requestFormData: {
        formId: ""
      },
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
      if (this.$route.query.formId) {
        this.requestFormData.formId = this.$route.query.formId;
        getFormDataById(this.requestFormData).then(res => {
          if (res.extend.formData) {
            this.$store.commit("Form/resetData",JSON.parse(res.extend.formData));
          }
        });
      }
    },
    /**
     * @description 点击元素，右边可以编辑属性
     * @param index 元素的索引值
     */
    editItem(index) {
      // 所有元素都重置为未点击的状态
      for (var i in this.$store.state.Form.formData.Item) {
        this.$store.state.Form.formData.Item[i].isClick = false;
      }
      this.$store.state.Form.formData.Item[index].isClick = true;
    },
    /**
     * @description 返回上一级
     */
    returnBack() {
      this.$router.go(-1);
    },
    /**
     * @description 删除指定索引的表单元素
     * @param index 表单元素的索引
     */
    deleteOneItem(index) {
      this.Form.Item.splice(index, 1);
    },
    /**
     * @description 复制指定索引的表单元素,重新生成key和name（保证key和name唯一）
     * @param index 表单元素的索引
     */
    copyOneItem(index) {
      var jsonData = JSON.parse(JSON.stringify(this.Form.Item[index]));
      // 生成随机且唯一的key值
      jsonData.key =
        String(Math.random()).substring(2, 10) + String(Date.now());
      jsonData.name = jsonData.type + "_" + jsonData.key;
      this.Form.Item.splice(index + 1, 0, jsonData);
    },
    /**
     * @description 移动表单元素
     * @parma index 表单元素的索引
     * @parma type 移动类型（up:上移，down：下移）
     */
    moveOneItem(index, type) {
      var temp = this.Form.Item[index];
      switch (type) {
        // 上移
        case "up":
          if (index == 0) {
            this.$message({
              message: "该元素已经是第一个元素，无法继续上移",
              type: "error"
            });
            return;
          }
          this.Form.Item[index] = this.Form.Item[index - 1];
          this.Form.Item[index - 1] = temp;
          break;
        case "down":
          if (index == this.Form.Item.length - 1) {
            this.$message({
              message: "该元素已经是最后一个元素，无法继续下移",
              type: "error"
            });
            return;
          }
          this.Form.Item[index] = this.Form.Item[index + 1];
          this.Form.Item[index + 1] = temp;
          break;
      }
    },
    /**
     * @description 关闭预览表单对话框
     */
    closePreviewFormDialogrDialog(){
      this.$store.commit("Form/setpreviewFormDialogVissible",false)
    },

  }
};
</script>
<style lang="scss" scoped>
.returnButton {
  float: left;
  margin: 15px 0 0 20px;
}
// 表单界面
.mainEditForm {
  .controlButton {
    margin-left: 4em;
    margin-bottom: 1em;
  }
  // 中间的操作界面
  .mainForm {
    height: 40em;
    overflow: auto;
    .formItem {
      transition: all 1s;
      height: auto;
      margin-bottom: 1em;
      padding: 0 1em;
      border: 2px solid white;
      span.itemName {
        float: right;
        color: #82dc29;
      }
    }
    .formItem:hover {
      border-color: #409eff;
    }
    .clickFormItem {
      border-color: #409eff;
    }
  }
  .mainForm::-webkit-scrollbar {
    /*滚动条整体*/
    width: 6px;
  }
  .mainForm::-webkit-scrollbar-track {
    /*滚动条轨道*/
    background: #ededed;
    border-radius: 10px;
  }
  .mainForm::-webkit-scrollbar-thumb {
    /*滚动条里面的滑块*/
    border-radius: 10px;
    background-color: rgb(98, 198, 255);
  }

  // 右边操作组件
  .rightControl {
    height: 40em;
    overflow: auto;
  }
  .rightControl::-webkit-scrollbar {
    /*滚动条整体*/
    width: 6px;
  }
  .rightControl::-webkit-scrollbar-track {
    /*滚动条轨道*/
    background: #ededed;
    border-radius: 10px;
  }
  .rightControl::-webkit-scrollbar-thumb {
    /*滚动条里面的滑块*/
    border-radius: 10px;
    background-color: rgb(98, 198, 255);
  }
}
// 控制动画
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.v-leave-active {
  position: absolute;
}
</style>