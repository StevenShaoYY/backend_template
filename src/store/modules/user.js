import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken, deepClone } from '@/utils/auth'
import { resetRouter, constantRoutes } from '@/router'
import { asyncRoutes } from '@/router/asyncRoutes'

function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
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
  SET_ROUTERS: (state, routes) => {
    state.addRouters = deepClone(routes)
    state.routers = deepClone(constantRoutes.concat(routes))
  },
  SET_MENULIST: (state, routers) => {
    state.routers = deepClone(routers)
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
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
        // resolve(state.addRoutes)
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
  GenerateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTERS', accessedRoutes)
      resolve(accessedRoutes)
    })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
