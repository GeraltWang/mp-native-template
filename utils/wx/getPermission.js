/*
 * @Author: 王昶 wgeralt@outlook.com
 * @Date: 2023-02-12 22:08:44
 * @LastEditors: 王昶 wgeralt@outlook.com
 * @LastEditTime: 2023-04-13 14:08:40
 * @FilePath: /mp-native-template/utils/wx/getPermission.js
 * @Description:
 */
/** getPermission
 * @param {object} data 传入的数据包含 code name
 * @param {string} data.code 权限code
 * @param {string} data.name 权限名称(可自定义)
 */

const getPermission = ({ code, name }) => {
  return wx.p.getSetting().then(res => {
    if (res.authSetting[code] === false) {
      return wx.p.showModal({
        title: `获取${name}失败`,
        content: `获取${name}失败，请在【右上角】-小程序【设置】项中，将【${name}】开启。`,
        confirmText: '去设置',
        // confirmColor: '#FA550F',
        cancelColor: '取消'
      }).then(res => {
        // 用户点击了去设置
        if (res.confirm) {
          return wx.p.openSetting().then(settingRes => {
            if (settingRes.authSetting[code] === true) {
              return Promise.resolve()
            } else {
              return Promise.reject(new Error('用户未打开权限'))
            }
          }).catch((error) => {
            return Promise.reject(error)
          })
        // 用户点击了取消
        } else {
          return Promise.reject(new Error(`获取${name}被用户取消`))
        }
      }).catch((error) => {
        return Promise.reject(error)
      })
    } else if (res.authSetting[code] === undefined) {
      return wx.p.authorize({
        scope: code
      }).catch(() => {
        return wx.p.showModal({
          title: `获取${name}失败`,
          content: `获取${name}失败，请在【右上角】-小程序【设置】项中，将【${name}】开启。`,
          confirmText: '去设置',
          // confirmColor: '#FA550F',
          cancelColor: '取消'
        }).then(res => {
          // 用户点击了去设置
          if (res.confirm) {
            return wx.p.openSetting().then(settingRes => {
              if (settingRes.authSetting[code] === true) {
                return Promise.resolve()
              } else {
                console.warn('用户未打开权限', name, code)
                return Promise.reject(new Error('用户未打开权限'))
              }
            }).catch((error) => {
              return Promise.reject(error)
            })
          // 用户点击了取消
          } else {
            return Promise.reject(new Error(`获取${name}被用户取消`))
          }
        }).catch((error) => {
          return Promise.reject(error)
        })
      })
    } else {
      return Promise.resolve()
    }
  }).catch(error => {
    return Promise.reject(error)
  })
}

export default getPermission
