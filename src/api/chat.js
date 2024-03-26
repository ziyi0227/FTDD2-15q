import request from '@/utils/request'

export function getChatContent(q) {
  return request({
    url: '/chat',
    method: 'post',
    params: q
  })
}
