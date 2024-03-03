<template>
  <div>
    <el-card class="page-container">
      <template #header>
        <div class="header">
          <span>求职者个人资料</span>
        </div>
      </template>
      <el-row>
        <el-col :span="12">
          <el-form :model="userInfo" :rules="rules" label-width="100px" size="large">
            <el-form-item label="用户名">
              <el-input v-model="userInfo.username" disabled></el-input>
            </el-form-item>
            <el-form-item label="用户年龄" prop="age">
              <el-input v-model="userInfo.age"></el-input>
            </el-form-item>
            <el-form-item label="现居地址" prop="live_city">
              <el-input v-model="userInfo.live_city"></el-input>
            </el-form-item>
            <el-form-item label="期望行业" prop="desire_industry">
              <el-input v-model="userInfo.desire_industry"></el-input>
            </el-form-item>
            <el-form-item label="最近工作行业" prop="cur_industry">
              <el-input v-model="userInfo.cur_industry"></el-input>
            </el-form-item>
            <el-form-item label="学历" prop="degree">
              <el-input v-model="userInfo.degree"></el-input>
            </el-form-item>
            <el-form-item label="开始工作时间" prop="start_work_date">
              <el-date-picker
                v-model="userInfo.start_work_date"
                type="date"
                placeholder="选择日期"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="updateForm('userInfo')">提交修改</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="customer-list">
      <template #header>
        <div class="header">
          <span>收藏的招聘信息</span>
        </div>
      </template>
      <el-table :data="pagedJobList" style="width: 100%">
        <el-table-column prop="company" label="公司名"></el-table-column>
        <el-table-column prop="title" label="职位名称"></el-table-column>
        <el-table-column prop="phone" label="hr电话号码"></el-table-column>
        <el-table-column label="操作">
          <template #default="{row}">
            <el-button @click="removeJob(row)" type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="jobList.length">
      </el-pagination>
    </el-card>
  </div>
</template>
<script>
import {reactive} from 'vue'; // 引入Vue 2的reactive以创建响应式对象
import {Message} from 'element-ui';

export default {
  data() {
    return {
      rules: {
        username: [{required: true, message: '用户名', trigger: 'blur'}, {
          pattern: /^\S{1,10}$/,
          message: '昵称必须是1-10位的非空字符串',
          trigger: 'blur'
        }],
        age: [{required: true, message: '用户年龄', trigger: 'blur'}, {
          type: 'number',
          message: '用户年龄格式不正确',
          trigger: 'blur'
        }],
        live_city: [{required: true, message: '现居地址', trigger: 'blur'}],
        desire_industry: [{required: true, message: '期望行业', trigger: 'blur'}],
        cur_industry: [{required: true, message: '最近工作行业', trigger: 'blur'}],
        degree: [{required: true, message: '学历', trigger: 'blur'}],
        start_work_date: [{required: true, message: '开始工作时间', trigger: 'blur'},]
      },
      userInfo: {
        username: '',
        email: '',
        age: '',
        live_city: '',
        desire_industry: '',
        cur_industry: '',
        degree: '',
        start_work_date: ''
      },
      jobList: [
        { company: '公司1', title: '职位1', phone: '1234567890' },
        { company: '公司2', title: '职位2', phone: '0987654321' }
      ],
      pageSize: 5,
      currentPage: 1
    };
  },
  computed: {
    pagedJobList() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.jobList.slice(start, end);
    }
  },
  methods: {
    async updateForm(formName) {
      let form = this.$refs[formName];
      let valid = true; // 调用验证库的验证方法

      if (valid) {
        Message.success('修改成功');
        // 调用接口修改用户信息（暂无）
      } else {
        Message.error('修改失败');
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    removeJob(row) {
      const index = this.jobList.findIndex(item => item.id === row.id);
      if (index !== -1) {
        this.jobList.splice(index, 1);
        Message.success('成功删除客户信息');
      } else {
        Message.error('删除失败');
      }
    }
  }
};
</script>
<style scoped>

.page-container {
  margin: 20px;
}

.header {
  font-size: 20px;
  font-weight: bold;
  padding: 15px;
  background-color: #f0f2f5;
}

.form-row {
  margin-top: 20px;
}

/* 提交按钮 hover 和 active 状态 */
.el-form-item button:hover,
.el-form-item button:focus {
  background-color: #2b85e4;
}

/* 错误提示样式 */
.el-form-item.is-error .el-input__inner,
.el-form-item.is-error .el-date-editor__editor {
  border-color: #ff4949;
}

/* 成功提示样式 */
.el-message-box__content.success {
  color: #67C23A;
}
</style>
