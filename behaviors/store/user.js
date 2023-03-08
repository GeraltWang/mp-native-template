/*
 * @Author: 王昶 wgeralt@outlook.com
 * @Date: 2023-02-13 13:43:29
 * @LastEditors: 王昶 wgeralt@outlook.com
 * @LastEditTime: 2023-03-08 16:26:17
 * @FilePath: /mp-native-template/behaviors/store/user.js
 * @Description:
 */
import { BehaviorWithStore } from 'mobx-miniprogram-bindings'
import { userStoreConfig } from '../conifg'

export const userBehavior = BehaviorWithStore({
  storeBindings: [
    userStoreConfig
  ]
})
