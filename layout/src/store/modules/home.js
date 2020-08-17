import { GetDayInfo } from '../../../api/dayinfo'
import constant from '../../../config/constant'

const state = () => ({
  listData: []
})

const actions = {
  async getListdata({ commit }) {
    const { data: { data } } = await GetDayInfo()
    const table = []
    data.forEach((item) => {
      const tableitem = {
        name: item.dayInfo_name,
        time: item.dayInfo_time,
        icon: `icon-${constant.status[item.status]}`,
        status: constant.status[item.status],
        ...item
      }
      table.push(tableitem)
    })
    commit('setListData', table)
  }
}

const mutations = {
  setListData(statedata, data) {
    statedata.listData = data
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
