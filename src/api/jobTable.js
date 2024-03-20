import request from '@/utils/request'

export default {
  getJobList(searchModel) {
    return request({
      url: '/job-table/list',
      method: 'get',
      params: {
        pageNo: searchModel.pageNo,
        pageSize: searchModel.pageSize,
        jdTitle: searchModel.jdTitle,
        company: searchModel.company,
        jdSubType: searchModel.jdSubType,
        minSalary: '',
        maxSalary: ''
      }
    })
  }
}
