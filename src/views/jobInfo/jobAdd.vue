<template>
  <div>
    <el-card>
      <el-row style="margin-bottom: 40px">
        <h2 style="margin-left: 15px; margin-top: 15px">添加您需要招聘的岗位</h2>
        <div
          style="background-color: #FF6A00;
            height: 8px;
            width: 24%;
            margin-top: -18px;
            margin-left: 58px;"
        />
      </el-row>
      <el-form ref="form" :model="jobform" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="16">
            <el-form-item label="职位标题" prop="jdTitle">
              <el-input v-model="jobform.jdTitle" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9">
            <el-form-item label="公司" prop="company">
              <el-input v-model="jobform.company" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="城市" prop="city">
              <el-cascader
                v-model="jobform.city"
                class="widthSmall"
                size="large"
                :options="options"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9">
            <el-form-item label="职位子类" prop="jdSubType">
              <el-input v-model="jobform.jdSubType" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="需求人数" prop="requireNums">
              <el-input-number v-model="jobform.requireNums" controls-position="right" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="月薪" prop="salaryRange">
            <el-col :span="6">
              <el-input v-model="jobform.minSalary" placeholder="最低月薪" autocomplete="off" />
            </el-col>
            <el-col :span="3" class="line">
              ~
            </el-col>
            <el-col :span="6">
              <el-input v-model="jobform.maxSalary" placeholder="最高月薪" autocomplete="off" />
            </el-col>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="日期" prop="dateRange">
            <el-col :span="6">
              <el-date-picker v-model="jobform.startDate" placeholder="开始日期" />
            </el-col>
            <el-col :span="3" class="line">
              ~
            </el-col>
            <el-col :span="6">
              <el-date-picker v-model="jobform.endDate" placeholder="结束日期" />
            </el-col>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="4">
            <el-form-item label="是否出差" prop="isTravel">
              <el-switch
                v-model="jobform.isTravel"
                active-color="#FF6A00"
                inactive-color="#626262"
                :active-value="1"
                :inactive-value="0"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="工作经验" prop="minYears">
              <el-select v-model="jobform.minYears" placeholder="请选择">
                <el-option label="不限" value="不限" />
                <el-option label="一年到三年" value="一年到三年" />
                <el-option label="三年到五年" value="三年到五年" />
                <el-option label="五年到十年" value="五年到十年" />
                <el-option label="十年以上" value="十年以上" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="最低学历" prop="minEducation">
              <el-select v-model="jobform.minEducation" placeholder="请选择">
                <el-option label="不限" value="不限" />
                <el-option label="大专" value="大专" />
                <el-option label="本科" value="本科" />
                <el-option label="硕博" value="硕博" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="职位/专业技能" prop="titleSkill">
              <el-input v-model="jobform.titleSkill" type="textarea" maxlength="120" show-word-limit />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="专业知识" prop="knowledge">
              <el-input v-model="jobform.knowledge" type="textarea" maxlength="120" show-word-limit />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="个人素养" prop="quality">
              <el-input v-model="jobform.quality" type="textarea" maxlength="120" show-word-limit />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="warning" @click="saveJobList()">确定</el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-row style="margin-bottom: 40px">
        <h2 style="margin-left: 15px; margin-top: 15px">您已经添加的岗位</h2>
        <div
          style="background-color: #FF6A00;
            height: 8px;
            width: 18%;
            margin-top: -18px;
            margin-left: 58px;"
        />
      </el-row>
      <el-table
        :data="jobList"
        stripe
        style="width: 100%"
      >
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
          <template slot-scope="{ row }">
            <el-col :span="12">
              <el-button type="warning" size="small" @click="jobChange(row)">编辑</el-button>
            </el-col>
            <el-col :span="12">
              <el-button type="danger" size="small" @click="deleteJob">删除</el-button>
            </el-col>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { regionData, CodeToText } from 'element-china-area-data'
import jobApi from '@/api/jobTable'

