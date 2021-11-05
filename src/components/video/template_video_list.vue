<template>
  <tr v-for="(video, idx) in view_videos" v-bind:key="video.path">
    <td>{{ (page - 1) * limit + (idx+1)}}</td>
    <td>{{ video.key }}</td>
    <td class="videoName">
      <router-link :to="{name: 'Shot', params: {'videoId' : video.key}}">{{ video.fileName }}</router-link>
    </td>
  </tr>
  <tr v-show="isShow">
    <td colspan="3">검색 결과가 없습니다.</td>
  </tr>
</template>

<script>
export default {
  name: 'template_video_list',
  props: {
    view_videos: Object,
    total: Number,
    limit: Number,
    page: Number
  },
  watch: {
    view_videos: function () {
      if (Object.keys(this.view_videos).length === 0) {
        this.isShow = true
      } else {
        this.isShow = false
      }
    }
  },
  data () {
    return {
      isShow: false
    }
  }
}

</script>

<style scoped>

</style>
