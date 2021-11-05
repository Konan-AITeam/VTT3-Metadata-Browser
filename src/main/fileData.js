function FileData () {
  this.path = ''
  this.fileName = ''
  this.key = ''
}

FileData.prototype.getFileFullName = function (_FilePath) {
  return this.getFilePathInfo(_FilePath, 'name')
}
FileData.prototype.getOnlyFileName = function (_FilePath) {
  let result = this.getFileFullName(_FilePath, 'name')
  result = this.getExtensionORFilename(result, 'name')
  return result
}
FileData.prototype.getOnlyFileExtention = function (_FilePath) {
  let result = this.getFileFullName(_FilePath, 'name')
  result = this.getExtensionORFilename(result, 'extention')
  return result
}
FileData.prototype.getOnlyFilePath = function (_FilePath) {
  return this.getFilePathInfo(_FilePath, 'path')
}

// searchType : extention / name
FileData.prototype.getExtensionORFilename = function (_filename, _searchType) {
  const fileLen = _filename.length
  const lastDot = _filename.lastIndexOf('.')
  let result
  _searchType = _searchType.toLowerCase()
  if (_searchType === 'extention') {
    result = _filename.substring(lastDot, fileLen).toLowerCase()
  } else if (_searchType === 'name') {
    result = _filename.substring(0, lastDot)
  }
  return result
}

// searchType : path / name
FileData.prototype.getFilePathInfo = function (_FilePath, _searchType) {
  let filename
  _searchType = _searchType.toLowerCase()
  if (_FilePath) {
    var pointIndex = (_FilePath.indexOf('\\') >= 0 ? _FilePath.lastIndexOf('\\') : _FilePath.lastIndexOf('/'))
    if (_searchType === 'path') {
      filename = _FilePath.substring(0, pointIndex)
      return filename
    } else if (_searchType === 'name') {
      filename = _FilePath.substring(pointIndex)
      if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
        filename = filename.substring(1)
      }
    }
  }
  return filename
}

exports.FileData = FileData
