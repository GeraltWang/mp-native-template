/*
 * @Author: 王昶 wgeralt@outlook.com
 * @Date: 2023-02-12 22:08:44
 * @LastEditors: 王昶 wgeralt@outlook.com
 * @LastEditTime: 2023-02-20 16:37:58
 * @FilePath: /mp-native-template/api/index.js
 * @Description:
 */
import sysConfig from '../config/index'
import storage from '../utils/wx/storage'
import { showLoading, hideLoading } from '../utils/wx/interaction'
const app = getApp()

/** request
   * @param {object} data 传入的配置项
   * @param {string} data.url 接口地址
   * @param {string} data.method 请求方式
   * @param {object} data.data 请求参数
   * @param {object} data.options 请求配置
   */
export const request = ({ url, method, data = {}, options = {} }) => {
  return new Promise((resolve, reject) => {
    options.needLoading && showLoading({
      title: 'Loading...'
    })
    if (!options.header) {
      options.header = {}
    }
    options.header.token = app.globalData.token || ''
    options.header.identity = 3
    wx.request({
      url: `${sysConfig.apiBaseUrl}${url}`,
      method: method || 'POST',
      data,
      header: Object.assign(sysConfig.header, options.header),
      success: response => {
        const { data = {} } = response || {}
        if (Object.keys(data).length === 0) {
          reject(new Error('非法的返回值'))
        }
        if (data.code === 401 || data.code === 403) {
          storage.local.remove('TOKEN')
          storage.local.remove('USER_INFO')
          wx.reLaunch({
            url: '/pages/login/index'
          })
          reject(data)
        } else if (data.code === 500) {
          reject(data)
        } else {
          resolve(data)
        }
      },
      fail: err => {
        reject(err)
      },
      complete: () => {
        options.needLoading && hideLoading()
      }
    })
  })
}

export const http = {
  get: ({ url, data, options }) => request({ url, method: 'GET', data, options }),
  post: ({ url, data, options }) => request({ url, method: 'POST', data, options }),
  delete: ({ url, data, options }) => request({ url, method: 'DELETE', data, options }),
  put: ({ url, data, options }) => request({ url, method: 'PUT', data, options }),
  patch: ({ url, data, options }) => request({ url, method: 'PATCH', data, options })
}
