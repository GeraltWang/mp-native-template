import updateManager from './utils/wx/updateManager'
import getPermission from './utils/wx/getPermission'
import getSystemInfo from './utils/wx/getSystemInfo'
import { getLocation } from './utils/wx/location'
import storage from './utils/wx/storage'
import sysConfig from './config/index'
import { global } from './store/global'
import { promisifyAll } from 'miniprogram-api-promise'

const wxp = wx.p = {}
promisifyAll(wx, wx.p)

App({
  globalData: {
    isLogin: false,
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
      getSystemInfo()
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
