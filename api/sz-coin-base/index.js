/*
 * @Author: 王昶 wgeralt@outlook.com
 * @Date: 2023-02-12 22:08:44
 * @LastEditors: 王昶 wgeralt@outlook.com
 * @LastEditTime: 2023-04-13 16:43:48
 * @FilePath: /mp-native-template/api/sz-coin-base/index.js
 * @Description:
 */
import sysConfig from '../../config/index'
import { showLoading, hideLoading } from '../../utils/wx/interaction'
import { user } from '../../store/index'

/**
   * @description: request
   * @param {object} data 传入的配置项
   * @param {string} data.url 接口地址
   * @param {string} data.method 请求方式
   * @param {object} data.data 请求参数
   * @param {object} data.options 请求配置
   */
export const request = ({ url, method, data = {}, options = {} }) => {
  return new Promise((resolve, reject) => {
    const { needLoading = false, loadingText = sysConfig.loadingText, header = {} } = options
    needLoading && showLoading({
      title: loadingText
    })
    header[sysConfig.szCoinBase.tokenName] = user.token || ''
    wx.request({
      url: `${sysConfig.szCoinBase.apiBaseUrl}${url}`,
      method: method || 'POST',
      data,
      header: Object.assign({}, sysConfig.szCoinBase.header, header),
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

/**
 * @description: 微信文件上传方法
 * @param {string} url 后台上传接口地址
 * @param {string} filePath 获取到的临时文件链接
 * @param {string} name 后台识别上传文件的参数
 * @param {object} options 请求配置项
 * @return {*}
 */
export const uploadFile = ({ url, filePath, name, options = {} }) => {
  return new Promise((resolve, reject) => {
    const { needLoading = false, header = {} } = options
    needLoading && showLoading({
      title: '上传中...'
    })
    header[sysConfig.szCoinBase.tokenName] = `${sysConfig.szCoinBase.tokenPrefix}${user.token}` || ''
    wx.p
      .uploadFile({
        url: `${sysConfig.szCoinBase.apiBaseUrl}${url}`,
        filePath,
        name,
        header: Object.assign({}, sysConfig.szCoinBase.header, header)
      })
      .then((response) => {
        if (response.statusCode !== 200) {
          reject(response)
        }
        const { data = {} } = response || {}
        const dataFromJson = JSON.parse(data)
        resolve(dataFromJson)
      })
      .catch((err) => {
        reject(err)
      })
      .finally(() => {
        needLoading && hideLoading()
      })
  })
}
