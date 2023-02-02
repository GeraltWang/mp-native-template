export const showToast = ({ title = '示例内容', icon = 'none', mask = false, duration = 2000 } = {}) => {
  wx.showToast({
    title,
    icon,
    duration,
    mask
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
