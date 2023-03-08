/*
 * @Author: 王昶 wgeralt@outlook.com
 * @Date: 2023-02-20 09:41:44
 * @LastEditors: 王昶 wgeralt@outlook.com
 * @LastEditTime: 2023-03-08 16:42:16
 * @FilePath: /mp-native-template/store/global.js
 * @Description:
 */
import { observable, action } from 'mobx-miniprogram'
import storage from '../utils/wx/storage'

const globalEnum = {
  location: 'SYS_LOCATION',
  sysInfo: 'SYS_INFO'
}

export const global = observable({
  location: storage.local.get(globalEnum['location']) || {},
  sysInfo: storage.local.get(globalEnum['sysInfo']) || {},
  get latitude () {
    return this.location.latitude || null
  },
  get longitude () {
    return this.location.longitude || null
  },
  get navHeight () {
    return this.sysInfo.navHeight || 91
  },
  updateLocation: action(function (data = {}) {
    this.location = data
    storage.local.set(globalEnum['location'], data)
  }),
  updateSysInfo: action(function (data = {}) {
    this.sysInfo = data
    storage.local.set(globalEnum['sysInfo'], data)
  })
})
