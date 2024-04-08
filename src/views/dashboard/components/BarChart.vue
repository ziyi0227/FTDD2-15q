
<template>
  <div :class="className" :style="{height: height, width: width}"/>
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
<!--      this.fetchHotMajorData()-->
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
<!--    fetchHotMajorData() {-->
<!--      // 获取当前时-->
<!--      statisticsApi.getHotMajor()-->
<!--        .then(response => {-->
<!--          alert('12353')-->
<!--          this.handleMajorData(response.data)-->
<!--        })-->
<!--        .catch(error => {-->
<!--          console.error('Failed to fetch hot major data:', error)-->
<!--        })-->
<!--    },-->
<!--    handleMajorData(data) {-->
<!--      const xAxisData = ['Sunday', 'Saturday', 'Friday', 'Thursday', 'Wednesday', 'Tuesday', 'Monday']-->
<!--      const seriesData = []-->

<!--      data.forEach(item => {-->
<!--        const seriesIndex = seriesData.findIndex(series => series.name === item.majorData.major)-->
<!--        if (seriesIndex !== -1) {-->
<!--          seriesData[seriesIndex].data.push(item.majorData.count)-->
<!--        } else {-->
<!--          seriesData.push({-->
<!--            name: item.majorData.major,-->
<!--            type: 'bar',-->
<!--            stack: 'vistors',-->
<!--            barWidth: '60%',-->
<!--            data: [item.majorData.count],-->
<!--            animationDuration: 2000-->
<!--          })-->
<!--        }-->
<!--      })-->

<!--      this.chart.setOption({-->
<!--        tooltip: {-->
<!--          trigger: 'axis',-->
<!--          axisPointer: {-->
<!--            type: 'shadow'-->
<!--          }-->
<!--        },-->
<!--        grid: {-->
<!--          top: 10,-->
<!--          left: '2%',-->
<!--          right: '2%',-->
<!--          bottom: '25%',-->
<!--          containLabel: true-->
<!--        },-->
<!--        xAxis: [{-->
<!--          type: 'category',-->
<!--          data: xAxisData,-->
<!--          axisTick: {-->
<!--            alignWithLabel: true-->
<!--          }-->
<!--        }],-->
<!--        yAxis: [{-->
<!--          type: 'value',-->
<!--          axisTick: {-->
<!--            show: false-->
<!--          }-->
<!--        }],-->
<!--        legend: {-->
<!--          bottom: 0,-->
<!--          data: seriesData.map(series => series.name)-->
<!--        },-->
<!--        series: seriesData-->
<!--      })-->
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
      default: '300px'
    }
  },
  data() {
    return {
      chart: null,
      majorData: [] // Add a new data property to store the received major data
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
      this.fetchHotMajorData()
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
    fetchHotMajorData() {
      // 获取当前时
      statisticsApi.getHotMajor()
        .then(response => {
          console.log('Response from API:', response.data)
          this.handleMajorData(response.data)
        })
        .catch(error => {
          console.error('Failed to fetch hot major data:', error)
        })
    },
    handleMajorData(data) {
      const xAxisData = data.map(item => item.dayOfWeek)
      const seriesData = []

      // 初始化专业数据
      const majorDataMap = {}
      data.forEach(item => {
        Object.entries(item.majorData).forEach(([major, { count }]) => {
          if (!majorDataMap[major]) {
            majorDataMap[major] = Array(xAxisData.length).fill(0)
          }
          const index = xAxisData.indexOf(item.dayOfWeek)
          majorDataMap[major][index] = count
        })
      })

      // 转换为echarts需要的格式
      Object.entries(majorDataMap).forEach(([major, counts]) => {
        seriesData.push({
          name: major,
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: counts,
          animationDuration: 2000
        })
      })

      // 更新图表数据
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          top: 10,
          left: '2%',
          right: '2%',
          bottom: '25%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: xAxisData,
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          }
        }],
        legend: {
          bottom: 0,
          data: seriesData.map(series => series.name)
        },
        series: seriesData
      })
    }
  }
}
</script>
