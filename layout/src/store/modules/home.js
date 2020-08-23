import axios from 'axios'
import mpAdapter from 'axios-miniprogram-adapter'// 解决axios 在小程序能使用
import {URL,TOKEN} from '../../../config/httpinfo'

import { GetDayInfo } from '../../../api/dayinfo'
import constant from '../../../config/constant'

const state = {
  listData: [],
}

const actions = {
  async getListdata({ commit }) {
    console.log('vuex home')
    // *** 小程序不支持
    // const { data: { data } } = await GetDayInfo()
    // const table = []
    // data.forEach((item) => {
    //   const tableitem = {
    //     name: item.dayInfo_name,
    //     time: item.dayInfo_time,
    //     icon: `icon-${constant.status[item.status]}`,
    //     status: constant.status[item.status],
    //     ...item
    //   }
    //   table.push(tableitem)
    // })
    // commit('setListData', table)
    axios({
      url: `${URL}/api/dayinfo/list`,
      auth: {
        username: TOKEN
      }
    }).then((res) => {
      console.log(res)
      const {data: {data}} = res
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
    }).catch((err) => {
      console.log(err)
    })
  },
}

const mutations = {
  setListData(statedata, data) {
    console.log('vuex editor')
    statedata.listData = data
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
