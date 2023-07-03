/*
 * @Author: 王昶 wgeralt@outlook.com
 * @Date: 2023-02-12 22:08:44
 * @LastEditors: 王昶 wgeralt@outlook.com
 * @LastEditTime: 2023-04-24 13:17:39
 * @FilePath: /mp-native-template/api/szCoinBase/index.js
 * @Description:
 */
import sysConfig from '../../config/index'
import logManager from '../../utils/wx/logManager'
import { showLoading, hideLoading } from '../../utils/wx/interaction'
import { promiseCatch } from '../../utils/tools'
import { CODE_ENUM, HTTP_STATUS_ENUM } from './enum/index'
import { user } from '../../store/index'
import { SpecResult, RequestConfig, Result, ResultData, PromiseCatchResult, HttpConfig, UploadFileConfig } from './interface/request'

const alias = 'szCoinBase'

let isRefreshing = false

/**
   * @description: request
   * @param {object} data 传入的配置项
   * @param {string} data.url 接口地址
   * @param {string} data.method 请求方式
   * @param {object} data.data 请求参数
   * @param {object} data.options 请求配置
   */
export const request = ({ url, method, data = {}, options = {} }: RequestConfig): Promise<Result | ResultData> => {
  return new Promise((resolve, reject) => {
    const { needLoading = false, loadingText = sysConfig.baseLoadingText, header = {} } = options
    needLoading && showLoading({
      title: loadingText
    })
    header[sysConfig[alias].tokenName] = `${sysConfig[alias].tokenPrefix}${user.token}` || ''
    wx.request({
      url: `${sysConfig[alias].apiBaseUrl}${url}`,
      method: method || 'POST',
      data,
      header: Object.assign({}, sysConfig[alias].header, header),
      success: (response: SpecResult<ResultData>) => {
        if (response.statusCode !== HTTP_STATUS_ENUM.SUCCESS) {
          reject(response)
        }
        const { data } = response || {}
        if (Object.keys(data).length === 0) {
          reject(new Error('非法的返回值'))
        }
        if (data.code === CODE_ENUM.UNAUTHORIZED || data.code === CODE_ENUM.FORBIDDEN) {
          if (isRefreshing === false) {
            isRefreshing = true
            user.clearUserStore()
            wx.reLaunch({
              url: '/pages/login/index',
              success: () => {
                isRefreshing = false
              }
            })
          }
          reject(data)
        } else if (data.code === CODE_ENUM.ERROR) {
          reject(data)
        } else {
          resolve(data)
        }
      },
      fail: err => {
        logManager.error('api调用失败', err)
        reject(err)
      },
      complete: () => {
        needLoading && hideLoading()
      }
    })
  })
}

export const http = {
  get: <T>({ url, data, options }: HttpConfig): PromiseCatchResult<ResultData<T>> => promiseCatch(request({ url, method: 'GET', data, options })),
  post: <T>({ url, data, options }: HttpConfig): PromiseCatchResult<ResultData<T>> => promiseCatch(request({ url, method: 'POST', data, options })),
  delete: <T>({ url, data, options }: HttpConfig): PromiseCatchResult<ResultData<T>> => promiseCatch(request({ url, method: 'DELETE', data, options })),
  put: <T>({ url, data, options }: HttpConfig): PromiseCatchResult<ResultData<T>> => promiseCatch(request({ url, method: 'PUT', data, options })),
  // patch: <T>({ url, data, options }: HttpConfig): PromiseCatchResult<ResultData<T>> => promiseCatch(request({ url, method: 'PATCH', data, options }))
}

/**
 * @description: 微信文件上传方法
 * @param {string} url 后台上传接口地址
 * @param {string} filePath 获取到的临时文件链接
 * @param {string} name 后台识别上传文件的参数
 * @param {object} options 请求配置项
 * @return {*}
 */
export const uploadFile = ({ url, filePath, name, options = {} }: UploadFileConfig) => {
  return new Promise((resolve, reject) => {
    const { needLoading = false, loadingText = sysConfig.baseLoadingText, header = {} } = options
    needLoading && showLoading({
      title: loadingText
    })
    header[sysConfig[alias].tokenName] = `${sysConfig[alias].tokenPrefix}${user.token}` || ''
    // @ts-ignore
    wx.p
      .uploadFile({
        url: `${sysConfig[alias].apiBaseUrl}${url}`,
        filePath,
        name,
        header: Object.assign({}, sysConfig[alias].header, header)
      })
      .then((response: any) => {
        if (response.statusCode !== HTTP_STATUS_ENUM.SUCCESS) {
          reject(response)
        }
        const { data = {} } = response || {}
        const dataFromJson = JSON.parse(data)
        resolve(dataFromJson)
      })
      .catch((err: any) => {
        reject(err)
      })
      .finally(() => {
        needLoading && hideLoading()
      })
  })
}
