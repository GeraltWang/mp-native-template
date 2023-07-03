/*
 * @Author: 王昶 wgeralt@outlook.com
 * @Date: 2023-02-21 11:28:11
 * @LastEditors: 王昶 wgeralt@outlook.com
 * @LastEditTime: 2023-02-21 13:05:04
 * @FilePath: /mp-native-template/pages/user-center/components/statistic/index.js
 * @Description:
 */
// pages/user-center/components/statistic/index.js
import { priceFormat } from '../../../../utils/tools'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    label: {
      type: String
    },
    value: {
      type: [String, Number],
      value: 0
    },
    toFixed: {
      type: [String, Number],
      value: 2
    }
  },
  observers: {
    value (newVal) {
      console.log(newVal, '改变了')
      if (this.properties.toFixed !== 0) {
        const formatedValue = priceFormat(
          newVal,
          Number(this.properties.toFixed)
        )
        this.setData({
          formatedValue
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {}
})
