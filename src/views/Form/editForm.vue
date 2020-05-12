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
        <el-col :span="3" class="primaryButton">
          <span class="primaryText">基础字段</span>
          <div class="aLine"></div>
          <el-row>
            <el-button type="primary" plain size="mini" @click="addItem('input')">普通输入框</el-button>
            <el-button type="primary" plain size="mini" @click="addItem('select')">下拉框</el-button>
          </el-row>
        </el-col>
        <!-- 表单效果 -->
        <el-col :span="15" class="mainFrom">
          <el-row>
            <div class="controlButton">
              <el-button type="primary" size="small" @click="save" icon="el-icon-upload">保存</el-button>
              <el-button type="danger" size="small" @click="clear" icon="el-icon-delete">清空</el-button>
              <el-button
                type="warning"
                size="small"
                @click="previewForm"
                icon="el-icon-folder-checked"
              >预览</el-button>
              <el-button type="success" size="small" @click="publish" icon="el-icon-check">发布</el-button>
              <el-button type="info" size="small" @click="buildJSON" icon="el-icon-check">生成JSON</el-button>
            </div>
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
                    <el-input
                      v-if="item.type == 'input'"
                      :placeholder="item.placeholder"
                      :style="'width:' + item.width + '%'"
                      :disabled="item.disabled"
                    ></el-input>
                    <el-select
                      v-else-if="item.type == 'select'"
                      :placeholder="item.placeholder"
                      :style="'width:' + item.width + '%'"
                      :disabled="item.disabled"
                    ></el-select>
                    <span class="itemName">{{item.name}}</span>
                  </el-form-item>
                </div>
              </transition-group>
            </el-form>
          </el-row>
        </el-col>
        <!-- 右边编辑属性 -->
        <el-col :span="5" :offset="1">
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
import { saveFormData, getFormData } from "@/api/getFormData";
import selfBuildJsonDialog from "@/components/Form/selfBuildJsonDialog";
import selfGenerateForm from "@/components/Form/selfGenerateForm";
export default {
  components: {
    headTop,
    selfBuildJsonDialog,
    selfGenerateForm
  },
  data() {
    return {
      // 控制生成json的对话框是否显示
      selfBuildJsonDialogVisible: false,
      // 控制预览表单的对话框是否显示
      previewFormDialogVissible: false,
      // 表单数据
      Form: {
        // 表单配置项
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
        getFormData(this.requestFormData).then(res => {
          this.Form = res.extend.FormInfo;
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
      saveFormData().then(res => {
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
     * @description 添加表单元素
     * @param ItemType 元素类型
     */
    addItem(ItemType) {
      var jsonData = {
        key: "",
        name: "",
        type: "",
        label: "",
        placeholder: "",
        width: "100",
        isClick: false,
        disabled: false,
        required: false,
        errorText: "输入数据的格式不正确",
        rules: []
      };
      // 生成随机且唯一的key值
      jsonData.key =
        String(Math.random()).substring(2, 10) + String(Date.now());
      jsonData.name = ItemType + "_" + jsonData.key;
      jsonData.type = ItemType;
      switch (ItemType) {
        // 单行输入框
        case "input":
          jsonData.label = "input输入框";
          break;
        case "select":
          jsonData.label = "select下拉框";
          jsonData.remote = false;
          jsonData.remoteURL = "";
          jsonData.options = [];
          // 是否联动获取下拉数据
          jsonData.isLinkOptions = false;
          // 联动选项的id
          jsonData.linkOptionsKey = "";
          break;
      }
      // 添加新的元素到Form.item
      this.Form.Item.push(jsonData);
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
     * @description 关闭新增用户的对话框
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
.mainFrom {
  .controlButton {
    margin-left: 4em;
    margin-bottom: 1em;
  }
  .formItem {
    transition: all 1s;
    height: 6em;
    margin-bottom: 1em;
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