import store from '@/store/store.js'
class ClAxios {
  constructor(config) {
    uni.addInterceptor('request', {
      // 请求拦截器
      invoke(args) {
        args.url = config.baseURL + args.url
      },
      // 响应拦截器
      success(args) {
        // console.log(args.data.data.list)
      },
      // 请求失败回调
      fail(err) {
        console.log('interceptor-fail', err)
      },
    })
  }
  requestConfig(config) {
    return new Promise((resolve, reject) => {
      uni.request({
        ...config,
        header: {
          'token': store.state.user.userInfo.token
          // 'custom-header': 'hello' //自定义请求头信息
        },
        success: (res) => {
          // 不需要进行过滤的 API 白名单
          // const apiWhite = ['/v1/user/sendcode']
          // 不对响应结果进行过滤
          // if (apiWhite.includes(config.url)) resolve(res.data)
          resolve(res.data)
        },
        fail: (err) => {
          return Promise.reject(err)
        }
      });
    })
  }
  get(config) {
    return this.requestConfig({
      ...config,
      method: 'get'
    })
  }
  post(config) {
    return this.requestConfig({
      ...config,
      method: 'post'
    })
  }
  delete(config) {
    return this.requestConfig({
      ...config,
      method: 'delete'
    })
  }
  patch(config) {
    return this.requestConfig({
      ...config,
      method: 'patch'
    })
  }
}

export const request = new ClAxios({
  baseURL: 'http://ceshi2.dishait.cn/api',
})

// export const request1 = new ClAxios({
//   baseURL: 'http://123.207.32.32:8000/'
// })
