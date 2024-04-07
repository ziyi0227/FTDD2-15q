<template>
  <div class="job-container">
    <el-row gutter="16">
      <el-col :span="14">
        <el-card class="job-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>我的收藏</span>
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
          <el-form v-if="selectedJob" class="job-details" size="mini" :label-position="labelPosition">
            <h3>{{ selectedJob.jdTitle }}</h3>
            <el-row class="form-row">
              <el-form-item label="公司：">
                {{ selectedJob.company }}
              </el-form-item>
            </el-row>
            <el-row class="form-row">
              <el-form-item label="城市：">
                {{ selectedJob.city }}
              </el-form-item>
            </el-row>
            <el-row class="form-row">
              <el-form-item label="职位子类：">
                {{ selectedJob.jdSubType }}
              </el-form-item>
            </el-row>
            <el-row class="form-row">
              <el-form-item label="需求人数：">
                {{ selectedJob.requireNums }}
              </el-form-item>
            </el-row>
            <el-row class="form-row">
              <el-form-item label="月薪：">
                {{ selectedJob.minSalary }} ~ {{ selectedJob.maxSalary }}
              </el-form-item>
            </el-row>
            <el-row class="form-row">
              <el-form-item label="日期：">
                {{ selectedJob.startDate }} ~ {{ selectedJob.endDate }}
              </el-form-item>
            </el-row>
            <el-row class="form-row">
              <el-form-item label="是否要求出差：">
                {{ selectedJob.isTravel }}
              </el-form-item>
            </el-row>
            <el-row class="form-row">
              <el-form-item label="工作经验年限：">
                {{ selectedJob.minYears }}
              </el-form-item>
            </el-row>
            <el-row class="form-row">
              <el-form-item label="最低学历：">
                {{ selectedJob.minEducation }}
              </el-form-item>
            </el-row>
            <el-row class="form-row">
              <el-form-item label="职位与专业技能：">
                {{ selectedJob.titleSkill }}
              </el-form-item>
            </el-row>
            <el-row class="form-row">
              <el-form-item label="专业知识：">
                {{ selectedJob.knowledge }}
              </el-form-item>
            </el-row>
            <el-row class="form-row">
              <el-form-item label="个人素养：">
                {{ selectedJob.quality }}
              </el-form-item>
            </el-row>
          </el-form>

          <div v-else>
            请选择一行以查看详细信息
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-card class="eval-card">
      <el-row gutter="5">
        <el-col :span="14" style="background-color: #f0f0f0;">
          <h3 style="margin-left: 15px; margin-top: 15px">我能胜任这个职位吗？</h3>
          <div
            style="background-color: #FF6A00;
        height: 8px;
        width: 27%;
        margin-top: -18px;
        margin-left: 52px;"
          />
          <el-row style="margin-top: 30px">
            <RaddarChart/>
          </el-row>
          <el-scroller  style="height: 800px;">
            <v-md-textarea-editor>评语：{{ evaltext.assess }}</v-md-textarea-editor>
<!--            <div v-html="renderMarkdown(evaltext.assess)"></div>-->
          </el-scroller>
        </el-col>
        <el-col :span="1" style="background-color: #ffffff;"></el-col>
        <el-col :span="8" style="background-color: #f0f0f0;">
          <div>
            <el-button style="float: right; padding: 3px 10px" type="text" @click="drawer = true">去问问AI>></el-button>
            <h3 style="margin-left: 15px; margin-top: 15px">我应该怎么做？</h3>
            <div
              style="background-color: #FF6A00;
          height: 8px;
          width: 27%;
          margin-top: -18px;
          margin-left: 52px;"
            />
          </div>
          <!-- 使用带有滚动条的容器包裹评语内容 -->
          <el-scrollbar style="height: 600px;">
            <v-md-textarea-editor>
              {{ evaltext.commend }}
            </v-md-textarea-editor>
<!--            <div v-html="renderMarkdown(evaltext.commend)"></div>-->
          </el-scrollbar>
        </el-col>
      </el-row>
    </el-card>
