/*
 * @Author: 王昶 wgeralt@outlook.com
 * @Date: 2023-02-13 13:36:20
 * @LastEditors: 王昶 wgeralt@outlook.com
 * @LastEditTime: 2023-02-20 15:22:30
 * @FilePath: /mp-native-template/store/user.js
 * @Description:
 */
import { observable, action } from 'mobx-miniprogram'
import storage from '../utils/wx/storage'

const userEnum = {
  userInfo: 'USER_INFO',
  openid: 'USER_OPENID'
}

export const user = observable({
  isLogin: false,
  userInfo: null,
  openid: null,
  updateUserInfo: action(function (data = {}) {
    this.userInfo = data
    storage.local.set(userEnum['userInfo'], data)
  }),
  updateOpenid: action(function (openid) {
    this.openid = openid
    const app = getApp()
    app.globalData.openid = openid
    storage.local.set(userEnum['openid'], openid)
  })
})
