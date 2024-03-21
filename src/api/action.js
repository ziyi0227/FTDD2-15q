import request from '@/utils/request'

export default {
  deliver(jdNo) {
    return request({
      url: `/job-table/deliver/${jdNo}`,
      method: 'post'
    })
      .then(response => response)
      .catch(error => {
        throw error
      })
  }
}
