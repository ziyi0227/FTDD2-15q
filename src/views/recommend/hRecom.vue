<!--<template>-->

<!--    <div class="talent-recommendation">-->
<!--      &lt;!&ndash; 搜索框 &ndash;&gt;-->
<!--      <el-form inline>-->
<!--        <el-form-item label="职位筛选：" prop="query">-->
<!--          <el-select v-model="searchKeyword" placeholder="按姓名/职位搜索">-->
<!--            <el-option-->
<!--              v-for="option in searchOptions"-->
<!--              :key="option.value"-->
<!--              :label="option.label"-->
<!--              :value="option.value"-->
<!--            ></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--      </el-form>-->

<!--      &lt;!&ndash; 分页组件 &ndash;&gt;-->
<!--      <el-pagination-->
<!--        background-->
<!--        layout="prev, pager, next"-->
<!--        :total="totalTalents"-->
<!--        @current-change="handlePageChange"-->
<!--      />-->
<!--      &lt;!&ndash; 将整体的 el-card 移入 v-for 循环内 &ndash;&gt;-->
<!--      <div v-for="(talent, index) in talents" :key="index" class="talent-card-container">-->
<!--        <el-card class="recommendation-card">-->
<!--          <el-descriptions :title="`${index + 1}. ${talent.username}`" :column="3" :size="size">-->
<!--            <el-descriptions-item :label="'手机号'">-->
<!--              {{ talent.phone }}-->
<!--            </el-descriptions-item>-->
<!--            <el-descriptions-item :label="'居住地'">-->
<!--              {{ talent.location }}-->
<!--            </el-descriptions-item>-->
<!--            <el-descriptions-item :label="'职位标签'">-->
<!--              <el-tag>{{ talent.tag }}</el-tag>-->
<!--            </el-descriptions-item>-->
<!--            <template slot="extra">-->
<!--              <el-button type="primary" size="small">查看详情</el-button>-->
<!--            </template>-->
<!--          </el-descriptions>-->
<!--        </el-card>-->
<!--      </div>-->

