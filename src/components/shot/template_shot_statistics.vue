<template>
  <div class = "shot-statistics-box">
    <div class = "image-detail-box">
      <div class = "listTitBox mb10">
        <div class = "inline"><span>이미지</span></div>
      </div>
      <div class = "img-box" v-if="imgPath !== ''">
        <img ref="shotImage" @load="drawRect"/>
        <shot-draw-rect v-bind:objectData="shotObjectData" :isSelected="isSelected"></shot-draw-rect>
      </div>
    </div>
    <div class = "shot-statistics-detail-box">
      <div class = "listTitBox mb10">
        <div class = "inline"><span>시각정보 리스트</span></div>
      </div>
      <div class ="shot-statistics-list">
        <table>
          <colgroup>
            <col width="35%">
            <col width="30%">
            <col width="*">
          </colgroup>
          <thead>
            <tr>
              <th>객채명</th>
              <th>좌표</th>
              <th>객체인식확률</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(object) in shotStatisticsData.objects" v-bind:key="object.object_rect"
              :class="{selected:JSON.stringify(object.object_rect) === JSON.stringify(this.isSelected)}" @click="selectObjectRect(object.object_rect)">
              <td>{{object.object_id}}</td>
              <td>{{object.object_rect.min_x}}, {{object.object_rect.min_y}}, {{object.object_rect.max_x}}, {{object.object_rect.max_y}}</td>
              <td>{{object.score}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import shotDrawRect from '@/components/shot/template_shot_drawRect'
const electron = window.require('electron')
const ipcRenderer = electron.ipcRenderer

export default {
  name: 'template_shot_statistics',
  props: {
    imgPath: String
  },
  data: () => ({
    shotStatisticsData: [],
    shotObjectData: [],
    isSelected: []
  }),
  created () {
    ipcRenderer.on('GetShotStatistics_result', this.init)
  },
  unmounted () {
    ipcRenderer.off('GetShotStatistics_result', this.init)
  },
  components: {
    shotDrawRect
  },
  methods: {
    init (event, results) {
      if (typeof results === 'string') {
        alert(results)
      } else {
        this.shotStatisticsData = results
        this.$refs.shotImage.src = this.getImage(this.imgPath)
      }
    },
    getImage (imgPath) {
      return 'file://' + imgPath
    },
    drawRect () {
      if (Object.keys(this.shotStatisticsData.objects.length !== 0)) {
        this.shotObjectData = []
        var img = this.$refs.shotImage
        var oWidth = img.naturalWidth
        var nWidth = img.width
        var per = nWidth / oWidth
        for (var idx in this.shotStatisticsData.objects) {
          var item = this.shotStatisticsData.objects[idx]
          var objects = {}
          objects.object_id = item.object_id
          objects.rect_data = JSON.stringify(item.object_rect)
          objects.rect_top = (item.object_rect.min_y * per) + 'px'
          objects.rect_left = (item.object_rect.min_x * per) + 'px'
          objects.rect_width = ((item.object_rect.max_x - item.object_rect.min_x) * per) + 'px'
          objects.rect_height = ((item.object_rect.max_y - item.object_rect.min_y) * per) + 'px'

          this.shotObjectData.push(objects)
        }
      }
    },
    selectObjectRect (objectRect) {
      this.isSelected = []
      this.isSelected = objectRect
    }
  }
}
</script>

<style scoped>

</style>
