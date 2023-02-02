import sysConfig from '../../config/index'

export default {
  // 本地存储
  local: {
    get (key) {
      try {
        const value = wx.getStorageSync(`${sysConfig.storagePrefix}${key}`)
        if (value) {
          const nowTime = new Date().getTime()
          if (nowTime > value.datetime && value.datetime !== 0) {
            wx.removeStorageSync(`${sysConfig.storagePrefix}${key}`)
            return null
          }
        }
        return value.content
      } catch (error) {
        console.error(error)
        return null
      }
    },
    set (key, data, dateTime = sysConfig.storageExpireTime) {
      try {
        const cacheValue = {
          content: data,
          dateTime: parseInt(dateTime) === 0 ? 0 : new Date().getTime() + parseInt(dateTime) * 24 * 3600 * 1000
        }
        wx.setStorageSync(`${sysConfig.storagePrefix}${key}`, cacheValue)
      } catch (error) {
        console.error(error)
      }
    },
    remove (key) {
      try {
        wx.removeStorageSync(`${sysConfig.storagePrefix}${key}`)
      } catch (error) {
        console.error(error)
      }
    },
    clear () {
      wx.clearStorageSync()
    }
  }
}
