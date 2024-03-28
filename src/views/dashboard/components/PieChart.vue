<!--<template>-->
<!--  <div :class="className" :style="{height:height,width:width}" />-->
<!--</template>-->

<!--<script>-->
<!--import * as echarts from 'echarts'-->
<!--require('echarts/theme/macarons') // echarts theme-->
<!--import resize from './mixins/resize'-->

<!--export default {-->
<!--  mixins: [resize],-->
<!--  props: {-->
<!--    className: {-->
<!--      type: String,-->
<!--      default: 'chart'-->
<!--    },-->
<!--    width: {-->
<!--      type: String,-->
<!--      default: '100%'-->
<!--    },-->
<!--    height: {-->
<!--      type: String,-->
<!--      default: '300px'-->
<!--    }-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      chart: null-->
<!--    }-->
<!--  },-->
<!--  mounted() {-->
<!--    this.$nextTick(() => {-->
<!--      this.initChart()-->
<!--    })-->
<!--  },-->
<!--  beforeDestroy() {-->
<!--    if (!this.chart) {-->
<!--      return-->
<!--    }-->
<!--    this.chart.dispose()-->
<!--    this.chart = null-->
<!--  },-->
<!--  methods: {-->
<!--    initChart() {-->
<!--      this.chart = echarts.init(this.$el, 'macarons')-->

<!--      this.chart.setOption({-->
<!--        tooltip: {-->
<!--          trigger: 'item',-->
<!--          formatter: '{a} <br/>{b} : {c} ({d}%)'-->
<!--        },-->
<!--        legend: {-->
<!--          left: 'center',-->
<!--          bottom: '10',-->
<!--          data: ['Industries', 'Technology', 'Forex', 'Gold', 'Forecasts']-->
<!--        },-->
<!--        series: [-->
<!--          {-->
<!--            name: 'WEEKLY WRITE ARTICLES',-->
<!--            type: 'pie',-->
<!--            roseType: 'radius',-->
<!--            radius: [15, 95],-->
<!--            center: ['50%', '38%'],-->
<!--            data: [-->
<!--              { value: 320, name: 'Industries' },-->
<!--              { value: 240, name: 'Technology' },-->
<!--              { value: 149, name: 'Forex' },-->
<!--              { value: 100, name: 'Gold' },-->
<!--              { value: 59, name: 'Forecasts' }-->
<!--            ],-->
<!--            animationEasing: 'cubicInOut',-->
<!--            animationDuration: 2600-->
<!--          }-->
<!--        ]-->
<!--      })-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->
<!--<template>-->
<!--  <div :class="className" :style="{height:height,width:width}" />-->
<!--</template>-->

<!--<script>-->
<!--import statisticsApi from '@/api/statistics'-->
<!--import * as echarts from 'echarts'-->
<!--require('echarts/theme/macarons') // echarts theme-->
<!--import resize from './mixins/resize'-->

<!--export default {-->
<!--  mixins: [resize],-->
<!--  props: {-->
<!--    className: {-->
<!--      type: String,-->
<!--      default: 'chart'-->
<!--    },-->
<!--    width: {-->
<!--      type: String,-->
<!--      default: '100%'-->
<!--    },-->
<!--    height: {-->
<!--      type: String,-->
<!--      default: '300px'-->
<!--    }-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      chart: null-->
<!--    }-->
<!--  },-->
<!--  created() {-->

<!--  },-->
<!--  mounted() {-->
<!--    this.$nextTick(() => {-->
<!--      this.initChart()-->
<!--    })-->
<!--  },-->
<!--  beforeDestroy() {-->
<!--    if (!this.chart) {-->
<!--      return-->
<!--    }-->
<!--    this.chart.dispose()-->
<!--    this.chart = null-->
<!--  },-->
<!--  methods: {-->
<!--    initChart() {-->
<!--      this.chart = echarts.init(this.$el, 'macarons')-->

<!--      this.chart.setOption({-->
<!--        tooltip: {-->
<!--          trigger: 'item',-->
<!--          formatter: '{a} <br/>{b} : {c} ({d}%)'-->
<!--        },-->
<!--        legend: {-->
<!--          left: 'center',-->
<!--          bottom: '10',-->
<!--          data: ['hdu1', 'hdu2', '杭电', '下沙小清华', '其他企业']-->
<!--        },-->
<!--        series: [-->
<!--          {-->
<!--            name: 'WEEKLY WRITE ARTICLES',-->
<!--            type: 'pie',-->
<!--            roseType: 'radius',-->
<!--            radius: [15, 95],-->
<!--            center: ['50%', '38%'],-->
<!--            data: [-->
<!--              { value: 320, name: 'hdu1' },-->
<!--              { value: 240, name: 'hdu2' },-->
<!--              { value: 149, name: '杭电' },-->
<!--              { value: 100, name: '下沙小清华' },-->
<!--              { value: 59, name: '其他企业' }-->
<!--            ],-->
<!--            animationEasing: 'cubicInOut',-->
<!--            animationDuration: 2600-->
<!--          }-->
<!--        ]-->
<!--      })-->
<!--      this.getHotCompany()-->
<!--      this.getHotCompanyRatio()-->
<!--    },-->
<!--    // 获取到热门公司-->
<!--    async getHotCompany() {-->
<!--      const response = await statisticsApi.getHotCompany()-->
<!--      this.chart.setOption({-->
<!--        legend: {-->
<!--          data: response.data.map(item => item.company)-->
<!--        },-->
<!--        series: [-->
<!--          {-->
<!--            data: response.data.map(item => ({ value: item.count, name: item.company }))-->
<!--          }-->
<!--        ]-->
<!--      })-->
<!--    },-->
<!--    // 计算热门公司所占比例-->
<!--    async getHotCompanyRatio() {-->
<!--      const response = await statisticsApi.getCompanyTotal()-->
<!--      this.chart.setOption({-->
<!--        series: [-->
<!--          {-->
<!--            animationDuration: response.data.length * 100,-->
<!--          }-->
<!--        ]-->
<!--      })-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->
<template>
  <div :class="className" :style="{height: height, width: width}" />
</template>

<script>
import statisticsApi from '@/api/statistics'
import * as echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose()
      this.chart = null
    }
  },
  methods: {
    async initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      // 初始化图表
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: []
        },
        series: [
          {
            name: 'WEEKLY WRITE ARTICLES',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '38%'],
            data: [],
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })

      // 获取热门公司数据
      await this.getHotCompany()
    },
    async getHotCompany() {
      const response = await statisticsApi.getHotCompany()
      const hotCompanyData = response.data

      // 计算热门公司总数
      const totalHotCompany = hotCompanyData.reduce((total, company) => total + company.count, 0)

      // 计算热门公司所占比例
      const hotCompanyRatio = hotCompanyData.map(company => ({
        value: company.count,
        name: company.company
      }))

      // 计算其他公司数量
      const totalCompanyResponse = await statisticsApi.getCompanyTotal()
      const totalCompany = totalCompanyResponse.data
      const otherCompanyCount = totalCompany - totalHotCompany

      // 将其他公司加入到热门公司比例中
      if (otherCompanyCount > 0) {
        hotCompanyRatio.push({
          value: otherCompanyCount,
          name: '其他企业'
        })
      }

      // 更新图表数据
      this.chart.setOption({
        legend: {
          data: hotCompanyData.map(company => company.company)
        },
        series: [
          {
            data: hotCompanyRatio
          }
        ]
      })
    }
  }
}
</script>
