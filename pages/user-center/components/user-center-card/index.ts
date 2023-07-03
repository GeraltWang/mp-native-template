/*
 * @Author: 王昶 wgeralt@outlook.com
 * @Date: 2023-02-21 10:34:24
 * @LastEditors: 王昶 wgeralt@outlook.com
 * @LastEditTime: 2023-02-21 11:04:02
 * @FilePath: /mp-native-template/pages/user-center/components/user-center-card/index.js
 * @Description:
 */
// pages/user-center/components/user-center-card/index.js
import { userBehavior } from '../../../../behaviors/store/user'

Component({
  behaviors: [userBehavior],
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    defaultAvatarUrl:
      'https://cdn-we-retail.ym.tencent.com/miniapp/usercenter/icon-user-center-avatar@2x.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
