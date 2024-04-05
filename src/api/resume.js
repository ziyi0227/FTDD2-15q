import request from '@/utils/request'

export default {
  getResume(formData) {
    return request({
      url: '/users/uploadResume',
      method: 'post',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  saveResume(formData) {
    return request({
      url: '/users/addResume',
      method: 'post',
      data: formData
    })
  },
  //   跟flask以及springboot对接
  getResumeId() {
    return request({
      url: '/resume/getResumeId',
      method: 'get'
    })
  }
}