export default {
  data() {
    return {
      form: {},
      options: regionData, // 省市区数据
      selectedOptions: [], // 选中的地区
      salaryRange: {
        minSalary: '',
        maxSalary: ''
      },
      jobform: {
        id: '',
        jdTitle: '',
        company: '',
        city: '',
        jdSubType: '',
        requireNums: '',
        minSalary: '',
        maxSalary: '',
        startDate: '',
        endDate: '',
        isTravel: 0,
        minYears: '',
        minEducation: '',
        titleSkill: '',
        knowledge: '',
        quality: ''
      },
      jobList: [],
      rules: {
        jdTitle: [
          { required: true, message: '请输入职位名称', trigger: 'blur' }
        ],
        company: [
          { required: true, message: '请输入公司名称', trigger: 'blur' }
        ],
        city: [
          { required: true, message: '请输入城市', trigger: 'blur' }
        ],
        jdSubType: [
          { required: true, message: '请输入职位子类', trigger: 'change' }
        ],
        requireNums: [
          { required: true, message: '请输入需求人数', trigger: 'blur' },
          { type: 'number', message: '需求人数必须为数字值' }
        ],
        minSalary: [
          { required: true, message: '请输入最低月薪', trigger: 'blur' }
        ],
        maxSalary: [
          { required: true, message: '请输入最高月薪', trigger: 'blur' }
        ],
        startDate: [
          { required: true, message: '请选择开始日期', trigger: 'change' }
        ],
        endDate: [
          { required: true, message: '请选择结束日期', trigger: 'change' }
        ],
        isTravel: [
          { required: true, message: '请选择是否出差', trigger: 'change' }
        ],
        minYears: [
          { required: true, message: '请选择工作经验年限', trigger: 'change' }
        ],
        minEducation: [
          { required: true, message: '请选择最低学历', trigger: 'change' }
        ],
        titleSkill: [
          { required: true, message: '请输入职位/专业技能', trigger: 'blur' }
        ],
        knowledge: [
          { required: true, message: '请输入专业知识', trigger: 'blur' }
        ],
        quality: [
          { required: true, message: '请输入个人素养', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    // 初始化省市区
    this.selectedOptions = [this.form.provinceCode, this.form.cityCode]
    this.getJobByUser()
    this.jobform = {}
  },
  methods: {
    onCancel() {
      this.$router.push('/jobInfo')
    },
    addressChange(arr) {
      var _this = this
      _this.jobform.city = arr.join(',')
    },
    saveJobList() {
      // 将日期转换为JavaScript日期对象
      const startDate = new Date(this.jobform.startDate)
      const endDate = new Date(this.jobform.endDate)

      // 格式化日期为yyyyMMdd格式
      this.jobform.startDate = this.formatDate(startDate)
      this.jobform.endDate = this.formatDate(endDate)

      this.addressChange(this.jobform.city)

      const isTravel = this.jobform.isTravel
      this.jobform.isTravel = isTravel ? 1 : 0

      this.$refs.form.validate((valid) => {
        if (valid) {
          jobApi.saveJobList(this.jobform).then(response => {
            this.getJobByUser()
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            // 清空数据
            this.jobform = {}
          })
        } else {
          this.$message.error('输入错误')
          return false
        }
      })
    },
    convertDate(dateString) {
      // 将字符串解析为年、月、日
      const year = dateString.substring(0, 4)
      const month = dateString.substring(4, 6)
      const day = dateString.substring(6, 8)

      // 创建日期对象
      const date = new Date(`${year}-${month}-${day}`)

      // 将日期对象转换为ISO 8601格式
      const isoString = date.toISOString()

      return isoString
    },
    getJobByUser() {
      jobApi.getJobByUser().then(response => {
        this.jobList = response.data
      })
      // this.$message({
      //   message: '查询成功',
      //   type: 'success'
      // })
    },
    formatDate(date) {
      const year = date.getFullYear()
      let month = (1 + date.getMonth()).toString()
      month = month.length > 1 ? month : '0' + month
      let day = date.getDate().toString()
      day = day.length > 1 ? day : '0' + day
      return year + month + day
    },
    jobChange(row) {
      // console.log('Start Date:', row.startDate);
      // console.log('End Date:', row.endDate);
// 手动格式化日期
      const formatDateString = (dateString) => {
        const year = dateString.substring(0, 4);
        const month = dateString.substring(4, 6);
        const day = dateString.substring(6, 8);
        return `${year}-${month}-${day}`;
      };

      // 将当前编辑行的数据赋值给编辑表单的数据变量
      this.editJobData = Object.assign({}, row)
      // 手动赋值给表单数据
      this.jobform = {
        id: row.id,
        jdTitle: row.jdTitle,
        company: row.company,
        city: row.city.split(','), // 将逗号分隔的字符串转换为数组
        jdSubType: row.jdSubType,
        requireNums: row.requireNums,
        minSalary: row.minSalary,
        maxSalary: row.maxSalary,
        startDate: formatDateString(row.startDate), // 格式化日期
        endDate: formatDateString(row.endDate), // 格式化日期
        isTravel: row.isTravel,
        minYears: row.minYears,
        minEducation: row.minEducation,
        titleSkill: row.titleSkill,
        knowledge: row.knowledge,
        quality: row.quality
      }
    }
  }
}
</script>

<style>
  .el-card {
    margin: 10px 25px;
  }

  .el-form-item {
    margin-bottom: 20px;
  }

  .el-button {
    margin-right: 10px;
  }

  .el-input {
    width: 100%;
  }

  .line{
    text-align: center;
  }
</style>
