/*
 * @Author: 王昶 wgeralt@outlook.com
 * @Date: 2023-02-12 22:08:44
 * @LastEditors: 王昶 wgeralt@outlook.com
 * @LastEditTime: 2023-04-26 16:14:14
 * @FilePath: /mp-native-template/custom-tab-bar/index.js
 * @Description:
 */
import TabMenu from './data'
Component({
  data: {
    active: 0,
    list: TabMenu
  },
  methods: {
    onChange (event) {
      // this.setData({ active: event.detail.value })
      const index = event.detail.value
      wx.switchTab({
        url: this.data.list[index].url.startsWith('/')
          ? this.data.list[index].url
          : `/${this.data.list[index].url}`
      })
    },
    init () {
      const page = getCurrentPages().pop()
      const route = page ? page.route.split('?')[0] : ''
      const active = this.data.list.findIndex(
        (item) =>
          (item.url.startsWith('/') ? item.url.substr(1) : item.url) ===
          `${route}`
      )
      this.setData({ active })
    }
  }
})
