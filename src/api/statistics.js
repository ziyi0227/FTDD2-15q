import request from '@/utils/request'

export default{
  getHotCompany() {
    return request({
      url: '/job-table/hot/company',
      method: 'get'
    })
  },
  getCompanyTotal() {
    return request({
      url: '/job-table/getCompanyTotal',
      method: 'get'
    })
  }
}
