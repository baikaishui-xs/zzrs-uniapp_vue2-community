import {
  request
} from '@/utils/request.js'

// 获取验证码
export function getCode(phone) {
  return request.post({
    url: '/v1/user/sendcode',
    data: {
      phone
    }
  })
}
// 手机登录
export function phoneLogin(phone, code) {
  return request.post({
    url: '/v1/user/phonelogin',
    data: {
      phone,
      code
    }
  })
}
// 获取所有文章分类
export function getAllArticleCategory() {
  return request.get({
    url: '/v1/postclass'
  })
}
// 获取指定话题分类下的话题列表
export function getAssignTopicCategoryList(id, page) {
  return request.get({
    url: `/v1/postclass/${id}/post/${page}`
  })
}
// 用户顶踩
export function topStepOperation(post_id, type) {
  return request.post({
    url: '/v1/support',
    data: {
      post_id: post_id,
      type: type
    }
  })
}
// 关注
export function follow(follow_id) {
  return request.post({
    url: '/v1/follow',
    data: {
      follow_id
    }
  })
}
// 取消关注
export function unfollow(follow_id) {
  return request.post({
    url: '/v1/unfollow',
    data: {
      follow_id
    }
  })
}
