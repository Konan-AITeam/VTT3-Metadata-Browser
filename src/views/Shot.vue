<template>
  <section class = "shot-list-container">
    <div class = "wrap">
      <h4 class = "tti">
        <router-link to="/video" class = "backward mr5"><i class="fas fa-arrow-circle-left"></i></router-link>
        샷 목록
        <button type="button" class ="btn blue h30 f-right" @click="goVideoStatistics">통계</button>
      </h4>
      <div class = "shot-box">
        <scaleLoader :loading="loading" :color = "'#2d4b58'" :size="'100px'"/>
        <shotList></shotList>
      </div>
    </div>
  </section>
</template>

<script>
import shotList from '../components/shot/template_shot_list'
import scaleLoader from 'vue-spinner/src/ScaleLoader'

const electron = window.require('electron')
const ipcRenderer = electron.ipcRenderer

export default {
  name: 'Shot',
  data: () => ({
    loaded: true
  }),
  components: {
    shotList,
    scaleLoader
  },
  created () {
    ipcRenderer.send('GetShotList', this.$route.params.videoId)
  },
  methods: {
    goVideoStatistics () {
      this.$router.push({ name: 'VideoStatistics', params: { videoId: this.$route.params.videoId } })
    }
  },
  computed: {
    loading () {
      return this.$store.getters.isLoading
    }
  }
}

</script>
