import request from '@/utils/request'

export default {
  setFavor(jdNo) {
    return request({
      url: `/favor/${jdNo}`,
      method: 'put'
    })
      .then(response => response.data)
      .catch(error => {
        throw error
      })
  }
}