<!--      &lt;!&ndash; ...添加更多 tab 内容，比如公司推荐等... &ndash;&gt;-->
<!--    </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      size: '',-->
<!--      talents: [-->
<!--        {-->
<!--          username: '张三',-->
<!--          phone: '13800138000',-->
<!--          location: '北京市',-->
<!--          tag: '前端工程师'-->
<!--        },-->
<!--        {-->
<!--          username: '李四',-->
<!--          phone: '13800138001',-->
<!--          location: '上海市',-->
<!--          tag: '后端工程师'-->
<!--        },-->
<!--        {-->
<!--          username: '王五',-->
<!--          phone: '13800138002',-->
<!--          location: '广州市',-->
<!--          tag: '产品经理'-->
<!--        }-->
<!--      ],-->
<!--      displayedTalents: [], // 当前展示的人才数据（根据搜索和分页筛选）-->
<!--      totalTalents: 0, // 总人才数量，用于分页-->
<!--      searchKeyword: '', // 搜索关键词-->
<!--      searchOptions: [-->
<!--        { label: '全部', value: '' },-->
<!--        { label: '前端工程师', value: '前端工程师' },-->
<!--        { label: '后端工程师', value: '后端工程师' },-->
<!--        { label: '产品经理', value: '产品经理' },-->
<!--        { label: 'UI 设计师', value: 'UI 设计师' }-->
<!--      ],-->
<!--      currentPage: 1, // 当前页数-->
<!--      pageSize: 10 // 每页显示人数-->
<!--    }-->
<!--  },-->
<!--  computed: {-->
<!--    filteredTalents() {-->
<!--      // 搜索过滤-->
<!--      const filtered = this.talents.filter(talent =>-->
<!--        talent.username.includes(this.searchKeyword) || talent.tag.includes(this.searchKeyword)-->
<!--      )-->

<!--      // 分页处理-->
<!--      const startIndex = (this.currentPage - 1) * this.pageSize-->
<!--      const endIndex = startIndex + this.pageSize-->
<!--      return filtered.slice(startIndex, endIndex)-->
<!--    }-->
<!--  },-->
<!--  created() {-->
<!--    this.totalTalents = this.talents.length-->
<!--    this.displayedTalents = this.filteredTalents-->
<!--  },-->
<!--  methods: {-->
<!--    handleSizeChange(size) {-->
<!--      this.size = size-->
<!--    },-->
<!--    // handlePageChange(pageNum) {-->
<!--    //   this.currentPage = pageNum-->
<!--    //   this.displayedTalents = this.filteredTalents-->
<!--    // },-->
<!--    handlePageChange(pageNum) {-->
<!--      this.currentPage = pageNum-->
<!--      this.displayedTalents = this.filteredTalents.slice((pageNum - 1) * this.pageSize, pageNum * this.pageSize);-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--&lt;!&ndash;<style scoped>&ndash;&gt;-->
<!--&lt;!&ndash;.talent-recommendation {&ndash;&gt;-->
<!--&lt;!&ndash;  padding: 24px;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;.talent-card-container {&ndash;&gt;-->
<!--&lt;!&ndash;  margin-bottom: 24px;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->
<!--&lt;!&ndash;.recommendation-card {&ndash;&gt;-->
<!--&lt;!&ndash;// 如果需要的话，可以在这里给独立卡片添加特定样式&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->
<!--&lt;!&ndash;</style>&ndash;&gt;-->
<!--<style scoped>-->
<!--.talent-recommendation {-->
<!--  padding: 24px;-->
<!--}-->

<!--.recommendation-card {-->
<!--  margin-bottom: 24px;-->
<!--}-->

<!--.descriptions-extra-margin {-->
<!--  margin-top: 16px;-->
<!--}-->

<!--.talent-description {-->
<!--  margin-bottom: 16px;-->
<!--}-->
<!--</style>-->
<template>
  <div class="talent-recommendation">
    <!-- 搜索框 -->
    <el-form inline>
      <el-form-item label="职位筛选：" prop="query">
        <el-select v-model="searchKeyword" placeholder="按职位搜索">
          <el-option
            v-for="option in searchOptions"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工作经验筛选：" prop="query">
        <el-select v-model="searchByWork" placeholder="按工作经验搜索">
          <el-option
            v-for="option in searchOptionsByWork"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <!-- 分页组件 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="totalTalents"
      @current-change="handlePageChange"
    />

    <!-- 显示人才卡片 -->
    <div v-for="(talent, index) in displayedTalents" :key="index" class="talent-card-container">
      <el-card class="recommendation-card">
        <el-descriptions :title="`${index + 1}. ${talent.username}`" :column="3" :size="size">
          <el-descriptions-item :label="'姓名'">
            {{ talent.name }}
          </el-descriptions-item>
          <el-descriptions-item :label="'学位'">
            {{ talent.degree }}
          </el-descriptions-item>
          <el-descriptions-item :label="'职位'">
            <el-tag>{{ talent.position }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item :label="'工作经验'">
            {{ talent.workExperience }}
          </el-descriptions-item>

          <template slot="extra">
            <el-button type="primary" size="small" @click="showDetails(talent)">查看详情</el-button>
          </template>
        </el-descriptions>
      </el-card>
      <!-- 弹出详情模态框 -->
      <el-dialog :visible.sync="detailVisible" width="60%" :before-close="handleClose">
        <el-card class="talent-detail-container" style="display: flex; flex-direction: column;">
          <div class="avatar-container">
            <el-avatar size="large" :src="selectedTalent.avatar" class="talent-avatar"></el-avatar>
          </div>
          <div class="details-content">
          <h3>{{ selectedTalent.name }}</h3>
          <div>学位：<el-tag>{{ selectedTalent.degree }}</el-tag></div>
          <div>工作经验：{{ selectedTalent.workExperience }}</div>
          <div>性别：{{ selectedTalent.gender }}</div>
          <div>年龄：{{ selectedTalent.age }}</div>
          <div>经历：{{ selectedTalent.experience }}</div>
          <div>地址：{{ selectedTalent.address }}</div>
          <div>期望职位：<el-tag>{{ selectedTalent.desiredPosition }}</el-tag></div>
          <div>电话：{{ selectedTalent.phone }}</div>
          </div>
        </el-card>
        <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="detailVisible = false">关闭</el-button>
    </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detailVisible: false,
      selectedTalent: {},
      size: '',
      talents: [
        {
          id: 1,
          username: '张三',
          name: '张三',
          degree: '硕士',
          workExperience: '5年',
          gender: '男',
          age: 30,
          experience: '在知名互联网公司担任前端工程师',
          address: '北京市',
          position: '前端工程师',
          desiredPosition: '高级前端工程师',
          phone: '13800138000'
        }
        // 其他人才数据...
      ],
      displayedTalents: [], // 当前展示的人才数据（根据搜索和分页筛选）
      totalTalents: 0, // 总人才数量，用于分页
      searchKeyword: '', // 搜索关键词
      searchByWork: '', // 搜索关键词
      searchOptionsByWork: [
        { label: '全部', value: '' },
        { label: '5年', value: '5年' },
        { label: '3年', value: '3年' },
        { label: '1年', value: '1年' }
      ],
      searchOptions: [
        { label: '前端', value: '前端' },
        { label: '后端', value: '后端' },
        { label: '产品', value: '产品' },
        { label: '设计', value: '设计' },
        { label: '运营', value: '运营' },
        { label: '市场', value: '市场' },
        { label: '销售', value: '销售' },
        { label: '人事', value: '人事' },
        { label: '财务', value: '财务' },
        { label: '法务', value: '法务' },
        { label: '行政', value: '行政' },

      ],
      currentPage: 1, // 当前页数
      pageSize: 10 // 每页显示人数
    }
  },
  computed: {
    filteredTalents() {
      // 搜索过滤
      const filtered = this.talents.filter((talent) => {
        return (
          talent.name.includes(this.searchKeyword) ||
          talent.degree.includes(this.searchKeyword) ||
          talent.workExperience.includes(this.searchKeyword)
        )
      })

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
    showDetails(talent) {
      this.selectedTalent = talent
      this.detailVisible = true
    },
    handleClose() {
      this.selectedTalent = {}
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
