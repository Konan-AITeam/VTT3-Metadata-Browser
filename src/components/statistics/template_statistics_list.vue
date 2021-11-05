<template>
  <tr>
    <td>동영상 시간</td>
    <td>{{statistics.time}}</td>
  </tr>
  <tr v-if="statistics.num_videos">
    <td>동영상 개수</td>
    <td>{{statistics.num_videos}}</td>
  </tr>
  <tr>
    <td>전체 프레임 개수</td>
    <td>{{statistics.num_images}}</td>
  </tr>
  <tr v-if="statistics.avg_images_per_video">
    <td>동영상 당 평균 이미지</td>
    <td>{{statistics.avg_images_per_video}}</td>
  </tr>
  <tr>
    <td>전체 인스턴스 수</td>
    <td>{{statistics.num_instances}}</td>
  </tr>
  <tr>
    <td>이미지 당 평균 인스턴스 수</td>
    <td>{{statistics.avg_instances_per_image}}</td>
  </tr>
</template>

<script>
export default {
  name: 'template_wholeStatistics_list',
  props: ['statistics']
}
</script>

<style scoped>

</style>
