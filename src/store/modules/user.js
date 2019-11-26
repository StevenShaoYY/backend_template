import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken, deepClone } from '@/utils/auth'
import { resetRouter, constantRoutes, asyncRouterMap } from '@/router'
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

export function filterAsyncRouter(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  userId: '',
  routers: constantRoutes,
  addRouters: []

}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERID: (state, id) => {
    state.userId = id
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROUTERS: (state, routers) => {
    state.addRouters = deepClone(routers)
    state.routers = deepClone(constantRoutes.concat(routers))
  }

}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      console.log(password)
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ dispatch, commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        const { name, avatar, roles } = data
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        dispatch('GenerateRoutes', roles).then(res => {
          resolve(data)
        })
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_USERID', '')
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  },
  GenerateRoutes({ commit }, data) {
    return new Promise(resolve => {
      const accessRouters = filterAsyncRouter(asyncRouterMap, data)
      accessRouters.push({ path: '*', redirect: '/404', hidden: true })
      commit('SET_ROUTERS', accessRouters)
      resolve()
    })
  },

  // set Avatar
  setAvatar({ commit }, image) {
    commit('SET_AVATAR', image)
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

