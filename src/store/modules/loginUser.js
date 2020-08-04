const state = () => ({
  "adminId": "",
  "adminNum": "",
  "adminName": "",
  "primaryClass": "",
  "secondaryClass": "",
  "loginAccount": "",
  "logicDel": "",
  "createTime": "",
  "modifyTime": "",
  "adminStatus": "",
  "remark": "",
  "adminRole": "",
  "dataScope": ""
});

const mutations = {
   /**
   * 初始化给loginUser赋值
   * @param {*} state 
   * @param {*} userObject 登陆的用户信息对象
   */
  initLoginUser(state, userObject) {
    state.adminId = userObject.adminId;
    state.adminNum = userObject.adminNum;
    state.adminName = userObject.adminName;
    state.primaryClass = userObject.primaryClass;
    state.secondaryClass = userObject.secondaryClass;
    state.loginAccount = userObject.loginAccount;
    state.logicDel = userObject.logicDel;
    state.createTime = userObject.createTime;
    state.modifyTime = userObject.modifyTime;
    state.adminStatus = userObject.adminStatus;
    state.remark = userObject.remark;
    state.adminRole = userObject.adminRole;
    state.dataScope = userObject.dataScope;
  },
  /**
   * 清除loginUser的所有信息
   * @param {*} state 
   */
  clearLoginUserInfo(state){
    state.adminId = "";
    state.adminNum = "";
    state.adminName = "";
    state.primaryClass = "";
    state.secondaryClass = "";
    state.loginAccount = "";
    state.logicDel = "";
    state.createTime = "";
    state.modifyTime = "";
    state.adminStatus = "";
    state.remark = "";
    state.adminRole = "";
    state.dataScope = "";
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
