/*
 * @Author: 王昶 wgeralt@outlook.com
 * @Date: 2023-03-08 16:22:46
 * @LastEditors: 王昶 wgeralt@outlook.com
 * @LastEditTime: 2023-03-08 17:22:40
 * @FilePath: /mp-native-template/behaviors/conifg.js
 * @Description: 对各个store的配置进行统一管理，避免修改多个文件
 */
import { global, user } from '../store/index'

export const userStoreConfig = {
  namespace: 'userStore',
  store: user,
  fields: ['userInfo', 'openid', 'token', 'isLogin'],
  actions: ['updateUserInfo', 'updateOpenid', 'updateToken', 'clearUserStore']
}

export const globalStoreConfig = {
  namespace: 'globalStore',
  store: global,
  fields: ['location', 'latitude', 'longitude', 'sysInfo', 'navHeight'],
  actions: ['updateLocation', 'updateSysInfo']
}
