// 自定义组件入口文件

import {
  demo
} from './modules/dir-demo'

import {
  formatTime
} from './modules/dir-format-time'

import {
  imageError
} from './modules/dir-image-error'

export default function registerDirectives() {
  demo()
  formatTime()
  imageError()
}
