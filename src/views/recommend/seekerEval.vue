<template>
  <div class="job-container">
    <el-row gutter="16">
      <el-col :span="14">
        <el-card class="job-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>我的收藏</span>
          </div>
          <el-table
            :data="jobList"
            stripe
            highlight-current-row
            @current-change="handleCurrentChange"
            style="width: 100%">
            <el-table-column
              prop="jdTitle"
              label="职位标题"
              width="100">
            </el-table-column>
            <el-table-column
              prop="company"
              label="公司"
              width="100">
            </el-table-column>
            <el-table-column
              prop="city"
              label="城市"
              width="100">
            </el-table-column>
            <el-table-column
              label="月薪">
              <template slot-scope="{ row }">
                {{ row.minSalary }} ~ {{ row.maxSalary }}
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card  class="job-card" shadow="hover">
          <!--  根据左边的选择行显示详细信息-->
          <div v-if="selectedJob" class="job-details">
            <h3>{{ selectedJob.jdTitle }}</h3>
            <p>公司：{{ selectedJob.company }}</p>
            <p>城市：{{ selectedJob.city }}</p>
            <p>月薪：{{ selectedJob.minSalary }} ~ {{ selectedJob.maxSalary }}</p>
          </div>
          <div v-else>
            请选择一行以查看详细信息
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      jobList: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市'
      }],
      currentRow: null,
      selectedJob: null // 当前选择的职位详情信息
    }
  },
  methods: {
    handleCurrentChange(currentRow) {
      this.selectedJob = currentRow
    }
  }
}
</script>

<style>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.clearfix{
  display: flex;
  justify-content: center;
  align-items: center;
}

.job-container {
  padding: 20px;
  position: relative;
  height: 600px;
}

.job-card {
  height: 500px;
}

.el-col {
  border-radius: 4px;
}

.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 100px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
</style>
