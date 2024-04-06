<template>
  <div class="page-container">
    <el-row :gutter="12">
      <el-col :span="24">
        <el-card shadow="always">
          <el-page-header content="企业中心" @back="goBack"/>
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
            <!--             头像展示以及编辑 -->
            <el-upload
              class="avatar-uploader"
              action=""
              :http-request="onFileSelected"
              name="file"
              :auto-upload="true"
              :show-file-list="false"
              style="display: inline-block;"
            >
              <img v-if="userInfo.avatar" :src="userInfo.avatar" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon">编辑</i>
            </el-upload>
            <div style="margin-left: 10px; display: inline-block;">
              <h2>{{ userInfo.username }}</h2>
            </div>
          </div>
        </el-card>
        <!--        -->
        <el-card :data="actionList">
          <div>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-card class="card-hover-feedback">
                  <div>
                    <el-statistic
                      group-separator=","
                      :precision="2"
                      :title="title1"
                      :value="actionList.jobCount"
                    >
                    </el-statistic>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="6">
                <el-card class="card-hover-feedback">
                  <div>
                    <el-statistic :title="title2">
                      <template slot="formatter">
                        {{ actionList.satisfiedCount }}
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
                      :title="title3"
                      :value="actionList.browsedCount"
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
                    <el-statistic title="投递人数" :value="actionList.deliveredCount">
                    </el-statistic>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-tab-pane>
      <!--      -->
      <el-tab-pane label="已发布的招聘">
        <el-card class="customer-list">
          <job-list />
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="应聘者简历">
        <el-card class="customer-list">
          <seeker-list />
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="想不出来暂时">
        <el-card class="customer-list">
          鸽
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { Message } from 'element-ui'
import isfollowid from 'core-js/internals/array-includes'
import { updateAvatar, updateUserInfo, getActionInfoHr } from '@/api/user'
import jobList from '@/views/userInfo/components/JobList.vue'
import seekerList from '@/views/userInfo/components/seekerList.vue'
// import axios from 'axios' // 引入获取用户信息的接口
export default {
  components: {
    jobList,
    seekerList
  },
  data() {
    return {
      nickname: '昵称',
      design: '设计',
      like: true,
      title1: '发布招聘总数',
      title2: '满意简历',
      title3: '浏览总数',
      title4: '投递人数',
      // imageUrl: '',
      tabPosition: 'left',
      userInfo: {
        username: '',
        avatar: ''
      },
      actionList: {
        browsedCount: 0,
        jobCount: 0,
        deliveredCount: 0,
        satisfiedCount: 0
      }
    }
  },
  computed: {
    isfollowid() {
      return isfollowid
    }
  },
  created() {
    this.getInfo()
    this.getActionList()
  },
  methods: {
    async getActionList() {
      const result = await getActionInfoHr()
      this.actionList = result.data
      Message.success('获取用户行为信息成功')
    },
    peopleAdd() {
      this.value2 += 1
    },
    // 新增处理文件选择事件的方法
    onFileSelected(file) {
      // const file = event.target.files[0]

      if (!file) return

      const formData = new FormData()
      formData.append('file', file.file)

      this.setAvatar(formData)
    },
    // 更新uploadAvatar方法，去除对el-upload的依赖
    setAvatar(formData) {
      updateAvatar(formData).then(res => {
        if (res.code === 20000) {
          this.userInfo.avatar = res.data
          console.log(res.data)
          console.log(res.message)
          Message.success('上传头像成功')
          updateUserInfo(this.userInfo).then(res => {
            if (res.code === 20000) {
              Message.success('更新用户信息成功')
            } else {
              Message.error('更新用户信息失败')
            }
          })
        } else {
          Message.error('上传头像失败------------')
        }
      })
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
    handleCurrentChange(val) {
      this.currentPage = val
    },
    async goBack() {
      this.$router.push('/dashboard')
    },
    // async getInfo() {
    //   // const res = await getUserInfo()
    //   this.userInfo = res.data
    //   Message.success('获取用户信息成功')
    // },
    uploadSuccess(result) {
      if (result.success) {
        this.userInfo.avatar = result.data // 将返回的头像URL设置为用户信息中的头像地址
        console.log('上传成功', result.data)
      } else {
        this.$message.error('上传头像失败')
      }
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

.el-tab-pane {
  font-size: 16px; /* 设置内容字体大小 */
}

.el-tabs__content {
  height: 1200px !important; /* 设置内容区域的高度 */
  overflow-y: auto !important; /* 如果内容过多，显示滚动条 */
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
