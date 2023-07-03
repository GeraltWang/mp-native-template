/*
 * @Author: 王昶 wgeralt@outlook.com
 * @Date: 2023-05-13 15:06:59
 * @LastEditors: 王昶 wgeralt@outlook.com
 * @LastEditTime: 2023-05-13 17:30:30
 * @FilePath: /mp-native-template/components/my-water-mark/index.js
 * @Description:
 */
Component({
  behaviors: [],
  properties: {
    text: {
      type: String,
      value: '示例水印'
    },
    suffix: {
      type: String,
      value: '示例后缀'
    },
    color: {
      type: String,
      value: 'rgb(0, 0, 0)'
    },
    opacity: {
      type: Number,
      value: 0.1
    },
    rotate: {
      type: Number,
      value: -45
    }
  },
  data: {

  },
  lifetimes: {
    created () {

    },
    attached () {

    },
    moved () {

    },
    detached () {

    }
  },
  methods: {

  }
})
