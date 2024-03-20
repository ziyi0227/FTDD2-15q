<template>
  <div class="page-container">
    <el-row :gutter="12">
      <el-col :span="24">
        <el-card shadow="always">
          <el-page-header content="用户中心" @back="goBack"/>
        </el-card>
      </el-col>
    </el-row>
    <el-tabs :tab-position="tabPosition" type="card" style="height: 800px;">
      <el-tab-pane label="个人信息">
        <!--        <el-card class="page-container">-->
        <template>
          <div class="header">
            <span>hr个人资料</span>
          </div>
        </template>
        <!-- 头像展示以及编辑 -->
        <el-card class>
          <div class="avatar-and-username" style="display: flex; align-items: center;">
            <!-- 头像展示以及编辑 -->
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              style="display: inline-block;"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon">编辑</i>
            </el-upload>
            <div style="margin-left: 10px; display: inline-block;">
              <h2>用户名</h2>
            </div>
          </div>
        </el-card>
        <!--        -->
        <el-card>
          <div>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-card class="card-hover-feedback" @click.native="peopleAdd">
                  <div>
                    <el-statistic
                      group-separator=","
                      :precision="2"
                      :value="value2"
                      :title="title2"
                    ></el-statistic>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="6">
                <el-card class="card-hover-feedback">
                  <div>
                    <el-statistic title="被邀请面试">
                      <template slot="formatter">
                        456/2
                      </template>
                    </el-statistic>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="6">
                <el-card class="card-hover-feedback">
                  <div>
                    <el-statistic
                      group-separator=","
                      :precision="2"
                      decimal-separator="."
                      :value="value1"
                      :title="title"
                    >
                      <template slot="prefix">
                        <i class="el-icon-s-flag" style="color: red"></i>
                      </template>
                      <template slot="suffix">
                        <i class="el-icon-s-flag" style="color: blue"></i>
                      </template>
                    </el-statistic>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="6">
                <el-card class="card-hover-feedback">
                  <div>
                    <el-statistic :value="like ? 521 : 520" title="Feedback">
                      <template slot="suffix">
                <span @click="like = !like" class="like">
                  <i class="el-icon-star-on" style="color:red" v-show="!!like"></i>
                  <i class="el-icon-star-off" v-show="!like"></i>
                </span>
                      </template>
                    </el-statistic>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-tab-pane>
      <!--      -->
      <el-tab-pane label="收藏列表">
        <el-card class="customer-list">
          <template #header>
            <div class="header">
              <span>收藏的招聘信息</span>
            </div>
          </template>
          <el-table :data="pagedJobList" style="width: 100%">
            <el-table-column prop="company" label="公司名"/>
            <el-table-column prop="title" label="职位名称"/>
            <el-table-column prop="phone" label="hr电话号码"/>
            <el-table-column label="操作">
              <template #default="{row}">
                <el-button type="danger" size="small" @click="removeJob(row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            :current-page="currentPage"
            :page-size="pageSize"
            layout="prev, pager, next"
            :total="jobList.length"
            @current-change="handleCurrentChange"
          />
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="功能三">待开发</el-tab-pane>
      <el-tab-pane label="功能四">待开发</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { reactive } from 'vue' // 引入Vue 2的reactive以创建响应式对象
import { Message } from 'element-ui'
import isfollowid from 'core-js/internals/array-includes'

export default {
  data() {
    return {
      nickname: '昵称',
      design: '设计',
      like: true,
      value1: 4154.564,
      value2: 1314,
      title: '收藏职位数',
      title2: '简历被查看次数',
      imageUrl: '',
      tabPosition: 'left',
      rules: {
        username: [{ required: true, message: '用户名', trigger: 'blur' }, {
          pattern: /^\S{1,10}$/,
          message: '昵称必须是1-10位的非空字符串',
          trigger: 'blur'
        }],
        age: [{ required: true, message: '用户年龄', trigger: 'blur' }, {
          type: 'number',
          message: '用户年龄格式不正确',
          trigger: 'blur'
        }],
        live_city: [{ required: true, message: '现居地址', trigger: 'blur' }],
        desire_industry: [{ required: true, message: '期望行业', trigger: 'blur' }],
        cur_industry: [{ required: true, message: '最近工作行业', trigger: 'blur' }],
        degree: [{ required: true, message: '学历', trigger: 'blur' }],
        start_work_date: [{ required: true, message: '开始工作时间', trigger: 'blur' }]
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
    }
  },
  computed: {
    isfollowid() {
      return isfollowid
    },
    pagedJobList() {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      return this.jobList.slice(start, end)
    }
  },
  methods: {
    peopleAdd() {
      this.value2 += 1
    },

    // 上传头像前的校验
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },

    async updateForm(formName) {
      const form = this.$refs[formName]
      const valid = true // 调用验证库的验证方法

      if (valid) {
        Message.success('修改成功')
        // 调用接口修改用户信息（暂无）
      } else {
        Message.error('修改失败')
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    removeJob(row) {
      const index = this.jobList.findIndex(item => item.id === row.id)
      if (index !== -1) {
        this.jobList.splice(index, 1)
        Message.success('成功删除客户信息')
      } else {
        Message.error('删除失败')
      }
    },
    async goBack() {
      this.$router.push('/dashboard')
    }
  }
}
</script>
<style scoped lang="scss">
.page-container {
  max-width: 1600px; /* 设置最大宽度 */
  margin: 0 auto; /* 水平居中 */
}

.header {
  font-size: 20px;
  font-weight: bold;
  padding: 15px;
  background-color: #409DFDFF;
  color: white;
}

.info-card {
  margin-top: 20px;
}

.avatar-and-username {
  display: flex;
  align-items: center;
}

.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.like {
  cursor: pointer;
  font-size: 25px;
  display: inline-block;
}

.card-hover-feedback {
  display: flex; /* 使用 flex 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  transition: background-color 0.3s ease;
  margin-bottom: 20px; /* 调整卡片之间的底部间距 */
  margin-right: 20px; /* 调整卡片之间的右侧间距 */
  height: 150px;

  &:hover {
    background-color: #f5f7fa;
    cursor: pointer;
  }
}

//.el-tabs__item {
//  font-size: 16px !important; /* 设置标签字体大小 */
//  height: 60px !important; /* 设置标签高度 */
//}

.el-tab-pane {
  font-size: 16px; /* 设置内容字体大小 */
}

.el-tabs__content {
  height: 1200px !important; /* 设置内容区域的高度 */
  overflow-y: auto !important; /* 如果内容过多，显示滚动条 */
}
.custom-statistic .el-statistic-value,
.custom-statistic .el-statistic-title {
  font-size: 24px; /* 调整字体大小为 24 像素，您可以根据需要调整此值 */
}
</style>

<style>
.el-tabs__item {
  font-size: 20px !important; /* 设置标签字体大小 */
  height: 100px !important; /* 设置标签高度 */
  line-height: 100px; /* 设置标签文字垂直居中 */
  text-align: center; /* 设置标签文字水平居中 */
}
</style>
