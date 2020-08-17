/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const modulesFiles = require.context('./modules', true, /\.js$/)

const modules = modulesFiles.keys().reduce((modulesvalue, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modulesvalue[moduleName] = value.default
  return modulesvalue
}, {})
// console.log(M)

export default new Vuex.Store({
  state: {
    headerTips: 'hello',
    input: '',
  },
  modules,
})
