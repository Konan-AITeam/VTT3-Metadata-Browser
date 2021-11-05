<template>
  <div id = "firstDiv">
    <button @click="testFunk"> GetVideoList</button>
    <button @click="GetVideoList">GetVideoList</button>
    <button @click="GetWholeStatistics">GetWholeStatistics</button>
    <button @click="GetVideoStatistics">GetVideoStatistics</button>
    <button @click="GetShotList">GetShotList</button>
    <button @click="GetShotStatistics">GetShotStatistics</button>
  </div>
</template>
<script>
const electron = window.require('electron')
const ipcRenderer = electron.ipcRenderer
export default {
  methods: {
    testFunk () {
      // 메소드 안에서 사용하는 `this` 는 Vue 인스턴스를 가리킵니다
      console.log('Hello!')
      ipcRenderer.send('test')
    },
    GetVideoList () {
      console.log('GetVideoList')
      ipcRenderer.send('GetVideoList')
    },
    GetWholeStatistics () {
      console.log('GetWholeStatistics')
      ipcRenderer.send('GetWholeStatistics')
    },
    GetVideoStatistics () {
      console.log('GetVideoStatistics')
      const videoKey = 30001
      ipcRenderer.send('GetVideoStatistics', videoKey)
    },
    GetShotList () {
      console.log('GetShotList')
      const videoKey = 30000
      ipcRenderer.send('GetShotList', videoKey)
    },
    GetShotStatistics () {
      console.log('GetShotStatistics')
      // shotPath는 shorList에 있는 path 정보
      const shotPath = 'Z://dataset_root_path//proxyshot//2021//1//1//30001//SCENE_0000000000//SHOT_0000000200//IMAGE_0000000201.jpg'
      ipcRenderer.send('GetShotStatistics', shotPath)
    }
  }
}
ipcRenderer.on('test_result', (event) => {
  // something with the datac
  console.log('test_result!!!!')
})

ipcRenderer.on('GetVideoList_result', function (event, videoList) {
  console.log(videoList)
})

ipcRenderer.on('GetWholeStatistics_result', function (event, wholeStatisticsInfo) {
  console.log(wholeStatisticsInfo)
})

ipcRenderer.on('GetVideoStatistics_result', function (event, VideoStatisticsInfo) {
  console.log(VideoStatisticsInfo)
})

ipcRenderer.on('GetShotList_result', function (event, ShotList) {
  console.log(ShotList)
})

ipcRenderer.on('GetShotStatistics_result', function (event, ShotStatisticsInfo) {
  console.log(ShotStatisticsInfo)
})
</script>
