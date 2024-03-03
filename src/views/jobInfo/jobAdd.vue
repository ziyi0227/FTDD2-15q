<template>
  <div>
    <el-card>
      <el-form :model="jobform" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="职位名称" prop="name">
          <el-input v-model="jobform.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="职位子类" prop="type">
          <el-select v-model="jobform.type" placeholder="请选择">
            <el-option label="Full-time" value="Full-time" />
            <el-option label="Part-time" value="Part-time" />
            <el-option label="Internship" value="Internship" />
          </el-select>
        </el-form-item>
        <el-form-item label="城市" prop="location">
          <el-input v-model="jobform.location" autocomplete="off" />
        </el-form-item>
        <el-form-item label="职位描述" prop="desc">
          <el-input v-model="jobform.desc" type="textarea" />
        </el-form-item>
        <el-form-item label="职位要求" prop="requirements">
          <el-input v-model="jobform.requirements" type="textarea" />
        </el-form-item>
        <el-form-item label="月薪" prop="salary">
          <el-input v-model="jobform.salary" autocomplete="off" />
        </el-form-item>
        <el-form-item label="联系方式" prop="contact">
          <el-input v-model="jobform.contact" autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">创建</el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      jobform: {
        name: '',
        type: '',
        location: '',
        desc: '',
        requirements: '',
        salary: '',
        contact: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入职位名称', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请输入职位子类', trigger: 'change' }
        ],
        location: [
          { required: true, message: '请输入城市', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请输入职位描述', trigger: 'blur' }
        ],
        requirements: [
          { required: true, message: '请输入职位要求', trigger: 'blur' }
        ],
        salary: [
          { required: true, message: '请输入职位月薪', trigger: 'blur' }
        ],
        contact: [
          { required: true, message: '请输入联系方式', trigger: 'blur' }
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
</style>
