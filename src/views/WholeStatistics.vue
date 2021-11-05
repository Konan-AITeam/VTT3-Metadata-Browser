<template>
  <section class = "statistics-container">
    <div class = "wrap">
      <h4 class = "tti mb15">
        <router-link to="/video" class = "backward mr5"><i class="fas fa-arrow-circle-left"></i></router-link>
        전체 동영상 통계
      </h4>
      <div class = "statistics-box">
        <div class = "statistics-list">
          <table>
            <colgroup>
              <col width = "*">
              <col width = "35%">
            </colgroup>
            <tbody>
              <statisticsList v-if="Object.keys(wholeStatistics).length !== 0" v-bind:statistics="wholeStatistics"></statisticsList>
            </tbody>
          </table>
        </div>
        <div class = "statistics-chart">
          <statisticsChart v-if="instances.length > 1" :instances="instances">
          </statisticsChart>
        </div>
        <scaleLoader :loading="loading" :color = "'#2d4b58'" :size="'100px'"/>
      </div>
    </div>
  </section>
</template>
<script>
import ScaleLoader from 'vue-spinner/src/ScaleLoader'
import statisticsList from '@/components/statistics/template_statistics_list'
import statisticsChart from '@/components/statistics/template_statistics_chart'

import { ref, onMounted, defineComponent } from 'vue'
import { useStore } from 'vuex'

const electron = window.require('electron')
const ipcRenderer = electron.ipcRenderer

export default defineComponent({
  name: 'WholeStatistics',
  components: {
    statisticsList,
    statisticsChart,
    ScaleLoader
  },
  computed: {
    loading () {
      return this.$store.getters.isLoading
    }
  },
  setup () {
    const store = useStore()
    const wholeStatistics = ref([])
    const instances = ref([{}])

    onMounted(() => {
      ipcRenderer.send('GetWholeStatistics')
      ipcRenderer.once('GetWholeStatistics_result', (event, results) => {
        if (typeof results === 'string') {
          alert(results)
        } else {
          wholeStatistics.value = results
          instances.value = results.instances.sort(function (a, b) {
            var instanceA = a.instance.toLowerCase()
            var instanceB = b.instance.toLowerCase()
            if (instanceA < instanceB) {
              return -1
            }
            if (instanceA > instanceB) {
              return 1
            }
            return 0
          })
          store.commit('unloadingSpinner')
        }
      })
    })

    return {
      wholeStatistics,
      instances
    }
  }
})

</script>
