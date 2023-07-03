/*
 * @Author: 王昶 wgeralt@outlook.com
 * @Date: 2023-02-13 13:36:20
 * @LastEditors: 王昶 wgeralt@outlook.com
 * @LastEditTime: 2023-03-08 17:18:59
 * @FilePath: /mp-native-template/store/user.js
 * @Description:
 */
import { observable, action } from 'mobx-miniprogram'
import storage from '../utils/wx/storage'
import { phoneEncryption } from '../utils/tools'

const userEnum = {
  userInfo: 'USER_INFO',
  openid: 'USER_OPENID',
  token: 'USER_TOKEN'
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
}

export const user = observable({
  userInfo: storage.local.get(userEnum['userInfo']) || {},
  openid: storage.local.get(userEnum['openid']),
  token: storage.local.get(userEnum['token']) || '',
  get isLogin () {
    return !!this.token
  },
  get userMobile () {
    return this.userInfo.memberPhone || ''
  },
  get userMobileSecret () {
    return phoneEncryption(this.userInfo.memberPhone)
  },
  updateUserInfo: action(function (data = {}, sync = false) {
    this.userInfo = data
    sync && syncWithGlobalData('userInfo', data)
    storage.local.set(userEnum['userInfo'], data)
  }),
  updateOpenid: action(function (openid, sync = false) {
    this.openid = openid
    sync && syncWithGlobalData('openid', openid)
    storage.local.set(userEnum['openid'], openid)
  }),
  updateToken: action(function (token, sync = false) {
    this.token = token
    sync && syncWithGlobalData('token', token)
    storage.local.set(userEnum['token'], token)
  }),
  /**
   * @description: 用户退出登陆方法 退出登陆/token过期时可以调用
   * @param {*} function
   * @return {*}
   */
  clearUserStore: action(function () {
    try {
      for (const key in userEnum) {
        storage.local.remove(userEnum[key])
      }
      this.token = ''
      this.userInfo = {}
    } catch (error) {
      console.log(error)
    }
  })
})
