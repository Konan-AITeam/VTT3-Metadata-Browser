const exp = require('constants')
const electron = require('electron')
const fs = require('fs')
const _path = require('path')

const FileData = require('./fileData').FileData

function FileInfo () {
  // Path
  this.m_resultPathArr = [] // 결과 fileData 객체의 Arr
  this.m_isSubDirFileRead = true // 하위 디렉토리 안까지 모든 파일 검색
  this.filter = 'None'
}

FileInfo.prototype.PushFileData = function (_key, _path, _resultArr) {
  const self = this

  const curFileData = new FileData()
  curFileData.key = _key
  curFileData.path = _path
  curFileData.fileName = curFileData.getFileFullName(_path)

  //check hidden file (double check)
  if(curFileData.fileName[0] == '.'){
	  return;
  }

  if (self.filter === 'jpg') {
    if (curFileData.getOnlyFileExtention(curFileData.path) !== '.jpg') {
      return
    }
  }
  _resultArr.push(curFileData)
}

FileInfo.prototype.GetAllFileInfo = async function (_filePaths) {
	for (let i = 0; i < _filePaths.length; i++) {
		const curPath = _filePaths[i] // file Path or dir Path
		const stats = fs.statSync(curPath)

		if (stats.isDirectory() === true) {
		fs.readdirSync(curPath)
		.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item)) //check hidden file
		.forEach(file => { // 파일 리스트 확인
			const curRepath = curPath + '/' + file
			if (fs.lstatSync(_path.resolve(curPath, file)).isDirectory()) { // 파일 리스트중 디렉토리가 있는지 확인
			// 디렉토리
			const rePathArr = []
			rePathArr.push(curRepath)
			if (this.m_isSubDirFileRead === true) {
				this.GetAllFileInfo(rePathArr)
			}
			} else {
			const videoKey = this.GetlastName(curPath)
			// 파일. 위의 stats는 폴더의 정보이기 때문에 재 statSync 검색함
			this.PushFileData(videoKey, curRepath, this.m_resultPathArr)
			}
		})
		} else {
		this.PushFileData(stats.size, curPath, this.m_resultPathArr)
		}
	}
	return this.m_resultPathArr
}

FileInfo.prototype.GetVideoStatistics = function (_path) {
  const result = this.Read_JSON(_path)
  return result
}

FileInfo.prototype.GetShotStatistics = function (_path) {
  // shot image path -> statistics path
  const fd = new FileData()

  const path = fd.getOnlyFilePath(_path)
  const fileName = fd.getOnlyFileName(_path)
  const resultPath = path + '/' + fileName + '.json'
  // get json

  const result = this.Read_JSON(resultPath)
  return result
}

FileInfo.prototype.GetlastName = function (_FilePath) {
  var pointIndex = (_FilePath.indexOf('\\') >= 0 ? _FilePath.lastIndexOf('\\') : _FilePath.lastIndexOf('/'))
  const lastName = _FilePath.substring(pointIndex + 1)
  return lastName
}

FileInfo.prototype.Read_JSON = function (_path) {
  if (fs.existsSync(_path)) {
    const dataBuffer = fs.readFileSync(_path)
    const dataJSON = dataBuffer.toString()

    const data = JSON.parse(dataJSON)
    return data
  }
}

FileInfo.prototype.mountCheck = function(_path){
	return new Promise((resolve, reject) => {
		// 비동기 작업
		fs.stat(_path, (error, stats)=>{
			if(error){
				reject(false);
				return false;
			}
			resolve(true);
			return true;
		})

	});
}

exports.FileInfo = FileInfo
