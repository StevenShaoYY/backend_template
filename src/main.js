import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import './utils/rem.js'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import VueAMap from 'vue-amap'

import '@/icons' // icon
// import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use mockjs for request interception
 * you can execute:
 *
 * import { mockXHR } from '../mock'
 * mockXHR()
 */

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 高德地图
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: '76dfc9646535c62a3e0ba7318b77a1fb',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'Geocoder', 'MouseTool', 'RangingTool'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
