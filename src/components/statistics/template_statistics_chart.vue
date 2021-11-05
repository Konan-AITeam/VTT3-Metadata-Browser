<template>
  <div class = "bar-chart" :style="[calWidth > 600 ? {width : calWidth + 'px'} : {}]">
    <BarChart v-bind="barChartProps"/>
  </div>
</template>

<script>
import { computed, ref, defineComponent } from 'vue'
import { BarChart, useBarChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

export default defineComponent({
  name: 'template_statistics_chart',
  props: {
    instances: {
      type: Object,
      require: true
    }
  },
  components: {
    BarChart
  },
  setup (props) {
    const data = ref(props.instances.map(item => item.num_instance))
    const chartData = computed(() => ({
      labels: props.instances.map(item => item.instance),
      datasets: [{
        data: data.value,
        backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED']
      }]
    }))

    const options = computed(() => ({
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 2,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Month'
          }
        }],
        y: {
          beginAtZero: true
        }
      }
    }))
    const { barChartProps, barChartRef } = useBarChart({
      chartData,
      options
    })

    const calWidth = ref((props.instances.length + 1) * 30)

    return {
      barChartProps,
      barChartRef,
      calWidth
    }
  }
})
</script>
