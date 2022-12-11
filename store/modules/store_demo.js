// 测试模块

// import { getUsernameLogin } from '@/api/user-management.js'

const state = { // 公共数据
  token: '',
  number: 1,
  number1: 2,
}

const mutations = { // 修改 store 中的数据
  setToken(state, token) {
    state.token = token
  },
  setNumber(state, number) {
    state.number = number
  }
}

const actions = { // 处理异步任务
  // async getUsernameLogin(context, data) { // 用户登录[用户名]
  //   const result = await getUsernameLogin(data)
  //   context.commit('setToken', result)
  // }
}

const getters = { // 计算属性。监听 state 数据
  sum: state => {
    return state.number + state.number1
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
