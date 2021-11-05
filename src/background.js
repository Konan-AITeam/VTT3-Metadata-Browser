'use strict'

import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'

const FileInfo = require('./main/fileinfo.js').FileInfo

const VIDEO_DATAPATH_WIN = 'Z://dataset_root_path//video//2021//1//1'
const PROXY_DATAPATH_WIN = 'Z://dataset_root_path//proxyshot//2021//1//1'
const WHOLE_STATISTICSPATH_WIN = 'Z://dataset_root_path'

const VIDEO_DATAPATH_MAC = '/Volumes/2021/OGQ_metabrowser/dataset_root_path/video/2021/1/1'
const PROXY_DATAPATH_MAC = '/Volumes/2021/OGQ_metabrowser/dataset_root_path/proxyshot/2021/1/1'
const WHOLE_STATISTICSPATH_MAC = '/Volumes/2021/OGQ_metabrowser/dataset_root_path'

let VIDEO_DATAPATH_CUR = ''
let PROXY_DATAPATH_CUR = ''
let WHOLE_STATISTICSPATH_CUR = ''

let gIsMac = false

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 940,
    height: 660,
    webPreferences: {

      // Required for Spectron testing
      enableRemoteModule: !!process.env.IS_TEST,
      webSecurity: false,
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  win.setMenu(null)
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  } else {
    console.log('test')
  }
  createWindow()

  if (process.platform !== 'darwin') {
    VIDEO_DATAPATH_CUR = VIDEO_DATAPATH_WIN
    PROXY_DATAPATH_CUR = PROXY_DATAPATH_WIN
    WHOLE_STATISTICSPATH_CUR = WHOLE_STATISTICSPATH_WIN
  } else {
    gIsMac = true
    VIDEO_DATAPATH_CUR = VIDEO_DATAPATH_MAC
    PROXY_DATAPATH_CUR = PROXY_DATAPATH_MAC
    WHOLE_STATISTICSPATH_CUR = WHOLE_STATISTICSPATH_MAC
  }
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

ipcMain.on('test', (event) => {
  event.sender.send('test_result')
})

async function GetFileList (_path, _filter = undefined) {
  const fi = new FileInfo()
  if (_filter !== undefined) {
    fi.filter = _filter
  }

  const pathCheck = await fi.mountCheck(_path).catch((e) => {
    console.log('test!' + e)
    return false
  })
  if (pathCheck === false) {
    return _path + ' 에 연결되지 않았습니다.'
  } else {
    const fileList = []
    fileList.push(_path)
    const test = await fi.GetAllFileInfo(fileList)
    console.log(test)
    return test
  }
}

ipcMain.on('GetVideoList', async (event) => {
  const videoList = await GetFileList(VIDEO_DATAPATH_CUR)
  event.sender.send('GetVideoList_result', videoList)
})

ipcMain.on('GetShotList', async (event, videoKey) => {
  const path = PROXY_DATAPATH_CUR + '/' + videoKey
  const shotList = await GetFileList(path, 'jpg')
  event.sender.send('GetShotList_result', shotList)
})

async function GetVideoStatistics (filePath) {
  const fi = new FileInfo()

  const pathCheck = await fi.mountCheck(filePath).catch((e) => {
    console.log('test!' + e)
    return false
  })
  if (pathCheck === false) {
    return filePath + ' 에 연결되지 않았습니다.'
  } else {
    const result = fi.GetVideoStatistics(filePath)
    return result
  }
}

ipcMain.on('GetWholeStatistics', async (event) => {
  const path = WHOLE_STATISTICSPATH_CUR + '/statistics.json'
  const statistics = await GetVideoStatistics(path)
  event.sender.send('GetWholeStatistics_result', statistics)
})

ipcMain.on('GetVideoStatistics', async (event, videoKey) => {
  const path = PROXY_DATAPATH_CUR + '/' + videoKey + '/statistics.json'
  const statistics = await GetVideoStatistics(path)
  event.sender.send('GetVideoStatistics_result', statistics)
})

async function GetShotStatistics (shotPath) {
  const fi = new FileInfo()

  const pathCheck = await fi.mountCheck(shotPath).catch((e) => {
    console.log('test!' + e)
    return false
  })
  if (pathCheck === false) {
    return shotPath + ' 에 연결되지 않았습니다.'
  } else {
    const result = fi.GetShotStatistics(shotPath)
    return result
  }
}
ipcMain.on('GetShotStatistics', async (event, shotPath) => {
  const statistics = await GetShotStatistics(shotPath)
  event.sender.send('GetShotStatistics_result', statistics)
})
