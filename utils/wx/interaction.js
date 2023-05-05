/*
 * @Author: 王昶 wgeralt@outlook.com
 * @Date: 2023-02-12 22:08:44
 * @LastEditors: 王昶 wgeralt@outlook.com
 * @LastEditTime: 2023-05-05 11:38:53
 * @FilePath: /mp-native-template/utils/wx/interaction.js
 * @Description:
 */

/**
 * showToast
 * @description 显示一个 toast 提示框
 * @param {object} options - 配置项
 * @param {string} options.title - 提示的内容
 * @param {string} options.icon - 图标，有效值 "success", "loading", "none"
 * @param {boolean} options.mask - 是否展示透明蒙层，防止触摸穿透
 * @param {number} options.duration - 提示的延迟时间，单位毫秒，默认：2000
 * @param {function} options.success - 接口调用成功的回调函数
 * @param {function} options.fail - 接口调用失败的回调函数
 * @param {function} options.complete - 接口调用结束的回调函数（调用成功、失败都会执行）
 */
export const showToast = async (
  {
    title = '示例内容',
    icon = 'none',
    mask = false,
    duration = 2000,
    success = () => {},
    fail = () => {},
    complete = () => {}
  } = {}
) => {
  try {
    await wx.p.showToast({
      title,
      icon,
      duration,
      mask
    })
    success()
  } catch (error) {
    fail(error)
  } finally {
    complete()
  }
}

/**
 * @description: 封装wx.showModal函数，使其支持Promise，使用async/await语法调用
 * @param {object} data - showModal配置项
 * @param {string} data.title - 弹窗标题，默认为"提示"
 * @param {string} data.content - 弹窗内容，默认为"这是一个模态弹窗"
 * @param {boolean} data.showCancel - 是否显示取消按钮，默认为true
 * @param {string} data.cancelText - 取消按钮文本，默认为"取消"
 * @param {string} data.cancelColor - 取消按钮的文字颜色，默认为"#000000"
 * @param {string} data.confirmText - 确定按钮文本，默认为"确定"
 * @param {string} data.confirmColor - 确定按钮的文字颜色，默认为"#3CC51F"
 * @param {function} data.success - 用户点击确定按钮时的回调函数，默认为空函数
 * @param {function} data.fail - 调用失败时的回调函数，默认为空函数
 * @param {function} data.complete - 调用完成时的回调函数，默认为空函数
 * @return {*}
 */
export const showModal = async (
  {
    title = '提示',
    content = '这是一个模态弹窗',
    showCancel = true,
    cancelText = '取消',
    cancelColor = '#000000',
    confirmText = '确定',
    confirmColor = '#3CC51F',
    success = () => {},
    fail = () => {},
    complete = () => {}
  } = {}
) => {
  try {
    const res = await wx.p.showModal({
      title,
      content,
      showCancel,
      cancelText,
      cancelColor,
      confirmText,
      confirmColor
    })
    console.log(res)
    if (res.confirm) {
      success(res)
    } else {
      fail(res)
    }
  } catch (error) {
    fail(error)
  } finally {
    complete()
  }
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
