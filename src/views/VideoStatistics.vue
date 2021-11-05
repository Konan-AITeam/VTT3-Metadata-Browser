<template>
  <section class = "statistics-container">
    <div class = "wrap">
      <h4 class = "tti mb15">
        <router-link :to="{name: 'Shot', params: {'videoId' : this.$route.params.videoId}}" class = "backward mr5"><i class="fas fa-arrow-circle-left"></i></router-link>
        동영상 통계
      </h4>
      <div class = "statistics-box">
        <div class = "statistics-list">
          <table>
            <colgroup>
              <col width = "*">
              <col width = "30%">
            </colgroup>
            <tbody>
              <statisticsList v-if="Object.keys(videoStatistics).length !== 0" v-bind:statistics="videoStatistics"></statisticsList>
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
  name: 'VideoStatistics',
  props: {
    videoId: String
  },
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
  setup (props) {
    const store = useStore()
    const videoStatistics = ref([])
    const instances = ref([{}])

    onMounted(() => {
      ipcRenderer.send('GetVideoStatistics', props.videoId)
      ipcRenderer.once('GetVideoStatistics_result', (event, results) => {
        if (typeof results === 'string') {
          alert(results)
        } else {
          videoStatistics.value = results
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
      videoStatistics,
      instances
    }
  }
})

</script>
