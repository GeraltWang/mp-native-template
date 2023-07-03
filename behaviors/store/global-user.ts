/*
 * @Author: 王昶 wgeralt@outlook.com
 * @Date: 2023-02-20 09:41:24
 * @LastEditors: 王昶 wgeralt@outlook.com
 * @LastEditTime: 2023-03-08 16:29:07
 * @FilePath: /mp-native-template/behaviors/store/global-user.js
 * @Description:
 */
import { BehaviorWithStore } from 'mobx-miniprogram-bindings'
import { globalStoreConfig, userStoreConfig } from '../config'

export const globalUserBehavior = BehaviorWithStore({
  storeBindings: [
    globalStoreConfig, userStoreConfig
  ]
})
