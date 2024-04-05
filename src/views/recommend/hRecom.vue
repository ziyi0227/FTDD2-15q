<template>
  <div class="job-container">
    <el-row gutter="16">
      <el-col :span="12">
        <el-card class="job-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>已发布招聘</span>
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
          <div v-if="recommendedList.length > 0">
            <div
              v-for="(talent, index) in recommendedList"
              :key="index"
              class="talent-card-container">
              <el-card class="recommendation-card">
                <el-radio-group v-model="size" @change="handleSizeChange">
                </el-radio-group>
                <el-descriptions :title="`${index + 1}. ${talent.name}`" :column="3" :size="size">
                  <el-descriptions-item :label="'姓名'">
                    {{ talent[0].name || '匿名' }}
                  </el-descriptions-item>
                  <el-descriptions-item :label="'职位'">
                    {{ talent[0].cur_jd_type }}
                  </el-descriptions-item>
                  <el-descriptions-item :label="'求职职位'">
                    <el-tag type="danger">{{ talent[0].desire_jd_type }}</el-tag>
                  </el-descriptions-item>
                  <template slot="extra">
                    <el-button type="primary" size="small" @click="showDetails(talent)">查看详情</el-button>
                  </template>
                </el-descriptions>
              </el-card>
            </div>
          </div>
          <!-- 如果没有推荐人才，则显示提示 -->
          <div v-else>
            请选择一行以查看推荐人才
          </div>
          <el-dialog title="人才详细信息" :visible.sync="detailVisible" width="80%">
            <div v-if="selectedTalent">
              <el-form label-width="100px">
                <el-form-item label="姓名">
                  <span>{{ selectedTalent[0].name || '匿名' }}</span>
                </el-form-item>
                <el-form-item label="性别">
                  <span>{{ selectedTalent[0].sex || '隐私' }}</span>
                </el-form-item>
                <el-form-item label="专业">
                  <span>{{ selectedTalent[0].major || '未提供' }}</span>
                </el-form-item>
                <!-- 添加其它详细信息字段 -->
                <el-form-item label="求职类型">
                  <span>{{ selectedTalent[0].desire_jd_type }}</span>
                </el-form-item>
                <el-form-item label="工作经验">
                  <span>{{ selectedTalent[0].experience }}</span>
                </el-form-item>
                <!-- 其他字段省略，根据需要添加... -->
                <el-form-item label="现居住地">
                  <span>{{ selectedTalent[0].live_city }}</span>
                </el-form-item>
                <!-- ... -->
              </el-form>
            </div>
            <div slot="footer">
              <!--        <el-button @click="talentDetailVisible()">关闭</el-button>-->
            </div>
          </el-dialog>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
import jobApi from '@/api/jobTable'

export default {
  data() {
    return {
      detailVisible: false,
      selectedTalent: [[]],
      size: '',
      talents: [],
      jobList: [], // 已发布招聘
      selectedJob: null, // 选中的招聘
      recommendedList: [], // 推荐的人才列表
      displayedTalents: [] // 当前展示的人才数据（根据搜索和分页筛选）
    }
  },
  // mounted() {
  created() {
    this.totalTalents = this.talents.length
    this.displayedTalents = this.filteredTalents
    this.getMyJob()
  },
  methods: {
    handleCurrentChange(currentRow) {
      this.selectedJob = currentRow
      // alert(currentRow.orderedId)
      this.getRecommendList(currentRow.orderedId)
    },
    async getMyJob() {
      await jobApi.getJobByUser().then(res => {
        this.jobList = res.data
      })
    },
    getRecommendList(jobId) {
      alert(jobId)
      axios.get('http://127.0.0.1:5000/recommend-seeker', { params: { jobId }}).then(response => {
        // 处理响应数据
        this.recommendedList = response.data
        // this.recommendedList = response.data
      }).catch(reason => {
        // 处理错误
        alert(reason)
      })
    },
    showDetails(row) {
      this.selectedTalent = row
      this.detailVisible = true // 假设detailVisible控制详情模态框的显示隐藏
    },
    talentDetailVisible() {
      this.detailVisible = false
      this.selectedTalent = {}
    },
    handleClose() {
      this.detailVisible = false
    },
    handleSizeChange(size) {
      this.size = size
    },
    handlePageChange(pageNum) {
      this.currentPage = pageNum
      this.displayedTalents = this.filteredTalents.slice((pageNum - 1) * this.pageSize, pageNum * this.pageSize)
    }
  }
}
</script>

<style scoped>
.talent-recommendation {
    padding: 24px;
}

.avatar-container {
    display: flex;
    align-items: flex-end; /* 让头像垂直居下 */
    justify-content: flex-end; /* 让头像水平居右 */
    margin-bottom: 16px; /* 给内容区域留出间距 */
}

/* 调整人才卡片样式 */
.recommendation-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 24px;
}

.talent-avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
}

.talent-detail-container {
    padding: 24px;
    font-weight: bold;
    font-size: 20px;
    letter-spacing: 4px;
    line-height: 2;
    /* 添加阴影效果 */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.details-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 24px;
}
</style>
