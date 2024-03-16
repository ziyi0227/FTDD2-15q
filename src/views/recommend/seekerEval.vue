<template>
  <div class="job-container">
    <el-row gutter="16">
      <el-col :span="10">
        <el-card class="job-card" shadow="hover">
          <el-table
            :data="jobList"
            stripe
            highlight-current-row
            @current-change="handleCurrentChange"
            style="width: 100%">
            <el-table-column
              prop="date"
              label="日期"
              width="100">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="100">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址">
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="14">
        <el-card  class="job-card" shadow="hover">

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
      currentRow: null
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.currentRow = val
    }
  }
}
</script>

<style>
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
