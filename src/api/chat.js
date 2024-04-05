import request from '@/utils/request'

export function getChatContent(q) {
  return request({
    url: '/chat',
    method: 'post',
    params: q
  })
}
export function getSuggest() {
  return request({
    url: '/getSuggestion',
    method: 'post'
  })
}
export function getAssess(q) {
  return request({
    url: '/getAssess',
    method: 'post',
    params: q
  })
}
