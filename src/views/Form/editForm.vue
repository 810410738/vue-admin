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
        <!-- 基础控件 -->
        <el-col :span="3">
          <leftAddButtonComponent @addItem="addItem(arguments)"></leftAddButtonComponent>
        </el-col>
        <!-- 表单效果 -->
        <el-col :span="15" class="mainForm">
          <el-row>
            <mainControlButtonComponent ></mainControlButtonComponent>
          </el-row>
          <el-row>
            <el-form
              :label-position="Form.labelPosition"
              :label-width="Form.labelWidth + 'px'"
              :model="Form.Data"
              :rules="Form.rules"
              :size="Form.size"
              ref="Form"
            >
              <transition-group tag="div">
                <div
                  class="formItem"
                  v-for="(item, index) in Form.Item"
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
          <el-tabs v-model="activeName" type="border-card" :stretch="true">
            <el-tab-pane label="字段属性" name="item">
              <el-form
                v-for="(item,index) in Form.Item"
                :key="item.key"
                v-show="item.isClick"
                label-position="top"
              >
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
                  <el-input v-model="item.width">
                    <template slot="append">%</template>
                  </el-input>
                </el-form-item>
                <!-- select特有的操作 -->
                <div v-if="item.type == 'select'">
                  <el-form-item label="选项">
                    <el-tabs v-model="selectActiveName" type="border-card" :stretch="true">
                      <!--  静态数据的页面 -->
                      <el-tab-pane label="静态数据" name="static">
                        <el-card v-for="(item1, index1) in item.options" :key="index1">
                          <el-input size="mini" v-model="item1.label">
                            <template slot="prepend">Label</template>
                          </el-input>
                          <el-input size="mini" v-model="item1.value">
                            <template slot="prepend">Value</template>
                          </el-input>
                        </el-card>
                        <el-button
                          plain
                          icon="el-icon-plus"
                          size="mini"
                          @click="changeSelectOption(index,'add')"
                        ></el-button>
                        <el-button
                          type="danger"
                          plain
                          icon="el-icon-minus"
                          size="mini"
                          @click="changeSelectOption(index,'delete')"
                        ></el-button>
                      </el-tab-pane>
                      <!--  动态数据的页面 -->
                      <el-tab-pane label="动态数据" name="dynamic">
                        <el-form>
                          <el-form-item label="接口URL">
                            <el-input v-model="item.remoteURL">
                              <template slot="prepend">http://</template>
                            </el-input>
                          </el-form-item>
                        </el-form>
                        <label>参数 ：</label>
                        <el-card v-for="(item1, index1) in item.remoteParmas" :key="index1">
                          <el-input size="mini" v-model="item1.key">
                            <template slot="prepend">Key</template>
                          </el-input>
                          <el-input size="mini" v-model="item1.value">
                            <template slot="prepend">Value</template>
                          </el-input>
                        </el-card>
                        <el-button
                          plain
                          icon="el-icon-plus"
                          size="mini"
                          @click="changeSelectParams(index,'add')"
                        ></el-button>
                        <el-button
                          type="danger"
                          plain
                          icon="el-icon-minus"
                          size="mini"
                          @click="changeSelectParams(index,'delete')"
                        ></el-button>
                      </el-tab-pane>
                    </el-tabs>
                    <el-checkbox v-model="item.isLinkOptions">联动获取数据</el-checkbox>
                  </el-form-item>
                  <el-form-item>
                    <el-select
                      v-if="item.isLinkOptions"
                      placeholder="请选择联动数据的下拉框"
                      v-model="item.linkOptionsKey"
                    >
                      <el-option
                        v-for="option_item in Form.Item"
                        v-show="option_item.type == 'select' && option_item.key!=item.key"
                        :key="option_item.key"
                        :label="option_item.name"
                        :value="option_item.key"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <!-- radio单选框特有的操作 -->
                <div v-else-if="item.type == 'radio'">
                  <el-form-item label="radio类型">
                    <el-radio-group v-model="item.radioType">
                      <el-radio-button label="primary">基础样式</el-radio-button>
                      <el-radio-button label="button">按钮样式</el-radio-button>
                      <el-radio-button label="borderButton">带边框样式</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="选项">
                    <el-card>
                      <el-card v-for="(item1, index1) in item.options" :key="index1">
                        <el-input size="mini" v-model="item1.label">
                          <template slot="prepend">Label</template>
                        </el-input>
                        <el-input size="mini" v-model="item1.value">
                          <template slot="prepend">Value</template>
                        </el-input>
                      </el-card>
                      <el-button
                        plain
                        icon="el-icon-plus"
                        size="mini"
                        @click="changeSelectOption(index,'add')"
                      ></el-button>
                      <el-button
                        type="danger"
                        plain
                        icon="el-icon-minus"
                        size="mini"
                        @click="changeSelectOption(index,'delete')"
                      ></el-button>
                    </el-card>
                  </el-form-item>
                </div>
                <!-- inputTextarea特有的操作 -->
                <div v-else-if="item.type == 'inputTextarea'">
                  <el-form-item label="文本行数">
                    <el-input-number v-model="item.rows" :min="2" :max="20"></el-input-number>
                  </el-form-item>
                </div>
                <!--  -->
                <el-form-item label="操作属性">
                  <el-checkbox v-model="item.disabled">禁用</el-checkbox>
                </el-form-item>
                <el-form-item label="校验">
                  <el-checkbox v-model="item.required">必填</el-checkbox>
                </el-form-item>
                <el-form-item v-show="item.type != 'select'">
                  <el-input v-model="item.pattern" placeholder="请填写正则表达式"></el-input>
                </el-form-item>
                <el-form-item label="校验不通过的提示文字" v-show="item.type != 'select'">
                  <el-input v-model="item.errorText"></el-input>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="表单属性" name="form">
              <el-form label-position="top">
                <el-form-item>
                  <el-checkbox v-model="Form.disabled">禁用表单</el-checkbox>
                </el-form-item>

                <el-form-item label="标签对齐方式">
                  <el-radio-group v-model="Form.labelPosition">
                    <el-radio-button label="left">左对齐</el-radio-button>
                    <el-radio-button label="right">右对齐</el-radio-button>
                    <el-radio-button label="top">顶部对齐</el-radio-button>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="表单标签宽度">
                  <el-input-number v-model="Form.labelWidth" :step="10"></el-input-number>
                </el-form-item>
                <el-form-item label="组件尺寸">
                  <el-radio-group v-model="Form.size">
                    <el-radio-button label="medium">medium</el-radio-button>
                    <el-radio-button label="small">small</el-radio-button>
                    <el-radio-button label="mini">mini</el-radio-button>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="显示提交按钮">
                  <el-switch v-model="Form.isShowButton"></el-switch>
                </el-form-item>
                <el-form-item label="提交按钮的文字内容" v-show="Form.isShowButton">
                  <el-input v-model="Form.submitText"></el-input>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </el-row>

    <!-- 生成json代码的对话框 -->
    <selfBuildJsonDialog
      :selfBuildJsonData="Form"
      :isShow="selfBuildJsonDialogVisible"
      @closeDialog="closeBuildJsonDialogrDialog"
    ></selfBuildJsonDialog>

    <!-- 导入json代码的对话框 -->
    <selfImportJsonDialog
      :isShow="selfImportJsonDialogVisible"
      @closeDialog="closeImportJsonDialogrDialog"
      @generateJsonData="importJsonData(arguments)"
    ></selfImportJsonDialog>

    <!-- 预览表单的对话框 -->
    <el-dialog
      title="预览表单"
      :visible.sync="previewFormDialogVissible"
      v-if="previewFormDialogVissible"
      width="40%"
      :before-close="closePreviewFormDialog"
      ref="perviewFormDialog"
      center
    >
      <!-- 自定义的表单渲染器 -->
      <selfGenerateForm :formJson="Form"></selfGenerateForm>
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

