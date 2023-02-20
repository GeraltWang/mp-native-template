/*
 * @Author: 王昶 wgeralt@outlook.com
 * @Date: 2023-02-13 13:36:20
 * @LastEditors: 王昶 wgeralt@outlook.com
 * @LastEditTime: 2023-02-20 17:59:03
 * @FilePath: /mp-native-template/store/user.js
 * @Description:
 */
import { observable, action } from 'mobx-miniprogram'
import storage from '../utils/wx/storage'

const userEnum = {
  userInfo: 'USER_INFO',
  openid: 'USER_OPENID'
}

/**
 * @description: syncWithGlobalData 将数据写入globalData
 * @param {string} key
 * @param {any} value
 * @return {void}
 */
function syncWithGlobalData (key, value) {
  const app = getApp()
  app.globalData[key] = value
  console.log(app.globalData)
}

export const user = observable({
  isLogin: false,
  userInfo: null,
  openid: null,
  updateUserInfo: action(function (data = {}, sync = false) {
    this.userInfo = data
    sync && syncWithGlobalData('userInfo', data)
    storage.local.set(userEnum['userInfo'], data)
  }),
  updateOpenid: action(function (openid, sync = false) {
    this.openid = openid
    sync && syncWithGlobalData('openid', openid)
    storage.local.set(userEnum['openid'], openid)
  })
})
