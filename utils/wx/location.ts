/*
 * @Author: 王昶 wgeralt@outlook.com
 * @Date: 2023-02-12 22:08:44
 * @LastEditors: 王昶 wgeralt@outlook.com
 * @LastEditTime: 2023-02-20 13:56:20
 * @FilePath: /mp-native-template/utils/wx/location.js
 * @Description:
 */

/** getLocation
 * @param {object} options 获取位置需要传入的数据参考wx.getLocation()
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
