export const getLocation = (options = {
  highAccuracyExpireTime: 4000,
  isHighAccuracy: true,
  type: 'gcj02'
}) => {
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
