/*
 * @Author: 王昶 wgeralt@outlook.com
 * @Date: 2023-02-12 22:08:44
 * @LastEditors: 王昶 wgeralt@outlook.com
 * @LastEditTime: 2023-04-24 13:11:35
 * @FilePath: /mp-native-template/config/index.js
 * @Description: 小程序配置文件
 */
import szCoinBase from './szCoinBase'

export default <Config>{
  // 小程序名称
  mpName: 'MP-Template',
  // 小程序版本
  mpVersion: '1.0.0',
  // 小程序主题色
  mpThemeColor: '#336CFF',
  // 接口基地址
  apiBaseUrl: 'https://mis-test.51haohuo.com/coin-service/app',
  // 对象存储基地址
  ossBaseUrl: '',
  // 默认 loading 文字
  baseLoadingText: '加载中...',
  // token 名称
  tokenName: 'token',
  // token prefix
  tokenPrefix: '',
  // 默认请求头
  header: {},
  // 为本地存储添加统一的前缀
  storagePrefix: '',
  // 本地存储过期时间 单位（天）
  storageExpireTime: 0,
  // web-view地址
  webviewUrl: {},
  szCoinBase
}
