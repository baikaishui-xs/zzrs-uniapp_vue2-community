import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import demo from '@/store/modules/store_demo.js'
import user from '@/store/modules/store_user.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: { // 注册模块
    demo,
    user
  },
  plugins: [
    createPersistedState({ // 数据持久化插件 配置
      key: 'zzrs-uniapp_vue2-community-store', // 本地仓库名字
      paths: ['demo', 'user'] // 指定需要持久化的模块
    })
  ]
})

export default store
