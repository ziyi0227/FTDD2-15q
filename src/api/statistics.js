import request from '@/utils/request'

export default {
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
  },
  getHotJobTitle() {
    return request({
      url: '/statistic/hot-job',
      method: 'get'
    })
  },
  getHotJobData(jotTitle) {
    return request({
      url: '/statistic/getTitleCount',
      method: 'get',
      params: jotTitle
    })
  },
  getHotMajor() {
    return request({
      url: '/statistic/getHotMajor',
      method: 'get'
    })
  }
}
