import {Message} from 'element-ui'

const state = () => ({
  // 初始化状态
  formData: {
    // 表单配置项
    disabled: false,
    isShowButton: true,
    submitText: "提交",
    labelPosition: "right",
    labelWidth: "130",
    size: "small",
    disabled: false,
    isInline:false,
    Item: [],
    // 表单字段数据
    Data: {},
    // 表单验证规则
    Rules: {}
  },
  // 控制导入json的对话框是否显示
  selfImportJsonDialogVisible: false,
  // 控制生成json的对话框是否显示
  selfBuildJsonDialogVisible: false,
  // 控制预览表单的对话框是否显示
  previewFormDialogVissible: false,
});

const mutations = {
  setImportJsonDialogVisible(state, status) {
    state.selfImportJsonDialogVisible = status;
  },
  setBuildJsonDialogVisible(state, status) {
    state.selfBuildJsonDialogVisible = status;
  },
  setpreviewFormDialogVissible(state, status) {
    state.previewFormDialogVissible = status;
  },
  // 重置formData 
  resetData(state, data) {
    state.formData = {};
    state.formData = data;
    // JSON.parse(JSON.stringify(data));
  },
  // 添加一个表单元素
  addItem(state, data) {
    // 添加新的元素到Form.item
    state.formData.Item.push(JSON.parse(JSON.stringify(data)));
  },
  /**
   * @description 清空整个表单所有元素
   */
  clearItem(state) {
    state.formData.Item.splice(0);
  },
  /**
   * @description 设置formData各项配置项的值
   */
  setFormData(state, data) {
    state.formData[data.key] = data.value;
  },
  /**
   * @description 删除指定索引的表单元素
   * @param index 表单元素的索引
   */
  deleteOneItem(state, index) {
    state.formData.Item.splice(index, 1);
  },
  /**
   * @description 复制指定索引的表单元素,重新生成key和name（保证key和name唯一）
   * @param index 表单元素的索引
   */
  copyOneItem(state, index) {
    var jsonData = JSON.parse(JSON.stringify(state.formData.Item[index]));
    // 生成随机且唯一的key值
    jsonData.key =
      String(Math.random()).substring(2, 10) + String(Date.now());
    jsonData.name = jsonData.type + "_" + jsonData.key;
    state.formData.Item.splice(index + 1, 0, jsonData);
  },
  /**
   * @description 移动表单元素
   * @parma data.index 表单元素的索引
   * @parma data.type 移动类型（up:上移，down：下移）
   */
  moveOneItem(state, data) {
    var temp = state.formData.Item[data.index];
    switch (data.type) {
      // 上移
      case "up":
        if (data.index == 0) {
        Message({
            message: "该元素已经是第一个元素，无法继续上移",
            type: "error"
          });
          return false;
        }
        state.formData.Item[data.index] = state.formData.Item[data.index - 1];
        state.formData.Item[data.index - 1] = temp;
        break;
      case "down":
        if (data.index == state.formData.Item.length - 1) {
          Message({
            message: "该元素已经是最后一个元素，无法继续下移",
            type: "error"
          });
          return false;
        }
        state.formData.Item[data.index] = state.formData.Item[data.index + 1];
        state.formData.Item[data.index + 1] = temp;
        break;
    }
    return true;
  },
  /**
   * @description 点击元素，右边可以编辑属性
   * @param index 元素的索引值
   */
  clickItem(state, index) {
    // 所有元素都重置为未点击的状态
    for (var i in state.formData.Item) {
      state.formData.Item[i].isClick = false;
    }
    // 当前元素修改为已点击状态
    state.formData.Item[index].isClick = true;
  },
  /**
   * @description 改动下拉框的选项值
   * @param data.index 元素的索引值
   * @param data.type 改动操作的类型（add:添加元素；delete：删除元素）
   */
  changeSelectOption(state, data) {
    switch (data.type) {
      case "add":
        state.formData.Item[data.index].options.push({
          label: "",
          value: ""
        });
        break;
      case "delete":
        state.formData.Item[data.index].options.splice(
          state.formData.Item[data.index].options.length - 1,
          1
        );
    }
  },
  /**
   * @description 改动下拉框获取远程数据的参数
   * @param data.index 元素的索引值
   * @param data.type 改动操作的类型（add:添加元素；delete：删除元素）
   */
  changeSelectParams(state, data) {
    switch (data.type) {
      case "add":
        state.formData.Item[data.index].remoteParmas.push({
          key: "",
          value: ""
        });
        break;
      case "delete":
        state.formData.Item[data.index].remoteParmas.splice(
          state.formData.Item[data.index].remoteParmas.length - 1,
          1
        );
    }
  }
};

const getters = {

};

export default {
  namespaced: true,
  state,
  getters,
  mutations
}