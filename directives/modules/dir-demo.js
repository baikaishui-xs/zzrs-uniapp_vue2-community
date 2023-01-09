// 测试

import Vue from 'vue'

export function demo() {
  Vue.directive('demo', {
    bind(el, bindings) {
      console.log(el)
      console.log(bindings)
    }
  })
}
