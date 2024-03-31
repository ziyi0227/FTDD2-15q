
<!--<template>-->
<!--  <div :class="className" :style="{height:height,width:width}" />-->
<!--</template>-->

<!--<script>-->
<!--import * as echarts from 'echarts'-->
<!--require('echarts/theme/macarons') // echarts theme-->
<!--import resize from './mixins/resize'-->

<!--const animationDuration = 6000-->

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
<!--          trigger: 'axis',-->
<!--          axisPointer: { // 坐标轴指示器，坐标轴触发有效-->
<!--            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'-->
<!--          }-->
<!--        },-->
<!--        grid: {-->
<!--          top: 10,-->
<!--          left: '2%',-->
<!--          right: '2%',-->
<!--          bottom: '25%', // 调整为25%以便显示图例-->
<!--          containLabel: true-->
<!--        },-->
<!--        xAxis: [{-->
<!--          type: 'category',-->
<!--          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],-->
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
<!--          data: ['计算机科学', '电子工程', '机械工程']-->
<!--        },-->
<!--        series: [{-->
<!--          name: '计算机科学',-->
<!--          type: 'bar',-->
<!--          stack: 'vistors',-->
<!--          barWidth: '60%',-->
<!--          data: [79, 52, 200, 334, 390, 330, 220],-->
<!--          animationDuration-->
<!--        }, {-->
<!--          name: '电子工程',-->
<!--          type: 'bar',-->
<!--          stack: 'vistors',-->
<!--          barWidth: '60%',-->
<!--          data: [80, 52, 200, 334, 390, 330, 220],-->
<!--          animationDuration-->
<!--        }, {-->
<!--          name: '机械工程',-->
<!--          type: 'bar',-->
<!--          stack: 'vistors',-->
<!--          barWidth: '60%',-->
<!--          data: [30, 52, 200, 334, 390, 330, 220],-->
<!--          animationDuration-->
<!--        }]-->
<!--      })-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->
<template>
  <div :class="className" :style="{height: height, width: width}" />
</template>

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
      chart: null
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
      statisticsApi.getHotMajor()
        .then(response => {
          this.handleMajorData(response.data)
        })
        .catch(error => {
          console.error('Failed to fetch hot major data:', error)
        })
    },
    handleMajorData(data) {
      const xAxisData = ['Sunday', 'Saturday', 'Friday', 'Thursday', 'Wednesday', 'Tuesday', 'Monday']
      const seriesData = []

      data.forEach(item => {
        const seriesIndex = seriesData.findIndex(series => series.name === item.majorData.major)
        if (seriesIndex !== -1) {
          seriesData[seriesIndex].data.push(item.majorData.count)
        } else {
          seriesData.push({
            name: item.majorData.major,
            type: 'bar',
            stack: 'vistors',
            barWidth: '60%',
            data: [item.majorData.count],
            animationDuration: 2000
          })
        }
      })

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

