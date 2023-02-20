/*
 * @Author: 王昶 wgeralt@outlook.com
 * @Date: 2023-02-20 09:41:24
 * @LastEditors: 王昶 wgeralt@outlook.com
 * @LastEditTime: 2023-02-20 15:05:32
 * @FilePath: /mp-native-template/behaviors/store/global.js
 * @Description:
 */
import { BehaviorWithStore } from 'mobx-miniprogram-bindings'

import { global } from '../../store/global'

export const globalBehavior = BehaviorWithStore({
  storeBindings: [
    {
      namespace: 'globalStore',
      store: global,
      fields: ['location', 'sysInfo'],
      actions: ['updateLocation', 'updateSysInfo']
    }
  ]
})
