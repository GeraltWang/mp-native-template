import { observable, action } from 'mobx-miniprogram'
import storage from '../utils/wx/storage'
const app = getApp()

export const user = observable({
  isLogin: false,
  userInfo: null,
  openid: null,
  updateUserInfo: action(function (data = {}) {
    this.userInfo = data
    storage.local.set('USER_INFO', this.userInfo)
  }),
  updateOpenid: action(function (openid) {
    this.openid = openid
    app.globalData.openid = openid
    storage.local.set('USER_OPENID', this.openid)
  })
})
