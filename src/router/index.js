import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Shot from '../views/Shot'
import WholeStatistics from '../views/WholeStatistics'
import VideoStatistics from '../views/VideoStatistics'
import store from '@/store/index.js'

const routes = [
  {
    path: '/',
    redirect: '/video'
  },
  {
    path: '/video',
    name: 'Video',
    component: () => import('../views/Video')
  },
  {
    path: '/shot',
    name: 'Shot',
    component: Shot,
    props: true
  },
  {
    path: '/whole-statistics',
    name: 'WholeStatistics',
    component: WholeStatistics
  },
  {
    path: '/video-statistics',
    name: 'VideoStatistics',
    component: VideoStatistics,
    props: true
  }
]

const router = createRouter({
  history: process.env.IS_ELECTRON ? createWebHashHistory() : createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  store.commit('loadingSpinner')
  setTimeout(() => {
    next()
  }, 1)
})

export default router
