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
            style="width: 100%"
            @current-change="handleCurrentChange"
          >
            <el-table-column
              prop="jdTitle"
              label="职位标题"
              width="100"
            />
            <el-table-column
              prop="company"
              label="公司"
              width="100"
            />
            <el-table-column
              prop="city"
              label="城市"
              width="100"
            />
            <el-table-column
              label="月薪"
            >
              <template slot-scope="{ row }">
                {{ row.minSalary }} ~ {{ row.maxSalary }}
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card class="job-card" shadow="hover">
          <!--  根据左边的选择行显示详细信息-->
          <div v-if="selectedJob" class="job-details">
            <h3>{{ selectedJob.jdTitle }}</h3>
            <p>公司：{{ selectedJob.company }}</p>
            <p>城市：{{ selectedJob.city }}</p>
            <p>职位子类：{{ selectedJob.jdSubType }}</p>
            <p>需求人数：{{ selectedJob.requireNums }}</p>
            <p>月薪：{{ selectedJob.minSalary }} ~ {{ selectedJob.maxSalary }}</p>
            <p>日期：{{ selectedJob.startDate }} ~ {{ selectedJob.endDate }}</p>
            <p>是否要求出差：{{ selectedJob.isTravel }}</p>
            <p>工作经验年限：{{ selectedJob.minYears }}</p>
            <p>最低学历：{{ selectedJob.minEducation }}</p>
            <p>职位与专业技能：{{ selectedJob.titleSkill }}</p>
            <p>专业知识：{{ selectedJob.knowledge }}</p>
            <p>个人素养：{{ selectedJob.quality }}</p>
          </div>
          <div v-else>
            请选择一行以查看详细信息
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-card class="eval-card">
      <el-row gutter="0">
        <el-col :span="14" style="background-color: #f0f0f0; height: 555px">
          <h3 style="margin-left: 15px; margin-top: 15px">我能胜任这个职位吗？</h3>
          <div
            style="background-color: #FF6A00;
            height: 8px;
            width: 27%;
            margin-top: -18px;
            margin-left: 52px;"
          />
          <div>

          </div>
        </el-col>
        <el-col :span="1" style="background-color: #ffffff; height: 555px">

        </el-col>
        <el-col :span="9" style="background-color: #f0f0f0; height: 555px">
          <div>
            <el-button style="float: right; padding: 3px 10px" type="text" @click="drawer = true">去问问AI>></el-button>
            <h3 style="margin-left: 15px; margin-top: 15px">我应该怎么做？</h3>
            <div
              style="background-color: #FF6A00;
            height: 8px;
            width: 27%;
            margin-top: -18px;
            margin-left: 52px;"
            />
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-drawer
      title="问问AI"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose">
      <span>AI界面</span>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      direction: 'rtl',
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
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
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
  height: 1200px;
}

.job-card {
  height: 500px;
}

.eval-card {
  margin-top: 10px;
  height: 600px;
}

.el-col {
  border-radius: 4px;
}

.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 100px;
  color: #FF6A00;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
</style>
