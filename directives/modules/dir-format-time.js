import Vue from 'vue'
import dayjs from 'dayjs'

// 格式化时间和日期
export function formatTime() {
  Vue.directive("format-time", {
    bind(el, bindings) {
      let formatString = bindings.value;
      if (!formatString) {
        formatString = "YYYY-MM-DD HH:mm:ss"
      }
      const textContent = el.textContent
      let timestamp = parseInt(textContent)
      if (textContent.length === 10) { // 判断时间戳是 秒 还是 毫秒
        timestamp = timestamp * 1000 // 将 秒 转换为 毫秒
      }
      el.textContent = dayjs(timestamp).format(formatString)
    }
  })
}
