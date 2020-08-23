const state = {
  formdata: {}
}

const actions = {
  setFormData({commit},value) {
    commit('setFormData',value)
  }
}

const mutations = {
  setFormData(statedata,value) {
    statedata.formdata = value
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}