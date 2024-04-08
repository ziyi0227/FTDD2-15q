<template>
  <el-col span="24">
    <el-row :gutter="10">
      <el-col v-for="card in seekerList" :key="card.id" :span="8">
        <el-card shadow="hover" class="custom-card">
          <img
            src="https://sky-take-out-runa.oss-cn-hangzhou.aliyuncs.com/QQ%E5%9B%BE%E7%89%8720220930232419.jpg"
            class="image"
          >
          <div style="padding: 10px; margin-bottom: 5px">
            <h3>{{ card.jdTitle }}</h3>
            <div class="bottom clearfix" style="margin-bottom: auto">
              <el-row>
                <el-tag>{{ card.jdSubType }}</el-tag>
              </el-row>
              <el-row>
                <el-button type="text" class="button" @click="showDetails(card)">查看详情</el-button>
              </el-row>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
      :visible.sync=" detailVisible
      "
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
  </el-col>
</template>

<script>
export default {
  // 接收父组件传过来的数据
  props: {
    seekerList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      detailVisible: false,
      selectedTalent: {},
      cardsData: []
    }
  },
  methods: {
    showDetails(talent) {
      this.selectedTalent = talent
      this.detailVisible = true
    },
    handleCloseModal() {
      this.selectedTalent = {}
      this.detailVisible = false
    }
  }
}
</script>

<style>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover; /* 图片填充整个容器并保持纵横比不变 */
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.custom-card {
  width: 220px; /* 调整卡片的宽度 */
  margin-bottom: 10px; /* 调整卡片之间的间距 */
}
</style>
