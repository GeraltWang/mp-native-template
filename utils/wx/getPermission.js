/*
 * @Author: 王昶 wgeralt@outlook.com
 * @Date: 2023-02-12 22:08:44
 * @LastEditors: 王昶 wgeralt@outlook.com
 * @LastEditTime: 2023-05-04 17:07:52
 * @FilePath: /mp-native-template/utils/wx/getPermission.js
 * @Description:
 */
/** getPermission
 * @param {object} data 传入的数据包含 code name
 * @param {string} data.code 权限code
 * @param {string} data.name 权限名称(可自定义)
 */

export const getPermission = async ({ code, name }) => {
  try {
    const res = await wx.p.getSetting()
    if (res.authSetting[code] === false) {
      return showModal(code, name)
    } else if (res.authSetting[code] === undefined) {
      await wx.p.authorize({ scope: code })
      return Promise.resolve()
    } else {
      return Promise.resolve()
    }
  } catch (error) {
    return Promise.reject(error)
  }
}

const showModal = async (code, name) => {
  try {
    const res = await wx.p.showModal({
      title: `获取${name}失败`,
      content: `获取${name}失败，请在【右上角】-小程序【设置】项中，将【${name}】开启。`,
      confirmText: '去设置'
    })
    if (res.confirm) {
      const settingRes = await wx.p.openSetting()
      if (settingRes.authSetting[code] === true) {
        return Promise.resolve()
      } else {
        console.warn('用户未打开权限', name, code)
        return Promise.reject(new Error('用户未打开权限'))
      }
    } else {
      return Promise.reject(new Error(`获取${name}被用户取消`))
    }
  } catch (error) {
    return Promise.reject(error)
  }
}
