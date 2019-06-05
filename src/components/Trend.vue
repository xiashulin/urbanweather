<template>
  <ve-line :data="chartData" :extend="extend"></ve-line>
</template>
<script>
export default {
  name: 'Trend',
  props: {
    chartData: {
      type: Object,
      required: true
    }
  },
  data () {
    this.extend = {
      series: {
        // barWidth: 10,
        label: {
          normal: {
            show: true
          }
        },
        xAxis: {
          interval: 0,
          axisLabel: {
            formatter: value => {
              return value.split('').join('\n')
            }
          }
        }
      }
    }
    return {
    }
  }
}
</script>
