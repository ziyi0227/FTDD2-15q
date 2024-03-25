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
  },
  addJobList(job) {
    return request({
      url: '/job-table/add',
      method: 'post',
      data: job
    })
  },
  updateJobList(job) {
    return request({
      url: '/job-table/update',
      method: 'put',
      data: job
    })
  },
  saveJobList(job) {
    if (job.id == null && job.id === undefined) {
      return this.addJobList(job)
    }
    return this.updateJobList(job)
  },
  getJobByUser() {
    return request({
      url: `/job-table/all`,
      method: 'get'
    })
  }
}
