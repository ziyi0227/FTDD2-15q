<template>
  <div class="talent-recommendation">
    <el-row gutter="20">
      <el-col span="24">
        <div ref="chart" class="chart-container"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  data() {
    return {
      chartData: [
        {
          '职位': '前端开发工程师',
          '关键技术': [
            'HTML5',
            'CSS3',
            'JavaScript',
            'React',
            'Vue',
            'Angular',
            'TypeScript',
            'Webpack',
            'Babel',
            'ESLint'
          ],
          '关系': [
            { '源': '前端开发工程师', '目标': 'HTML5', '类型': '必需技能' },
            { '源': '前端开发工程师', '目标': 'CSS3', '类型': '必需技能' },
            { '源': '前端开发工程师', '目标': 'JavaScript', '类型': '核心技能' },
            { '源': '前端开发工程师', '目标': 'React', '类型': '框架技能', '可替代': ['Vue', 'Angular'] },
            { '源': '前端开发工程师', '目标': 'Webpack', '类型': '构建工具' }
          ]
        },
        {
          '职位': '后端开发工程师',
          '关键技术': [
            'Java',
            'Python',
            'Node.js',
            'C#',
            'Go',
            'Spring Boot',
            'Django',
            'Flask',
            'Express.js',
            'MySQL',
            'MongoDB',
            'Redis'
          ],
          '关系': [
            { '源': '后端开发工程师', '目标': 'Java', '类型': '编程语言' },
            { '源': '后端开发工程师', '目标': 'Spring Boot', '类型': '框架技能', '基于': 'Java' },
            { '源': '后端开发工程师', '目标': 'Python', '类型': '编程语言' },
            { '源': '后端开发工程师', '目标': 'Django', '类型': '框架技能', '基于': 'Python' },
            { '源': '后端开发工程师', '目标': 'MySQL', '类型': '数据库技术' },
            { '源': '后端开发工程师', '目标': 'MongoDB', '类型': '数据库技术', '用途': 'NoSQL' }
          ]
        },
        {
          '职位': '数据分析师',
          '关键技术': [
            'SQL',
            'Python (Pandas, NumPy, Matplotlib)',
            'R',
            'Tableau',
            'Excel',
            'SPSS',
            'Hadoop',
            'Spark',
            'Machine Learning (Scikit-learn, TensorFlow)'
          ],
          '关系': [
            { '源': '数据分析师', '目标': 'SQL', '类型': '数据查询' },
            { '源': '数据分析师', '目标': 'Python', '类型': '数据分析语言', '工具': ['Pandas', 'NumPy', 'Matplotlib'] },
            { '源': '数据分析师', '目标': 'Tableau', '类型': '数据可视化工具' },
            {
              '源': '数据分析师',
              '目标': 'Machine Learning',
              '类型': '高级技能',
              '工具': ['Scikit-learn', 'TensorFlow']
            }
          ]
        }
      ]
    }
  },
  mounted() {
    this.renderChart()
  },
  methods: {
    renderChart() {
      const chartDom = this.$refs.chart
      const myChart = echarts.init(chartDom)

      const categories = []
      const nodes = []
      const links = []

      this.chartData.forEach((job, index) => {
        categories.push({ name: job.职位 })
        nodes.push({ name: job.职位, category: index, symbolSize: 40, draggable: true })
        job.关键技术.forEach(tech => {
          nodes.push({ name: tech, category: index, symbolSize: 30, draggable: true })
          links.push({
            source: job.职位,
            target: tech,
            value: '关键技能'
          })
        })
        job.关系.forEach(relation => {
          links.push({
            source: relation.源,
            target: relation.目标,
            value: relation.类型
          })
        })
      })

      const option = {
        title: {
          text: '计算机相关知识图谱'
        },
        tooltip: {},
        legend: {
          data: categories.map(category => category.name)
        },
        series: [
          {
            type: 'graph',
            layout: 'force',
            data: nodes,
            links: links,
            categories: categories,
            roam: true,
            label: {
              show: true
            },
            force: {
              repulsion: 100,
              edgeLength: [30, 100]
            }
          }
        ]
      }

      myChart.setOption(option)
    }
  }
}
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 600px;
}
</style>
