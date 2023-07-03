/*
 * @Author: 王昶 wgeralt@outlook.com
 * @Date: 2023-02-20 09:41:24
 * @LastEditors: 王昶 wgeralt@outlook.com
 * @LastEditTime: 2023-03-08 16:28:43
 * @FilePath: /mp-native-template/behaviors/store/global.js
 * @Description:
 */
import { BehaviorWithStore } from 'mobx-miniprogram-bindings'
import { globalStoreConfig } from '../config'

export const globalBehavior = BehaviorWithStore({
  storeBindings: [
    globalStoreConfig
  ]
})
