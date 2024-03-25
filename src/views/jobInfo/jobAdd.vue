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
      <el-form :model="jobform" :rules="rules" ref="form" label-width="100px">
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
              <el-input v-model="jobform.city" autocomplete="off" />
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
              <el-input-number v-model="jobform.requireNums" controls-position="right"></el-input-number>
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
              <el-date-picker v-model="jobform.startDate" placeholder="开始日期"/>
            </el-col>
            <el-col :span="3" class="line">
              ~
            </el-col>
            <el-col :span="6">
              <el-date-picker v-model="jobform.endDate" placeholder="结束日期"/>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="4">
            <el-form-item label="是否出差" prop="isTravel">
              <el-switch
                v-model="jobform.isTravel"
                active-color="#FF6A00"
                inactive-color="#626262">
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="工作经验年限" prop="minYears">
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
          <el-button type="warning" @click="onSubmit">创建</el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      已经添加的，选择来修改
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      salaryRange: {
        minSalary: '',
        maxSalary: ''
      },
      jobform: {
        jdTitle: '', // 职位标题
        company: '', // 公司
        city: '', // 城市
        jdSubType: '', // 职位子类
        requireNums: null, // 需求人数
        minSalary: '', // 最低月薪
        maxSalary: '', // 最高月薪
        startDate: '', // 开始日期
        endDate: '', // 结束日期
        isTravel: false, // 是否出差
        minYears: '', // 工作经验年限
        minEducation: '', // 最低学历
        titleSkill: '', // 职位/专业技能
        knowledge: '', // 专业知识
        quality: '' // 个人素养
      },
      roles: {
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
  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$message({
            message: 'Job added successfully',
            type: 'success'
          })
        } else {
          this.$message.error('Form validation failed')
          return false
        }
      })
    },
    onCancel() {
      this.$router.push('/jobInfo')
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
