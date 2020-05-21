import Vue from 'vue';
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
  setImportJsonDialogVisible(state,status){
    state.selfImportJsonDialogVisible = status;
  },
  setBuildJsonDialogVisible(state,status){
    state.selfBuildJsonDialogVisible = status;
  },
  setpreviewFormDialogVissible(state,status){
    state.previewFormDialogVissible = status;
  },
  // 重置formData 
  resetData(state, data) {
    state.formData = data
    // JSON.parse(JSON.stringify(data));
  },
  // 添加一个元素
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
   * @description 设置formData某个元素的值
   */
  setFormData(state, key, value){
    state.formData[key] = value;
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