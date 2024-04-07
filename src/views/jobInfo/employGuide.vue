<template>
  <div>
    <el-card>
      <el-row style="margin-bottom: 40px">
        <h2 style="margin-left: 15px; margin-top: 15px">简历信息如下</h2>
        <div
          style="background-color: #FF6A00;
            height: 8px;
            width: 14%;
            margin-top: -18px;
            margin-left: 48px;"
        />
      </el-row>
      <el-row gutter="30">
        <el-col :span="14">
          <el-form ref="form" :model="resume" :rules="rules" label-width="100px">
            <el-row>
              <el-form-item label="专业" prop="major">
                <el-input v-model="resume.major" autocomplete="off"/>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="性别" prop="sex">
                <el-radio-group v-model="resume.sex">
                  <el-radio label="1">男</el-radio>
                  <el-radio label="2">女</el-radio>
                  <el-radio label="3">保密</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="姓名" prop="name">
                <el-input v-model="resume.name" autocomplete="off"/>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="电话" prop="phone">
                <el-input v-model="resume.phone" autocomplete="off"/>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="年龄" prop="age">
                <el-input v-model="resume.age" autocomplete="off"/>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="现居住地" prop="liveCity">
                <el-input v-model="resume.liveCity" autocomplete="off"/>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="学历" prop="degree">
                <el-input v-model="resume.degree" autocomplete="off"/>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="期望职类" prop="desireJdType">
                <el-input v-model="resume.desireJdType" autocomplete="off"/>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="期望薪水" prop="desireJdSalaryId">
                <el-input v-model="resume.desireJdSalaryId" autocomplete="off"/>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="期望行业" prop="desireJdIndustry">
                <el-input v-model="resume.desireJdIndustry" autocomplete="off"/>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="期望工作城市" prop="desireCity">
                <el-input v-model="resume.desireCity" autocomplete="off"/>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="开始工作时间" prop="start_work_date">
                <el-input v-model="resume.startWorkDate" autocomplete="off"/>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="当前薪水" prop="currentSalaryId">
                <el-input v-model="resume.currentSalaryId" autocomplete="off"/>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="最近工作行业" prop="curIndustry">
                <el-input v-model="resume.curIndustry" autocomplete="off"/>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="最近工作职类" prop="curJdType">
                <el-input v-model="resume.curJdType" autocomplete="off"/>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="工作经验" prop="experience">
                <el-input v-model="resume.experience" type="textarea" autocomplete="off"/>
              </el-form-item>
            </el-row>
            <el-form-item>
              <el-button type="warning" @click="saveResume()">确定</el-button>
              <el-button @click="onCancel">取消</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="9">
          <el-form>
            <el-form-item label="上传简历" prop="resumeFile">
              <el-upload
                class="avatar-uploader"
                action=""
                :http-request="uploadResume"
                name="resume"
                :auto-upload="true"
                :show-file-list="false"
                style="display: inline-block;"
              >
                <img v-if="resume.resumeFile" :src="resume.resumeFile" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon">编辑</i>
              </el-upload>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import resumeApi from '@/api/resume' // 导入简历相关的API接口

export default {
  data() {
    return {
      resume: {
        // major: '',
        // sex: '',
        // name: '',
        // phone: '',
        // age: '',
        // live_city: '',
        // degree: '',
        // desire_jd_type: '',
        // desire_jd_salary_id: '',
        // desire_jd_industry: '',
        // desire_city: '',
        // experience: '',
        // start_work_date: '',
        // current_salary_id: '',
        // cur_industry: '',
        // cur_jd_type: '',
        // resumeFile: '' // 上传的简历文件
        // // 其他字段根据实际需要继续补充
      },
      rules: {
        // 校验规则可以根据实际情况进行定义
      }
    }
  },
  created() {
    resumeApi.getMyResume().then(response => {
      // 获取简历信息成功，更新表单数据
      this.resume = response.data
      if (this.resume == null) {
        this.resume = {}
      }
    }).catch(error => {
      // 获取简历信息失败，处理异常情况
      console.error('获取简历信息失败:', error)
    })
  },
  methods: {
    onCancel() {
      // 取消操作
      this.$router.push('/resumeInfo')
    },
    uploadResume(file) {
      const formData = new FormData()
      formData.append('File', file.file)

      // 调用上传简历的API接口
      resumeApi.getResume(formData).then(response => {
        // 上传成功，获取返回的文件路径并更新到表单数据中
        this.resume.resumeFile = response.data.filePath
        this.resume = response.data
      }).catch(error => {
        // 上传失败，处理异常情况
        console.error('上传简历失败:', error)
      })
    },
    saveResume() {
      if (!this.resume.sex) {
        this.resume.sex = '3' // 3 表示保密
      }
      // 保存简历信息
      resumeApi.saveResume(this.resume).then(response => {
        // 保存成功，处理成功后的逻辑
        this.$message({
          message: '保存成功',
          type: 'success'
        });
        this.$router.push('/resumeInfo')
      }).catch(error => {
        // 保存失败，处理失败后的逻辑
        console.error('保存失败:', error)
      })
    }
    // 其他方法根据实际需要继续补充
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
</style>
