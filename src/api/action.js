import request from '@/utils/request'

export default {
  deliver(jobId) {
    return request({
      url: `/job-table/deliver/${jobId}`,
      method: 'post'
    })
      .then(response => response)
      .catch(error => {
        throw error
      })
  }
}
