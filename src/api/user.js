import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/users/login',
    method: 'post',
    data
  })
}
export function register(data) {
  return request({
    url: '/users/register',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/users/info',
    method: 'get',
    params: { token }
  })
}
export function getUserInfo() {
  return request({
    url: '/users/Info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/users/logout',
    method: 'post'
  })
}
export function updateAvatar(data) {
  return request({
    url: '/common/upload',
    method: 'post',
    data
  })
}

export function updateUserInfo(data) {
  return request({
    url: '/users/updateInfo',
    method: 'put',
    data
  })
}
