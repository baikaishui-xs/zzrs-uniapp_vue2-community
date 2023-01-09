// #ifndef VUE3
import Vue from 'vue'
import App from './App'
// 导入 store 实例对象
import store from './store/store.js'
import registerDirectives from './directives'

// 批量注册全局自定义指令
registerDirectives()

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
  store
})
app.$mount()
// #endif

// #ifdef VUE3
import {
  createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
