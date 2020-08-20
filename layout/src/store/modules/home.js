import { GetDayInfo } from '../../../api/dayinfo'
import constant from '../../../config/constant'

const state = {
  listData: []
}

const actions = {
  async getListdata({ commit }) {
    const { data: { data } } = await GetDayInfo()
    const table = []
    console.log('vuex actice')
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
    table.push({
      createtime: "2020-08-17T02:35:49.000Z",
      dayInfo_hour: 0,
      dayInfo_id: 40,
      dayInfo_minute: 4,
      name: "哇啦啦啦",
      dayInfo_repeat: 1,
      dayInfo_start: null,
      time: "00:04:00",
      delettime: null,
      f_uptime: "2020-08-17T02:35:49.000Z",
      finishtime: "00:00:02",
      status: 1,
      uid: 1,
      status: constant.status[1],
      updatetime: null,
      icon: 'icon-'+constant.status[1]
    })
    console.log('1231231231231')
    console.log(table)
    console.log('>>>>>>>>')
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
