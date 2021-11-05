<template>
    <div v-for="(rect) in objectData" v-bind:key="rect.object_rect" class="rect"
         :class="{selected:rect.rect_data === JSON.stringify(this.isSelected)}"
         :style="getRect(rect)"></div>
</template>

<script>
export default {
  name: 'template_shot_drawRect',
  props: {
    objectData: Object,
    isSelected: Object
  },
  created () {
  },
  methods: {
    getRect (rect) {
      return { top: rect.rect_top, left: rect.rect_left, width: rect.rect_width, height: rect.rect_height }
    }
  }
}
</script>

<style scoped>

</style>
