<template>
  <section class = "video-list-container">
    <div class = "wrap">
      <h4 class = "tti mb15">비디오 목록</h4>
      <div class = "search-form flex-center">
        <div class = "search-box">
          <input type = "text" v-model="keyword" @keyup.enter="videoSearch">
          <div class="search-btn ml10">
            <button type="button" @click="videoSearch"><i class="fas fa-search"></i></button>
          </div>
        </div>
        <div>
          <button type="button" class ="btn blue h30" @click="goWholeStatistics()">통계</button>
        </div>
      </div>
      <div class = "video-box">
        <table>
          <colgroup>
            <col width="10%">
            <col width="20%">
            <col width="*">
          </colgroup>
          <thead>
          <tr>
            <th>순번</th>
            <th>ID</th>
            <th>파일 이름</th>
          </tr>
          </thead>
          <tbody>
            <scaleLoader :loading="loading" :color = "'#2d4b58'" :size="'100px'"/>
            <videoList v-bind:view_videos="view_videos" :total="total" :limit="limit" :page="this.page"/>
          </tbody>
        </table>
      </div>
      <div class="paging mt10">
        <pagination class ="pagination"
        :pageSetting="pageDataSetting(total, limit, offset, this.page)"
        @paging="videoPage"/>
      </div>
    </div>
  </section>
</template>
<script>
import videoList from '@/components/video/template_video_list'
import pagination from '@/components/mixin/pagination'
import scaleLoader from 'vue-spinner/src/ScaleLoader'

const electron = window.require('electron')
const ipcRenderer = electron.ipcRenderer

export default {
  name: 'Video',
  data: () => ({
    videos: [],
    search_videos: [],
    view_videos: [],
    keyword: '',
    total: 5,
    page: 1,
    limit: 10,
    offset: 5,
    totalPage: Number
  }),
  components: {
    videoList,
    pagination,
    scaleLoader
  },
  created () {
    ipcRenderer.send('GetVideoList')
    ipcRenderer.once('GetVideoList_result', this.init)
  },
  methods: {
    init: function (event, results) {
      if (typeof results === 'string') {
        alert(results)
      } else {
        this.videos = results
        this.search_videos = this.videos
        this.total = results.length
        if (Object.keys(this.videos).length !== 0) {
          this.videoPage(1)
        }
        this.$store.commit('unloadingSpinner')
      }
    },
    videoSearch () {
      this.search_videos = []
      if (this.keyword === '') {
        this.search_videos = this.videos
      } else {
        for (const idx in this.videos) {
          const filename = this.videos[idx].fileName
          if (filename.indexOf(this.keyword) > -1) {
            this.search_videos.push(this.videos[idx])
          }
        }
      }
      this.total = this.search_videos.length
      this.videoPage(1)
    },
    videoPage (page) {
      this.view_videos = []
      this.view_videos = this.search_videos.slice(
        (page - 1) * this.limit,
        page * this.limit
      )
      this.page = page
      this.pageDataSetting(this.total, this.limit, this.offset, page)
    },
    pageDataSetting (total, limit, offset, page) {
      const totalPage = Math.ceil(total / limit)
      var currentPage = page
      var startIndex = (Math.ceil(currentPage / offset) - 1) * offset + 1
      var endIndex = startIndex + offset > totalPage ? totalPage : startIndex + offset - 1
      var list = []
      for (let idx = startIndex; idx <= endIndex; idx++) {
        list.push(idx)
      }
      let prev =
          currentPage > 1 ? startIndex - 1 : null
      if (prev <= 0 && prev !== null) {
        prev = parseInt(currentPage, 10) - parseInt(1, 10)
      }
      let next =
          totalPage !== currentPage ? endIndex + 1 : null
      if (next >= totalPage && next !== null) {
        next = parseInt(currentPage, 10) + parseInt(1, 10)
      }
      return { prev, next, list, currentPage, totalPage }
    },
    goWholeStatistics () {
      this.$router.push('/whole-statistics')
    }
  },
  computed: {
    loading () {
      return this.$store.getters.isLoading
    }
  }
}

</script>
