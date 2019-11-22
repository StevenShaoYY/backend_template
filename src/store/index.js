import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
  }
})
const testStore = {
  namespaced: true,
  modules: {
    app,
    settings,
    user
  },
  getters
}
store.registerModule('mainStore', testStore)
export default store
