<template>
  <div class="talent-recommendation">
    <el-row gutter="0">
      <el-col span="8">
        <!--<el-card class="user-card">-->
        <!--  user的信息-->
        <!--</el-card>-->
        <el-card class="option-card">
          <div slot="header" class="clearfix">
            <span>操作卡片</span>
          </div>
          <div class="recommendation-button">
            <el-button type="danger" @click="toResume">我的简历</el-button>
          </div>
          <div class="divider" />
          <div class="recommendation-button">
            <el-button type="danger" :loading="isLoading" @click="handleRecommendation">开始推荐</el-button>
          </div>
          <div class="divider" />
          <div class="layout-button">
            <span style="margin-right: 10px">布局：</span>
            <el-button-group>
              <el-button type="danger" icon="el-icon-s-operation" @click="changeLayout('operation')" />
              <el-button type="danger" icon="el-icon-menu" @click="changeLayout('menu')" />
              <el-button type="danger" icon="el-icon-share" @click="changeLayout('share')" />
            </el-button-group>
          </div>
          <div class="divider" />
          <div style="display: flex; align-items: center; margin-bottom: 5px">
            <span style="npmmargin-right: 0px">满意度：</span>
            <el-rate
              v-model="value"
              :colors="['#99A9BF', '#f77f2a', '#ff5900']"
            />
          </div>
        </el-card>
        <el-card class="dialog-card">
          与ai的交互
          <chat />
        </el-card>
      </el-col>
      <el-col span="16">
        <!-- 这里实现三种界面 -->
        <div v-if="currentLayout === 'operation'">
          <transition-group name="el-fade-in-linear">
            <div
              v-for="(talent, index) in talents"
              :key="index"
              class="talent-card-container"
            >
              <el-card class="recommendation-card">
                <el-radio-group v-model="size" @change="handleSizeChange" />
                <el-descriptions :title="`${index + 1}. ${talent.jdTitle}`" :column="3" :size="size">
                  <el-descriptions-item :label="'城市'">
                    {{ talent.city }}
                  </el-descriptions-item>
                  <el-descriptions-item :label="'职位'">
                    {{ talent.jdTitle }}
                  </el-descriptions-item>
                  <el-descriptions-item :label="'职位标签'">
                    <el-tag type="danger">{{ talent.jdSubType }}</el-tag>
                  </el-descriptions-item>
                  <template slot="extra">
                    <el-button type="primary" size="small" @click="showDetails(talent)">查看详情</el-button>
                  </template>
                </el-descriptions>
              </el-card>
              <el-dialog
                :visible.sync="detailVisible"
                width="1000px"
                :before-close="handleCloseModal"
                class="recommendation-dialog"
              >
                <el-card>
                  <el-row>
                    <el-col :span="24">
                      <div>
                        <span>公司：</span>
                        <span>{{ selectedTalent.company }}</span>
                      </div>
                    </el-col>
                    <el-col :span="24">
                      <div>
                        <span>招收职位：</span>
                        <span>{{ selectedTalent.jdTitle }}</span>
                      </div>
                    </el-col>
                    <el-col :span="24">
                      <div>
                        <span>最低学历要求：</span>
                        <span>{{ selectedTalent.minEducation }}</span>
                      </div>
                    </el-col>
                    <el-col :span="24">
                      <div>
                        <span>技能要求：</span>
                        <span>{{ selectedTalent.knowledge }}</span>
                      </div>
                    </el-col>
                    <el-col :span="24">
                      <div>
                        <span>薪资：</span>
                        <span>{{ selectedTalent.minSalary }} -- {{ selectedTalent.maxSalary }}</span>
                      </div>
                    </el-col>
                    <el-col :span="24">
                      <div>
                        <span>工作经验要求：</span>
                        <span>{{ selectedTalent.minYears }}</span>
                      </div>
                    </el-col>
                    <el-col :span="24">
                      <div>
                        <span>需求人数：</span>
                        <span>{{ selectedTalent.requireNums }}</span>
                      </div>
                    </el-col>
                    <el-col :span="24">
                      <div>
                        <span>个人素养：</span>
                        <span>{{ selectedTalent.titleSkill }}</span>
                      </div>
                    </el-col>
                    <el-col :span="24">
                      <div>
                        <span>品质：</span>
                        <span>{{ selectedTalent.quality }}</span>
                      </div>
                    </el-col>
                  </el-row>
                </el-card>
              </el-dialog>
            </div>
          </transition-group>
        </div>
        <div v-else-if="currentLayout === 'menu'">
          <!-- 布局二的内容 -->
          <bilibili :seeker-list="talents" />
          <!-- 略 -->
        </div>
        <div v-else-if="currentLayout === 'share'">
          <!-- 布局三的内容 -->
          <knowsGroup />
          <!-- 略 -->
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import knowsGroup from '@/views/dashboard/components/knowsGroup.vue'
import bilibili from '@/views/recommend/compnents/bilibili.vue'
import chat from '@/views/recommend/compnents/chat.vue'
import axios from 'axios'
import resumeApi from '@/api/resume'