<!--    <el-card class="eval-card">-->
<!--      <el-row gutter="0">-->
<!--        <el-col :span="14" style="background-color: #f0f0f0; height: 555px">-->
<!--          <h3 style="margin-left: 15px; margin-top: 15px">我能胜任这个职位吗？</h3>-->
<!--          <div-->
<!--            style="background-color: #FF6A00;-->
<!--            height: 8px;-->
<!--            width: 27%;-->
<!--            margin-top: -18px;-->
<!--            margin-left: 52px;"-->
<!--          />-->
<!--          <el-row style="margin-top: 30px">-->
<!--            <RaddarChart/>-->
<!--          </el-row>-->
<!--          <el-row style="margin: 30px 0 0 20px">-->
<!--            <v-md-textarea-editor>评语：{{ evaltext.assess }}</v-md-textarea-editor>-->
<!--          </el-row>-->
<!--        </el-col>-->
<!--        <el-col :span="1" style="background-color: #ffffff; height: 555px"/>-->
<!--        <el-col :span="9" style="background-color: #f0f0f0; height: 555px">-->
<!--          <div>-->
<!--            <el-button style="float: right; padding: 3px 10px" type="text" @click="drawer = true">去问问AI>></el-button>-->
<!--            <h3 style="margin-left: 15px; margin-top: 15px">我应该怎么做？</h3>-->
<!--            <div-->
<!--              style="background-color: #FF6A00;-->
<!--            height: 8px;-->
<!--            width: 27%;-->
<!--            margin-top: -18px;-->
<!--            margin-left: 52px;"-->
<!--            />-->
<!--          </div>-->
<!--          <el-row style="margin: 30px 0 0 20px">-->
<!--            <v-md-textarea-editor>-->
<!--              {{ evaltext.commend }}-->
<!--            </v-md-textarea-editor>-->
<!--          </el-row>-->
<!--        </el-col>-->
<!--      </el-row>-->
<!--    </el-card>-->
    <el-drawer
      title="问问AI"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
    >
      <span>
        <chat/>
      </span>
    </el-drawer>
  </div>
</template>

<script>
import RaddarChart from '@/views/recommend/components/RaddarChart'
import favorApi from '@/api/favor'
import { getAssess, getSuggest } from '@/api/chat'
import chat from '@/views/recommend/compnents/chat'
// import marked from 'marked'

export default {
  components: {
    RaddarChart,
    chat
  },
  data() {
    return {
      labelPosition: 'right',
      drawer: false,
      direction: 'rtl',
      jobList: [],
      evaltext: {
        assess: '',
        commend: ''
      },
      currentRow: null,
      selectedJob: null // 当前选择的职位详情信息
    }
  },
  created() {
    this.getFavorAll()
  },
  methods: {
    renderMarkdown(text) {
      // 使用marked库将Markdown文本转换为HTML
      return marked(text)
    },
    async handleCurrentChange(currentRow) {
      this.selectedJob = currentRow
      const response = await getAssess({ q: JSON.stringify(currentRow) })
      this.evaltext.assess = response.data.output.text
      const response2 = await getSuggest()
      this.evaltext.commend = response2.data.output.text
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {
        })
    },
    async getFavorAll() {
      await favorApi.getFavorAll().then(response => {
        this.jobList = response.data
      })
    }
  }
}
</script>

<style>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.clearfix {
  display: flex;
  justify-content: center;
  align-items: center;
}

.job-container {
  padding: 20px;
  position: relative;
  height: 1200px;
}

.job-card {
  height: 500px;
}

.eval-card {
  margin-top: 10px;
  height: 800px;
}

.el-col {
  border-radius: 4px;
}

.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 100px;
  color: #FF6A00;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}

.form-row {
  height: 30px;
}
.form-row p {
  word-break: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  max-width: 100%;
  min-height: 40px;
  line-height: 1.5;
}
</style>
