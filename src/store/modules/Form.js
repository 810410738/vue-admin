const state = ()=>({
  // 初始化状态
  formData: {}
});

const mutations = {
  // 处理状态
  increment(state) {
    state.formData.a = 1;
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
