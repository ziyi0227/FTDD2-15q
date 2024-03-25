import request from '@/utils/request'

export default {
  setFavor(jdNo) {
    return request({
      url: `/favor/${jdNo}`,
      method: 'put'
    })
      .then(response => response)
      .catch(error => {
        throw error
      })
  },
  getFavorList(queryData) {
    return request({
      url: `/favor/list`,
      method: 'get',
      params: {
        pageNo: queryData.pageNo,
        pageSize: queryData.pageSize
      }
    })
      .then(response => response)
      .catch(error => {
        throw error
      })
  }
}
