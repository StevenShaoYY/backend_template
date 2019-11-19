import Vue from 'vue'
import { DEVE_MODE } from './settings'
import Vuex from 'vuex'

import getters from './store/getters'
import app from './store/modules/app'
import settings from './store/modules/settings'
import user from './store/modules/user'
// // 子项目异步注册 store module
const testStore = {
  namespaced: true,
  modules: {
    app,
    settings,
    user
  },
  getters
}
let store = null
if (process.env.NODE_ENV !== DEVE_MODE) {
  Vue.use(Vuex)
  store = new Vuex.Store({
    modules: {
    }
  })
  store.registerModule(process.env.VUE_APP_NAME, testStore)
} else {
  Vue.__share_pool__.store.registerModule(process.env.VUE_APP_NAME, testStore)
}

export default store
