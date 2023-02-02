import updateManager from './utils/wx/updateManager'
import getPermission from './utils/wx/getPermission'
import getSystemInfo from './utils/wx/getSystemInfo'
import { getLocation } from './utils/wx/location'

App({
  globalData: {
    isLogin: false,
    userLocation: {}
  },
  onLaunch () {
    this.launchApp()
  },
  onShow () {
    // 检查更新
    updateManager()
  },
  async launchApp () {
    try {
      // 获取用户设备信息
      getSystemInfo()
      // 检查用户是否打开了定位
      await getPermission({ code: 'scope.userLocation', name: '位置信息' })
      // 获取用户位置
      const userLocation = await getLocation()
      this.globalData.userLocation = userLocation
    } catch (error) {
      console.log(error)
    }
  }
})
