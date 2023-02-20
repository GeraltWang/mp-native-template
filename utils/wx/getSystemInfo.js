/*
 * @Author: 王昶 wgeralt@outlook.com
 * @Date: 2023-02-12 22:08:44
 * @LastEditors: 王昶 wgeralt@outlook.com
 * @LastEditTime: 2023-02-20 15:23:29
 * @FilePath: /mp-native-template/utils/wx/getSystemInfo.js
 * @Description:
 */

const getSystemInfo = () => {
  return wx.p.getSystemInfo().then((sysInfo) => {
    const result = {
      ...sysInfo,
      bottomSafeHeight: 0,
      isIphoneX: false,
      isMi: false,
      isIphone: false,
      isIpad: false,
      isIOS: false,
      isHeightPhone: false
    }
    const { model, system } = result
    const trimModel = model.replace(/\s*/g, '')
    // 判断设备型号
    // iphonex及更新型号
    if (isIphoneX(trimModel)) {
      result.isIphoneX = true
      result.isIOS = true
    }
    // iphonex之前的型号
    if (deviceIdentifier(trimModel, 'iPhoneX')) {
      result.isIphone = true
      result.isIOS = true
    }
    // ipad
    if (deviceIdentifier(trimModel, 'iPad')) {
      result.isIpad = true
    }
    // 小米手机
    if (deviceIdentifier(trimModel, 'MI')) {
      result.isMi = true
    }
    result.navHeight = result.statusBarHeight + 44
    result.pageWidth = result.windowWidth
    result.pageHeight = result.windowHeight - result.navHeight
    if (!result.isIOS) {
      result.bottomSafeHeight = 0
    }
    const capsuleInfo = wx.getMenuButtonBoundingClientRect()
    // 胶囊热区 = 胶囊和状态栏之间的留白 * 2 (保持胶囊和状态栏上下留白一致) * 2(设计上为了更好看) + 胶囊高度
    const navbarHeight =
      (capsuleInfo.top - result.statusBarHeight) * 2 + capsuleInfo.height
    // 写入胶囊数据
    result.capsuleInfo = capsuleInfo
    // 安全区域
    const safeArea = result.safeArea
    // 可视区域高度 - 适配横竖屏场景
    const screenHeight = Math.max(result.screenHeight, result.screenWidth)
    const height = Math.max(safeArea.height, safeArea.width)
    // 状态栏高度
    const statusBarHeight = result.statusBarHeight
    // 获取底部安全区域高度（全面屏手机）
    if (safeArea && height && screenHeight) {
      result.bottomSafeHeight = screenHeight - height - statusBarHeight
      if (result.bottomSafeHeight < 0) {
        result.bottomSafeHeight = 0
      }
    }
    // 设置header高度
    result.headerHeight = statusBarHeight + navbarHeight
    // 导航栏高度
    result.navbarHeight = navbarHeight
    return result
    // storage.local.set('SYS_INFO', result)
  }).catch(err => {
    console.log('systemInfo获取失败', err)
  })
}

const isIphoneX = (model) => {
  return (
    model.includes('iPhoneX') ||
    model.includes('iPhone11') ||
    model.includes('iPhone12') ||
    model.includes('iPhone13') ||
    model.includes('iPhone14')
  )
}

const deviceIdentifier = (model, pattern) => {
  return model.includes(pattern)
}

export default getSystemInfo
