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

export const showLoading = ({ title = '加载中', mask = true } = {}) => {
  wx.showLoading({
    title,
    mask
  })
}

export const hideLoading = () => {
  wx.hideLoading()
}
