/*
 * @Author: 王昶 wgeralt@outlook.com
 * @Date: 2023-02-12 22:08:44
 * @LastEditors: 王昶 wgeralt@outlook.com
 * @LastEditTime: 2023-03-08 16:12:28
 * @FilePath: /mp-native-template/utils/wx/storage.js
 * @Description:
 */
import sysConfig from '../../config/index'

export default {
  // 本地存储
  local: {
    /**
     * @description: 获取本地存储中的一项数据(同步)
     * @param {string} key 数据在本地存储中的键
     * @return {*}
     */
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
    /** set
     * @param {string} key 数据在本地存储中的键
     * @param {any} data 需要存储数据
     * @param {string | number} dateTime 缓存有效期 单位(天)
     */
    set (key, data, dateTime = sysConfig.storageExpireTime) {
      try {
        const cacheValue = {
          content: data,
          dateTime:
            parseInt(dateTime) === 0
              ? 0
              : new Date().getTime() + parseInt(dateTime) * 24 * 3600 * 1000
        }
        wx.setStorageSync(`${sysConfig.storagePrefix}${key}`, cacheValue)
      } catch (error) {
        console.error(error)
      }
    },
    /** asyncSet 异步写入本地存储
     * @description:
     * @param {string} key 数据在本地存储中的键
     * @param {any} data 需要存储数据
     * @param {string | number} dateTime 缓存有效期 单位(天)
     * @return {*}
     */
    async asyncSet (key, data, dateTime = sysConfig.storageExpireTime) {
      try {
        const cacheValue = {
          content: data,
          dateTime:
            parseInt(dateTime) === 0
              ? 0
              : new Date().getTime() + parseInt(dateTime) * 24 * 3600 * 1000
        }
        await wx.setStorage({
          key: `${sysConfig.storagePrefix}${key}`,
          data: cacheValue
        })
      } catch (error) {
        console.error(error)
      }
    },
    /**
     * @description: 删除本地存储中的一项数据(同步)
     * @param {string} key 数据在本地存储中的键
     * @return {*}
     */
    remove (key) {
      try {
        wx.removeStorageSync(`${sysConfig.storagePrefix}${key}`)
      } catch (error) {
        console.error(error)
      }
    },
    /**
     * @description: 删除本地存储中的一项数据(异步)
     * @param {string} key 数据在本地存储中的键
     * @return {*}
     */
    async asyncRemove (key) {
      try {
        await wx.removeStorage({ key: `${sysConfig.storagePrefix}${key}` })
      } catch (error) {
        console.error(error)
      }
    },
    clear () {
      wx.clearStorageSync()
    }
  }
}
