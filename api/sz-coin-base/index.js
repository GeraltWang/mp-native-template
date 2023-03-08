/*
 * @Author: 王昶 wgeralt@outlook.com
 * @Date: 2023-02-12 22:08:44
 * @LastEditors: 王昶 wgeralt@outlook.com
 * @LastEditTime: 2023-03-08 17:55:13
 * @FilePath: /mp-native-template/api/sz-coin-base/index.js
 * @Description:
 */
import sysConfig from '../../config/index'
import { showLoading, hideLoading } from '../../utils/wx/interaction'
import { user } from '../../store/index'

/**
   * @description: request
   * @param {otbject} data 传入的配置项
   * @param {string} data.url 接口地址
   * @param {string} data.method 请求方式
   * @param {object} data.data 请求参数
   * @param {object} data.options 请求配置
   */
export const request = ({ url, method, data = {}, options = {} }) => {
  return new Promise((resolve, reject) => {
    const { needLoading = false, header = {} } = options
    needLoading && showLoading({
      title: 'Loading...'
    })
    header[sysConfig.tokenName] = user.token || ''
    wx.request({
      url: `${sysConfig.apiBaseUrl}${url}`,
      method: method || 'POST',
      data,
      header: Object.assign(sysConfig.header, header),
      success: response => {
        if (response.statusCode !== 200) {
          reject(response)
        }
        const { data = {} } = response || {}
        if (Object.keys(data).length === 0) {
          reject(new Error('非法的返回值'))
        }
        if (data.code === 10001 || data.code === 10003) {
          user.clearUserStore()
          wx.reLaunch({
            url: '/pages/login/index'
          })
          reject(data)
        } else if (data.code === 10000) {
          reject(data)
        } else {
          resolve(data)
        }
      },
      fail: err => {
        reject(err)
      },
      complete: () => {
        needLoading && hideLoading()
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
