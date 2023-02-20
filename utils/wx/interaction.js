/*
 * @Author: 王昶 wgeralt@outlook.com
 * @Date: 2023-02-12 22:08:44
 * @LastEditors: 王昶 wgeralt@outlook.com
 * @LastEditTime: 2023-02-20 13:55:30
 * @FilePath: /mp-native-template/utils/wx/interaction.js
 * @Description:
 */
/** getWxOpenId
 * @param {object} data toast配置项
 * @param {function} success 成功后执行的函数
 * @param {function} fail 失败后执行的函数
 * @param {function} complete 完成后执行的函数
 */
export const showToast = (
  { title = '示例内容', icon = 'none', mask = false, duration = 2000 } = {},
  success = () => {},
  fail = () => {},
  complete = () => {}
) => {
  wx.p
    .showToast({
      title,
      icon,
      duration,
      mask
    })
    .then(() => {
      success()
    })
    .catch(() => {
      fail()
    })
    .finally(() => {
      complete()
    })
}

/**
 * @description: showLoading
 * @param {object} data
 * @param {string} data.title loading文字
 * @param {boolean} data.mask 是否展示遮罩
 * @return {void}
 */
export const showLoading = ({ title = '加载中', mask = true } = {}) => {
  wx.showLoading({
    title,
    mask
  })
}

export const hideLoading = () => {
  wx.hideLoading()
}
