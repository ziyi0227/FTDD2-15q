<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>
<!--<script>-->
<!--import * as echarts from 'echarts'-->
<!--require('echarts/theme/macarons') // echarts theme-->
<!--import resize from './mixins/resize'-->
<!--import statisticsApi from '@/api/statistics'-->

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
<!--      default: '350px'-->
<!--    },-->
<!--    autoResize: {-->
<!--      type: Boolean,-->
<!--      default: true-->
<!--    }-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      chart: null,-->
<!--      chartData: {-->
<!--        jobTitles: [],-->
<!--        jobData: []-->
<!--      }-->
<!--    }-->
<!--  },-->
<!--  mounted() {-->
<!--    this.$nextTick(() => {-->
<!--      this.initChart()-->
<!--      this.fetchHotJobs()-->
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
<!--    },-->
<!--    setOptions() {-->
<!--      const { jobTitles, jobData } = this.chartData-->

<!--      if (!jobData || jobData.length === 0) {-->
<!--        console.error('No data to display')-->
<!--        return-->
<!--      }-->

<!--      // 处理 x 轴数据，使用月份作为 x 轴数据-->
<!--      const xData = jobData[0].map(item => item.month)-->

<!--      this.chart.setOption({-->
<!--        xAxis: {-->
<!--          type: 'category',-->
<!--          data: xData,-->
<!--          boundaryGap: false,-->
<!--          axisTick: {-->
<!--            show: false-->
<!--          }-->
<!--        },-->
<!--        grid: {-->
<!--          left: 10,-->
<!--          right: 10,-->
<!--          bottom: 20,-->
<!--          top: 30,-->
<!--          containLabel: true-->
<!--        },-->
<!--        tooltip: {-->
<!--          trigger: 'axis',-->
<!--          axisPointer: {-->
<!--            type: 'cross'-->
<!--          },-->
<!--          padding: [5, 10]-->
<!--        },-->
<!--        yAxis: {-->
<!--          axisTick: {-->
<!--            show: false-->
<!--          }-->
<!--        },-->
<!--        legend: {-->
<!--          data: jobTitles-->
<!--        },-->
<!--        series: jobData.map((data, index) => ({-->
<!--          name: jobTitles[index],-->
<!--          smooth: true,-->
<!--          type: 'line',-->
<!--          data: data.map(item => item.count),-->
<!--          animationDuration: 2800,-->
<!--          animationEasing: 'cubicInOut'-->
<!--        }))-->
<!--      })-->
<!--    },-->
<!--    fetchHotJobs() {-->
<!--      statisticsApi.getHotJobTitle()-->
<!--        .then(response => {-->
<!--          const jobTitles = response.data || []-->
<!--          const promises = jobTitles.map(jobTitle => {-->
<!--            return statisticsApi.getHotJobData({ jobTitle })-->
<!--              .then(response => {-->
<!--                const jobData = response.data || {}-->
<!--                const monthData = Object.entries(jobData).map(([month, count]) => ({ month, count }))-->
<!--                this.chartData.jobTitles.push(jobTitle)-->
<!--                this.chartData.jobData.push(monthData)-->
<!--              })-->
<!--              .catch(error => {-->
<!--                console.error(`Failed to fetch data for job title "${jobTitle}":`, error)-->
<!--                this.chartData.jobTitles.push(jobTitle)-->
<!--                this.chartData.jobData.push([])-->
<!--              })-->
<!--          })-->
<!--          Promise.all(promises)-->
<!--            .then(() => {-->
<!--              this.setOptions()-->
<!--            })-->
<!--            .catch(error => {-->
<!--              console.error('Failed to fetch chart data:', error)-->
<!--            })-->
<!--        })-->
<!--        .catch(error => {-->
<!--          console.error('Failed to fetch hot jobs:', error)-->
<!--        })-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->
<script>
import * as echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import statisticsApi from '@/api/statistics'

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
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      chart: null,
      chartData: {
        jd_sub_types: [],
        jobData: []
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
      this.fetchHotJobs()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
    },
    setOptions() {
      const { jd_sub_types, jobData } = this.chartData

      if (!jobData || jobData.length === 0) {
        console.error('No data to display')
        return
      }

      // 处理 x 轴数据，使用月份作为 x 轴数据
      const xData = jobData[0].map(item => item.month).sort((a, b) => parseInt(a) - parseInt(b)) // 对月份进行排序

      this.chart.setOption({
        xAxis: {
          type: 'category',
          data: xData.map(month => month), // 在这里添加 '月' 字符串以确保月份显示
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: jd_sub_types
        },
        series: jobData.map((data, index) => ({
          name: jd_sub_types[index],
          smooth: true,
          type: 'line',
          data: data.map(item => item.count).reverse(), // 反转数据
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        }))
      })
    },
    fetchHotJobs() {
      statisticsApi.getHotJobTitle()
        .then(response => {
          const jd_sub_types = response.data || []
          const promises = jd_sub_types.map(jd_sub_type => {
            return statisticsApi.getHotJobData({ jd_sub_type })
              .then(response => {
                const jobData = response.data || {}
                const monthData = Object.entries(jobData).map(([month, count]) => ({ month, count }))
                this.chartData.jd_sub_types.push(jd_sub_type)
                this.chartData.jobData.push(monthData)
              })
              .catch(error => {
                console.error(`Failed to fetch data for job title "${jd_sub_type}":`, error)
                this.chartData.jd_sub_types.push(jd_sub_type)
                this.chartData.jobData.push([])
              })
          })
          Promise.all(promises)
            .then(() => {
              this.setOptions()
            })
            .catch(error => {
              console.error('Failed to fetch chart data:', error)
            })
        })
        .catch(error => {
          console.error('Failed to fetch hot jobs:', error)
        })
    }
  }
}
</script>
