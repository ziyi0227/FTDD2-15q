
<template>
  <div>
    <el-row :gutter="12">
    <el-col :span="24">
      <el-card shadow="always">
        <el-page-header @back="goBack" content="用户中心">
        </el-page-header>
      </el-card>
    </el-col>
    </el-row>
  <el-tabs :tab-position="tabPosition" style="height: 625px;">
    <el-tab-pane label="个人信息" >
      <el-card class="page-container">
        <template #header>
          <div class="header">
            <span>面试官基本资料</span>
          </div>
        </template>
        <el-row class="form-row">
          <el-col :span="12">
            <el-form :model="hrInfo" :rules="rules" label-width="100px" size="large">
              <el-form-item label="用户名">
                <el-input v-model="hrInfo.username" disabled></el-input>
              </el-form-item>
              <el-form-item label="用户年龄" prop="age">
                <el-input v-model="hrInfo.age"></el-input>
              </el-form-item>
              <el-form-item label="公司地址" prop="address">
                <el-input v-model="hrInfo.address"></el-input>
              </el-form-item>
              <el-form-item label="公司名称" prop="company">
                <el-input v-model="hrInfo.company"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="updateForm('hrInfo')">提交修改</el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="6">
            <img class="avatar" src="../../assets/QQ图片20220930232405.jpg" alt="企业头像">
          </el-col>
        </el-row>
      </el-card>

    </el-tab-pane>
    <el-tab-pane label="收藏列表">
      <el-card class="customer-list">
        <template #header>
          <div class="header">
            <span>收藏的招聘者信息</span>
          </div>
        </template>
        <el-table :data="pagedCustomerList" style="width: 100%">
          <el-table-column prop="name" label="客户姓名"></el-table-column>
          <el-table-column prop="email" label="邮箱"></el-table-column>
          <el-table-column prop="phone" label="电话号码"></el-table-column>
          <el-table-column label="操作">
            <template #default="{row}">
              <el-button @click="removeCustomer(row)" type="danger" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="prev, pager, next"
          :total="customerList.length">
        </el-pagination>
      </el-card>
    </el-tab-pane>
    <el-tab-pane label="功能三" >待开发</el-tab-pane>
    <el-tab-pane label="功能四">待开发</el-tab-pane>
  </el-tabs>
    </div>
</template>

<script>
import {reactive} from 'vue';
import {Message} from 'element-ui';

export default {
  data() {
    return {
      tabPosition: 'left',
      rules: {
        username: [{required: true, message: '请输入用户名', trigger: 'blur'}, {
          pattern: /^\S{1,10}$/,
          message: '用户名必须是1-10位的非空字符串',
          trigger: 'blur'
        }],
        age: [{required: true, message: '请输入用户年龄', trigger: 'blur'}, {
          type: 'number',
          message: '用户年龄格式不正确',
          trigger: 'blur'
        }],
        address: [{required: true, message: '请输入公司地址', trigger: 'blur'}],
        company: [{required: true, message: '请输入公司名称', trigger: 'blur'}]
      },
      hrInfo: {
        username: '',
        company: '',
        address: '',
        age: ''
      },
      customerList: [
        { name: '客户1', email: 'client1@example.com', phone: '1234567890' },
        { name: '客户2', email: 'client2@example.com', phone: '0987654321' },
        { name: '客户2', email: 'client2@example.com', phone: '0987654321' },
        { name: '客户2', email: 'client2@example.com', phone: '0987654321' },
        { name: '客户2', email: 'client2@example.com', phone: '0987654321' },
        { name: '客户2', email: 'client2@example.com', phone: '0987654321' },
        { name: '客户2', email: 'client2@example.com', phone: '0987654321' },
        { name: '客户2', email: 'client2@example.com', phone: '0987654321' },
        { name: '客户2', email: 'client2@example.com', phone: '0987654321' }

      ],
      pageSize: 5,
      currentPage: 1
    };
  },
  computed: {
    pagedCustomerList() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.customerList.slice(start, end);
    }
  },
  methods: {
    async updateForm(formName) {
      let form = this.$refs[formName];
      let valid = true ; // 调用验证库的验证方法

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
    removeCustomer(row) {
      const index = this.customerList.findIndex(item => item.id === row.id);
      if (index !== -1) {
        this.customerList.splice(index, 1);
        Message.success('成功删除客户信息');
      } else {
        Message.error('删除失败');
      }
    },
    goBack() {
      this.$router.push('/dashboard')
    }
  }
};

</script>

<style scoped>
.page-container {
  margin: 20px;
}

.customer-list {
  margin-top: 20px;
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

.el-button--primary:hover,
.el-button--primary:focus {
  background-color: #2b85e4;
}

.el-form-item.is-error .el-input__inner,
.el-form-item.is-error .el-date-editor__editor {
  border-color: #ff4949;
}

.el-message-box__content.success {
  color: #67C23A;
}

.header {
  font-size: 20px;
  font-weight: bold;
  padding: 15px;
  background-color: #ff8833;
}

.avatar {
  width: 100%;
  max-width: 200px;
  height: auto;
}

</style>
