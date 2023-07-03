/*
 * @Author: 王昶 wgeralt@outlook.com
 * @Date: 2023-02-12 22:08:44
 * @LastEditors: 王昶 wgeralt@outlook.com
 * @LastEditTime: 2023-05-04 17:08:19
 * @FilePath: /mp-native-template/app.js
 * @Description:
 */
import updateManager from './utils/wx/updateManager'
import { getPermission } from './utils/wx/getPermission'
import getSystemInfo from './utils/wx/getSystemInfo'
import { getLocation } from './utils/wx/location'
import sysConfig from './config/index'
import { global } from './store/index'
// @ts-ignore
import { promisifyAll } from 'miniprogram-api-promise'

// @ts-ignore
const wxp = wx.p = {}
// @ts-ignore
promisifyAll(wx, wx.p)

App({
  globalData: {
    mpName: sysConfig.mpName
  },
  onThemeChange () {
    // onThemeChange系统切换主题时触发
  },
  onLaunch () {
    this.launchApp()
  },
  onShow () {
    // 检查更新
    updateManager()
  },
  onHide () {
    // onHide小程序从前台进入后台时触发
  },
  onUnhandledRejection (err
  ) {
    // onUnhandledRejection小程序有未处理的 Promise 拒绝时触发
    console.log('监测到未处理的Promise Rejection', err)
  },
  async launchApp () {
    try {
      // 获取用户设备信息
      // @ts-ignore
      getSystemInfo().then(result => {
        global.updateSysInfo(result)
      })
      // 检查用户是否打开了定位
      await getPermission({ code: 'scope.userLocation', name: '位置信息' })
      // 获取用户位置
      const userLocation = await getLocation()
      global.updateLocation(userLocation)
    } catch (error) {
      console.log(error)
    }
  }
})
