import axios from 'axios'
import {URL} from '../../../config/httpinfo'

// import { GetDayInfo } from '../../../api/dayinfo'
import constant from '../../../config/constant'
import HttpError from '../../../config/error'

const state = {
  listData: [],
}

const actions = {
  async getListdata({ commit }) {
    // console.log('vuex home')
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
    // axios.defaults.headers.common['Authorization'] =
    axios({
      method: 'GET',
      url: `${URL}/api/dayinfo/list`,
      auth: {
        username: localStorage.getItem('token')
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
      HttpError.getError(err.response.status)
      console.log(err.response)
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
