<template>
<ul v-if="pageSetting.list.length">
  <li @click="sendPage(1)"><i class="fa fa-angle-double-left" aria-hidden="true"></i></li>
  <li @click="pageSetting.prev !== null ? sendPage(pageSetting.prev) : ''">
    <i class="fa fa-angle-left" aria-hidden="true"></i>
  </li>
  <li :class="{ active: page === pageSetting.currentPage }"
      v-for="page in pageSetting.list" :key="page"
      @click="sendPage(page)">
    {{ page }}
  </li>
  <li @click="pageSetting.next !== null ? sendPage(pageSetting.next) : ''">
    <i class="fa fa-angle-right" aria-hidden="true"></i>
  </li>
  <li @click="sendPage(pageSetting.totalPage)"><i class="fa fa-angle-double-right" aria-hidden="true"></i></li>
</ul>
</template>

<script>
export default {
  name: 'pagination',
  props: ['pageSetting'],
  methods: {
    sendPage (page) {
      this.$emit('paging', page)
    }
  }
}
</script>

<style scoped>

</style>
