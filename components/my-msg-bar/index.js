/*
 * @Author: 王昶 wgeralt@outlook.com
 * @Date: 2023-04-14 13:44:05
 * @LastEditors: 王昶 wgeralt@outlook.com
 * @LastEditTime: 2023-04-14 17:22:14
 * @FilePath: /mp-native-template/components/my-msg-bar/index.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
// components/my-msg-bar/index.js
Component({
  externalClasses: ['my-class', 'my-class-msg', 'my-class-dot'],
  /**
   * 组件的属性列表
   */
  properties: {
    msgData: {
      type: Array,
      value: []
    },
    circular: {
      type: Boolean,
      value: true
    },
    msgDot: {
      type: Boolean,
      value: false
    },
    msgProps: {
      type: Object,
      value: {
        label: 'label',
        value: 'value'
      }
    }
  },
  observers: {
    msgData (msgData) {
      this.setData({
        filterMsgData: this.filterMsgData(msgData)
      })
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    filterMsgData: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * @description: 根据msgProps过滤msgData
     * @param {*} msgData
     * @return {*}
     */
    filterMsgData (msgData) {
      return msgData.map(item => item[this.data.msgProps.label])
    }
  }
})
