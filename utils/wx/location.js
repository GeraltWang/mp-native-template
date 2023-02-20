/** getLocation
 * @param {object} options 获取位置需要传入的数据
 */
export const getLocation = (
  options = {
    highAccuracyExpireTime: 4000,
    isHighAccuracy: true,
    type: 'gcj02'
  }
) => {
  return new Promise((resolve, reject) => {
    wx.getLocation({
      ...options,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}
