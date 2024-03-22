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
<!--      default: '350px'-->
<!--    },-->
<!--    autoResize: {-->
<!--      type: Boolean,-->
<!--      default: true-->
<!--    },-->
<!--    chartData: {-->
<!--      type: Object,-->
<!--      required: true-->
<!--    }-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      chart: null-->
<!--    }-->
<!--  },-->
<!--  watch: {-->
<!--    chartData: {-->
<!--      deep: true,-->
<!--      handler(val) {-->
<!--        this.setOptions(val)-->
<!--      }-->
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
<!--      this.setOptions(this.chartData)-->
<!--    },-->
<!--    setOptions({ expectedData, actualData } = {}) {-->
<!--      this.chart.setOption({-->
<!--        xAxis: {-->
<!--          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],-->
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
<!--          data: ['expected', 'actual']-->
<!--        },-->
<!--        series: [{-->
<!--          name: 'expected', itemStyle: {-->
<!--            normal: {-->
<!--              color: '#FF005A',-->
<!--              lineStyle: {-->
<!--                color: '#FF005A',-->
<!--                width: 2-->
<!--              }-->
<!--            }-->
<!--          },-->
<!--          smooth: true,-->
<!--          type: 'line',-->
<!--          data: expectedData,-->
<!--          animationDuration: 2800,-->
<!--          animationEasing: 'cubicInOut'-->
<!--        },-->
<!--        {-->
<!--          name: 'actual',-->
<!--          smooth: true,-->
<!--          type: 'line',-->
<!--          itemStyle: {-->
<!--            normal: {-->
<!--              color: '#3888fa',-->
<!--              lineStyle: {-->
<!--                color: '#3888fa',-->
<!--                width: 2-->
<!--              },-->
<!--              areaStyle: {-->
<!--                color: '#f3f8ff'-->
<!--              }-->
<!--            }-->
<!--          },-->
<!--          data: actualData,-->
<!--          animationDuration: 2800,-->
<!--          animationEasing: 'quadraticOut'-->
<!--        }]-->
<!--      })-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->
<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
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
        jobTitles: ['后端工程师', '前端工程师', '算法工程师', '架构师', '运维'],
        jobData: [
        // 数据起伏明显一些
          [234, 132, 101, 345, 90, 345, 210],
          [220, 355, 345, 765, 290, 330, 143],
          [150, 232, 655, 154, 190, 330, 410],
          [999, 332, 301, 334, 390, 330, 320],
          [820, 932, 901, 934, 1290, 1330, 1320]
        ]
      }
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
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
      this.setOptions(this.chartData)
    },
    setOptions({ jobTitles, jobData } = {}) {
      this.chart.setOption({
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
          data: jobTitles
        },
        series: jobData.map((data, index) => ({
          name: jobTitles[index],
          smooth: true,
          type: 'line',
          data: data,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        }))
      })
    }
  }
}
</script>
