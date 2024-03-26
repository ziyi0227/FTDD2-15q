<template>
  <div class="container">
    <!--搜索栏-->
    <el-card>
      <el-input v-model="searchmodel.jobinput" placeholder="请输入内容" class="input-with-select" @change="fetchData">
        <el-select slot="prepend" v-model="searchmodel.jobtype" placeholder="请选择" @change="fetchData">
          <el-option label="职位标题" value="1" />
          <el-option label="公司" value="2" />
          <el-option label="职位类别" value="3" />
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="getJobList" />
      </el-input>
    </el-card>
    <el-card>
      <el-table
        :data="jobList"
        stripe
        style="width: 100%"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="职位标题">
                <span>{{ props.row.jdTitle }}</span>
              </el-form-item>
              <el-form-item label="公司">
                <span>{{ props.row.company }}</span>
              </el-form-item>
              <el-form-item label="城市">
                <span>{{ props.row.city }}</span>
              </el-form-item>
              <el-form-item label="职位子类">
                <span>{{ props.row.jdSubType }}</span>
              </el-form-item>
              <el-form-item label="需求人数">
                <span>{{ props.row.requireNums }}</span>
              </el-form-item>
              <el-form-item label="月薪">
                <template slot-scope="{ props }">
                  <span>{{ props.row.minSalary }} ~ {{ props.row.maxSalary }}</span>
                </template>
              </el-form-item>
              <el-form-item label="日期">
                <template slot-scope="{ props }">
                  <span>{{ props.row.startDate }} ~ {{ props.row.endDate }}</span>
                </template>
              </el-form-item>
              <el-form-item label="是否要求出差">
                <span>{{ props.row.isTravel }}</span>
              </el-form-item>
              <el-form-item label="工作经验年限">
                <span>{{ props.row.minYears === -1 ? '不限' : props.row.minYears }}</span>
              </el-form-item>
              <el-form-item label="最低学历">
                <span>{{ props.row.minEducation }}</span>
              </el-form-item>
              <el-form-item label="职位与专业技能">
                <span>{{ props.row.titleSkill }}</span>
              </el-form-item>
              <el-form-item label="专业知识">
                <span>{{ props.row.knowledge }}</span>
              </el-form-item>
              <el-form-item label="个人素养">
                <span>{{ props.row.quality }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          prop="jdTitle"
          label="职位标题"
          width="180"
        />
        <el-table-column
          prop="company"
          label="公司"
          width="180"
        />
        <el-table-column
          prop="city"
          label="城市"
          width="180"
        />
        <el-table-column
          label="月薪"
        >
          <template slot-scope="{ row }">
            {{ row.minSalary }} ~ {{ row.maxSalary }}
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="160"
        >
          <template slot-scope="scope">
            <el-col :span="8">
              <el-button type="warning" icon="el-icon-star-off" circle @click="setFavor(scope.row)" />
            </el-col>
            <el-col :span="16">
              <el-button type="primary" round @click="setDeliver(scope.row)">投递</el-button>
            </el-col>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!--  分页组件-->
    <el-pagination
      :current-page="searchmodel.pageNo"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="searchmodel.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import jobApi from '@/api/jobTable'
import favorApi from '@/api/favor'
import actionApi from '@/api/action'

export default {
  data() {
    return {
      total: 0,
      searchmodel: {
        pageNo: 1,
        pageSize: 10,
        jobinput: '',
        jobtype: '',
        jdTitle: '',
        company: '',
        jdSubType: ''
      },
      jobList: []
    }
  },
  created() {
    this.getJobList()
  },
  methods: {
    fetchData() {
      // 根据选择的值发起请求并获取数据，这里简单地模拟数据
      switch (this.searchmodel.jobtype) {
        case '1':
          this.searchmodel.jdTitle = this.searchmodel.jobinput
          this.searchmodel.company = ''
          this.searchmodel.jdSubType = ''
          break
        case '2':
          this.searchmodel.company = this.searchmodel.jobinput
          this.searchmodel.jdTitle = ''
          this.searchmodel.jdSubType = ''
          break
        case '3':
          this.searchmodel.jdSubType = this.searchmodel.jobinput
          this.searchmodel.jdTitle = ''
          this.searchmodel.company = ''
          break
        default:
          break
      }
    },
    getJobList() {
      jobApi.getJobList(this.searchmodel).then(response => {
        this.jobList = response.data.rows
        this.total = response.data.total
      })
      this.$message({
        message: '查询成功',
        type: 'success'
      })
    },
    setFavor(row) {
      // 假设您已经获取到jdNo
      const id = row.id

      favorApi.setFavor(id)
        .then(data => {
          this.$message({
            message: data.message,
            type: 'success'
          })
        })
        .catch(error => {
          this.$message.error({
            message: '收藏失败' + error
          })
        })
    },
    setDeliver(row) {
      const id = row.id
      actionApi.deliver(id)
        .then(data => {
          this.$message({
            message: data.message,
            type: 'success'
          })
        })
        .catch(error => {
          this.$message.error({
            message: '投递失败' + error
          })
        })
    },
    handleSizeChange() {
    },
    handleCurrentChange() {
    }
  }
}
</script>

<style>
  .container {
    margin: 15px 10px;
  }

  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }

  .el-card {
    margin-bottom: 10px;
  }

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 120px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
  }
</style>
