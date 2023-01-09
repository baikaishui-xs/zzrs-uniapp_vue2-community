import Vue from 'vue'

// 图片有地址，但是没有加载成功时的默认图片
export function imageError() {
  Vue.directive('image-error', {
    inserted(el, binding) { // inserted 钩子函数：当前 el 元素插入到节点之后触发
      el.onerror = function() {
        console.log('自定义指令中的 error 被触发')
      }
    },
  })
}
