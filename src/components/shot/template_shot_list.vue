<template>
  <div class = "image-list-box">
    <div class = "listTitBox ml5 mr5 mt5">
      <div class = "inline titleBox"><span>이미지 리스트</span></div>
    </div>
    <div class = "image-list mb10">
      <ul>
        <li v-for="(img) in view_shots" v-bind:key="img.path"
            :class="{selected:img.key === this.isSeleted}" @click="view_shot_statistics(img.key, img.path)">
          <div class = "thumb-box">
            <img :src="getImage(img.path)">
          </div>
        </li>
      </ul>
    </div>
    <div class ="paging">
      <pagination class ="pagination"
                  :pageSetting="pageDataSetting(total, limit, offset, this.page)"
                  @paging="shotPage"/>
    </div>
  </div>
  <shotStatistics v-bind:imgPath="imgPath"></shotStatistics>
</template>

<script>
import pagination from '@/components/mixin/pagination'
import shotStatistics from '@/components/shot/template_shot_statistics'

const electron = window.require('electron')
const ipcRenderer = electron.ipcRenderer

export default {
  name: 'template_shot_list',
  data: () => ({
    shot_data: [],
    view_shots: [],
    isSeleted: '',
    imgPath: '',
    total: 5,
    page: 1,
    limit: 50,
    offset: 5,
    totalPage: Number
  }),
  created () {
    ipcRenderer.on('GetShotList_result', this.init)
  },
  unmounted () {
    ipcRenderer.off('GetShotList_result', this.init)
  },
  components: {
    pagination,
    shotStatistics
  },
  methods: {
    init: function (event, results) {
      if (typeof results === 'string') {
        alert(results)
      } else {
        this.shot_data = results
        this.total = results.length
        if (Object.keys(this.shot_data).length !== 0) {
          this.shotPage(1)
        }
        this.$store.commit('unloadingSpinner')
      }
    },
    getImage (imgPath) {
      return 'file://' + imgPath
    },
    shotPage (page) {
      this.view_shots = this.shot_data.slice(
        (page - 1) * this.limit,
        page * this.limit
      )
      var firstLi = this.view_shots.map((obj) => Object.values(obj))[0]
      this.view_shot_statistics(firstLi[2], firstLi[0])

      this.page = page
      this.pageDataSetting(this.total, this.limit, this.offset, page)
    },
    view_shot_statistics (shotId, shotPath) {
      this.isSeleted = ''
      this.isSeleted = shotId
      this.imgPath = ''
      this.imgPath = shotPath

      ipcRenderer.send('GetShotStatistics', shotPath)
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
    }
  }
}
</script>

<style scoped>

</style>
