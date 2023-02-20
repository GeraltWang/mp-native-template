/*
 * @Author: 王昶 wgeralt@outlook.com
 * @Date: 2023-02-20 09:41:44
 * @LastEditors: 王昶 wgeralt@outlook.com
 * @LastEditTime: 2023-02-20 15:15:16
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
  location: null,
  sysInfo: null,
  updateLocation: action(function (data = {}) {
    this.location = data
    storage.local.set(globalEnum['location'], data)
  }),
  updateSysInfo: action(function (data = {}) {
    this.sysInfo = data
    storage.local.set(globalEnum['sysInfo'], data)
  })
})