import selfGenerateForm from "@/components/Form/selfGenerateForm";
export default {
  components: {
    headTop,
    selfBuildJsonDialog,
    selfGenerateForm,
    selfImportJsonDialog,
    leftAddButtonComponent,
    mainControlButtonComponent
  },
  data() {
    return {
      // 控制导入json的对话框是否显示
      selfImportJsonDialogVisible: false,
      // 控制生成json的对话框是否显示
      selfBuildJsonDialogVisible: false,
      // 控制预览表单的对话框是否显示
      previewFormDialogVissible: false,
      // 表单数据
      Form: {
        // 表单配置项
        disabled: false,
        isShowButton: true,
        submitText: "提交",
        labelPosition: "right",
        labelWidth: "130",
        size: "small",
        disabled: false,
        Item: [],
        // 表单字段数据
        Data: {},
        // 表单验证规则
        Rules: {}
      },
      // 请求表单数据的数据
      requestFormData: {
        formId: ""
      },
      // 右边操作属性的标签切换的名字
      activeName: "item",
      // 右边操作属性的选项标签切换的名字
      selectActiveName: "static"
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
            this.Form = JSON.parse(res.extend.formData);
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
      for (var i in this.Form.Item) {
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
      var jsonData = {};
      jsonData.formId = this.$route.query.formId;
      jsonData.formData = JSON.stringify(this.Form);
      updateFromDataById(jsonData).then(res => {
        // 上传数据成功
        this.$message({
          message: "保存成功",
          type: "success"
        });
      });
    },
    /**
     * @description 清空整个表单
     */
    clear() {
      this.Form.Item.splice(0);
    },
    /**
     * @description 添加表单元素,调用添加元素组件，返回需要添加的元素
     * @param arg 元素对象
     */
    addItem(arg) {
      // 添加新的元素到Form.item
      this.Form.Item.push(JSON.parse(JSON.stringify(arg[0])));
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
     * @description 把Form生成json输出到前端,打开对话框
     */
    buildJSON() {
      this.selfBuildJsonDialogVisible = true;
    },
    /*
     * @description 关闭生成json的对话框
     */
    closeBuildJsonDialogrDialog() {
      this.selfBuildJsonDialogVisible = false;
    },
    /**
     * @description 改动下拉框的选项值
     * @param index 元素的索引值
     * @param type 改动操作的类型（add:添加元素；delete：删除元素）
     */
    changeSelectOption(index, type) {
      switch (type) {
        case "add":
          this.Form.Item[index].options.push({
            label: "",
            value: ""
          });
          break;
        case "delete":
          this.Form.Item[index].options.splice(
            this.Form.Item[index].options.length - 1,
            1
          );
      }
    },
    /**
     * @description 改动下拉框获取远程数据的参数
     * @param index 元素的索引值
     * @param type 改动操作的类型（add:添加元素；delete：删除元素）
     */
    changeSelectParams(index, type) {
      switch (type) {
        case "add":
          this.Form.Item[index].remoteParmas.push({
            key: "",
            value: ""
          });
          break;
        case "delete":
          this.Form.Item[index].remoteParmas.splice(
            this.Form.Item[index].remoteParmas.length - 1,
            1
          );
      }
    },
    /**
     * @description 导入json数据
     */
    importJsonData(arg) {
      this.Form = arg[0];
      this.$message({
        type: "success",
        message: "导入成功！"
      });
      this.closeImportJsonDialogrDialog();
    },
    /**
     * @description 打开预览表单的对话框
     */
    previewForm() {
      this.previewFormDialogVissible = true;
    },
    /**
     * @description 关闭预览表单的对话框
     */
    closePreviewFormDialog() {
      this.previewFormDialogVissible = false;
    },
    /**
     * @description 关闭导入json的对话框
     */
    closeImportJsonDialogrDialog() {
      this.selfImportJsonDialogVisible = false;
    }
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