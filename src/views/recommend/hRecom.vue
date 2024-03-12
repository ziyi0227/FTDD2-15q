<template>

    <div class="talent-recommendation">
      <!-- 搜索框 -->
      <el-form inline>
        <el-form-item label="职位筛选：" prop="query">
          <el-select v-model="searchKeyword" placeholder="按姓名/职位搜索">
            <el-option
              v-for="option in searchOptions"
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
      <!-- 将整体的 el-card 移入 v-for 循环内 -->
      <div v-for="(talent, index) in talents" :key="index" class="talent-card-container">
        <el-card class="recommendation-card">
          <el-radio-group v-model="size" @change="handleSizeChange">
<!--            <el-radio label="medium">中等</el-radio>-->
<!--            <el-radio label="small">小型</el-radio>-->
<!--            <el-radio label="mini">超小</el-radio>-->
            -->
          </el-radio-group>

          <el-descriptions :title="`${index + 1}. ${talent.username}`" :column="3" :size="size">
            <el-descriptions-item :label="'手机号'">
              {{ talent.phone }}
            </el-descriptions-item>
            <el-descriptions-item :label="'居住地'">
              {{ talent.location }}
            </el-descriptions-item>
            <el-descriptions-item :label="'职位标签'">
              <el-tag>{{ talent.tag }}</el-tag>
            </el-descriptions-item>
            <template slot="extra">
              <el-button type="primary" size="small">查看详情</el-button>
            </template>
          </el-descriptions>
        </el-card>
      </div>

      <!-- ...添加更多 tab 内容，比如公司推荐等... -->
    </div>
</template>

<script>
export default {
  data() {
    return {
      size: '',
      talents: [
        {
          username: '张三',
          phone: '13800138000',
          location: '北京市',
          tag: '前端工程师'
        },
        {
          username: '李四',
          phone: '13800138001',
          location: '上海市',
          tag: '后端工程师'
        },
        {
          username: '王五',
          phone: '13800138002',
          location: '广州市',
          tag: '产品经理'
        }
      ],
      displayedTalents: [], // 当前展示的人才数据（根据搜索和分页筛选）
      totalTalents: 0, // 总人才数量，用于分页
      searchKeyword: '', // 搜索关键词
      searchOptions: [
        { label: '全部', value: '' },
        { label: '前端工程师', value: '前端工程师' },
        { label: '后端工程师', value: '后端工程师' },
        { label: '产品经理', value: '产品经理' },
        { label: 'UI 设计师', value: 'UI 设计师' }
      ],
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
    handleSizeChange(size) {
      this.size = size
    },
    // handlePageChange(pageNum) {
    //   this.currentPage = pageNum
    //   this.displayedTalents = this.filteredTalents
    // },
    handlePageChange(pageNum) {
      this.currentPage = pageNum
      this.displayedTalents = this.filteredTalents.slice((pageNum - 1) * this.pageSize, pageNum * this.pageSize);
    }
  }
}
</script>

<!--<style scoped>-->
<!--.talent-recommendation {-->
<!--  padding: 24px;-->
<!--}-->

<!--.talent-card-container {-->
<!--  margin-bottom: 24px;-->
<!--}-->
<!--.recommendation-card {-->
<!--// 如果需要的话，可以在这里给独立卡片添加特定样式-->
<!--}-->
<!--</style>-->
<style scoped>
.talent-recommendation {
  padding: 24px;
}

.recommendation-card {
  margin-bottom: 24px;
}

.descriptions-extra-margin {
  margin-top: 16px;
}

.talent-description {
  margin-bottom: 16px;
}
</style>