export default {
  components: {
    knowsGroup,
    bilibili,
    chat
  },
  data() {
    return {
      value: null,
      detailVisible: false,
      currentLayout: 'operation', // 默认选中第一个布局
      size: '',
      isLoading: false,
      // jobIdList : [],
      myId: '',
      talents: [],
      selectedTalent: {},
      displayedTalents: [], // 当前展示的人才数据（根据搜索和分页筛选）
      totalTalents: 0, // 总人才数量，用于分页
      searchKeyword: '', // 搜索关键词
      currentPage: 1, // 当前页数
      pageSize: 10 // 每页显示人数
    }
  },
  computed: {
    filteredTalents() {
      // 搜索过滤
      const filtered = this.talents.filter(talent =>
        talent.username.includes(this.searchKeyword) || talent.tag.includes(this.searchKeyword)
      )

      // 分页处理
      const startIndex = (this.currentPage - 1) * this.pageSize
      const endIndex = startIndex + this.pageSize
      return filtered.slice(startIndex, endIndex)
    }
  },
  created() {
    this.totalTalents = this.talents.length
    this.displayedTalents = this.filteredTalents
  },
  methods: {
    changeLayout(layout) {
      this.currentLayout = layout
    },
    handleSizeChange(size) {
      this.size = size
    },
    showDetails(talent) {
      this.selectedTalent = talent
      this.detailVisible = true
    },
    handleCloseModal() {
      this.selectedTalent = {}
      this.detailVisible = false
    },
    handlePageChange(pageNum) {
      this.currentPage = pageNum
      this.displayedTalents = this.filteredTalents.slice((pageNum - 1) * this.pageSize, pageNum * this.pageSize)
    },
    toResume() {
      this.$router.push('/jobInfo/employGuide')
    },
    handleRecommendation() {
      this.myId = resumeApi.getResumeId()
      axios.get('http://127.0.0.1:5000/recommend-job', { params: this.myId }).then(res => {
        this.talents = res.data
        // console.log(res)
        // alert(res)
      })
    }
  }
}
</script>

<style scoped>

.talent-recommendation {
  padding: 10px;
}

.recommendation-button {
  display: flex;
  justify-content: center;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.divider {
  border-top: 1px solid #ccc;
  margin-top: 20px; /* 调整分割线与按钮之间的距离 */
  margin-bottom: 20px; /* 调整分割线与下方内容之间的距离 */
}

.user-card {
  margin-bottom: 24px;
}

.option-card {
  margin-bottom: 24px;
}

.custom-dialog {
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.recommendation-dialog .el-card__body {
  background-color: #f8f8f8;
  font-size: 14px;
  color: #333;
}

.recommendation-dialog .el-row {
  padding: 16px 24px;
}

.recommendation-dialog .el-col {
  border-bottom: 1px solid #ddd;
  padding-bottom: 16px;
  margin-bottom: 16px;
}

.recommendation-card .el-button--primary {
  border-radius: 4px;
  transition: all 0.3s ease;
}

.recommendation-card .el-button--primary:hover {
  background-color: #409EFF;
  border-color: #409EFF;
}

.recommendation-card .el-button--primary.is-active {
  background-color: #206bc4;
  border-color: #206bc4;
}

.recommendation-card {
  background-color: #ffffff;
  border-radius: 12px;
  border: 1px solid #ebeef5;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.el-descriptions__title {
  font-size: 18px;
  font-weight: bold;
  text-decoration: underline;
}

.recommendation-card .el-tag {
  font-size: 14px;
  border-radius: 8px;
  padding: 0 10px;
  margin-right: 10px;
  background-color: #ec407a;
  color: #fff;
}

<style scoped >
  /* 职位卡片容器美化 */
.recommendation-card {
  background-color: #f8f8f8;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

/* 职位描述列表美化 */
.recommendation-card .el-descriptions {
  border: none;
}

/* 职位标签美化 */
.recommendation-card .el-tag {
  margin-right: 10px;
}
/* 修改每行字段间的垂直间距 */
.recommendation-dialog .el-row {
  padding: 16px 0; /* 取消左右内边距，仅增加垂直内边距 */
  padding-bottom: 20px; /* 增加每行字段间的垂直间距 */
}

/* 如果需要增加el-col之间的间距，可以添加如下样式 */
.recommendation-dialog .el-col:not(:last-child) {
  margin-bottom: 10px; /* 为除了最后一个el-col之外的所有col元素添加底部外边距 */
}
</style>
