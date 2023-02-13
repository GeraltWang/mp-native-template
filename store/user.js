import { observable, action } from 'mobx-miniprogram'
import storage from '../utils/wx/storage'

export const user = observable({
  userInfo: null,
  updateUserInfo: action((data = {}) => {
    this.userInfo = data
    storage.local.set('USER_INFO', this.userInfo)
  })
})
