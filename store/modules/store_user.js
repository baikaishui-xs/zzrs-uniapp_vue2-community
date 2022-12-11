// 用户模块

import {
  phoneLogin
} from '@/api/allApi.js'

const state = {
  userInfo: {},
}

const mutations = {
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  },
}

const actions = {
  // 手机登录
  async phoneLogin(context, arg) {
    const result = await phoneLogin(arg.phone, arg.code)
    context.commit('setUserInfo', result)
  }
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
