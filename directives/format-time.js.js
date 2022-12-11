// 格式化时间 和 日期

import dayjs from 'dayjs'

export default function(app) {
  app.directive("format-time", {
    mounted(el, bindings) {
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
