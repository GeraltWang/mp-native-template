/** sdkVersionHandler
   * @param {string} currentVersion 当前sdk版本
   * @param {string} targetVersion 目标sdk版本
   */
const sdkVersionHandler = (currentVersion, targetVersion) => {
  const sdkVersionArr = currentVersion.split('.')
  if (sdkVersionArr[1].length === 1) {
    sdkVersionArr[1] = sdkVersionArr[1].padStart(2, '0')
  }
  const sdkVersion = parseInt(sdkVersionArr.join(''))
  if (sdkVersion > targetVersion) {
    return true
  } else {
    return false
  }
}

export default sdkVersionHandler
