/*
 * @Author: 王昶 wgeralt@outlook.com
 * @Date: 2023-03-29 10:11:44
 * @LastEditors: 王昶 wgeralt@outlook.com
 * @LastEditTime: 2023-03-29 10:12:14
 * @FilePath: /mp-native-template/utils/wx/logManager.js
 * @Description:
 */
import sysConfig from '../../config/index'

// realtimeLogger
const realtimeLogger = wx.getRealtimeLogManager ? wx.getRealtimeLogManager() : null

// 版本
const version = sysConfig.mpVersion

export default {
  info () {
    if (!realtimeLogger) return
    realtimeLogger.info(`version: ${version}`, 'info log', ...arguments)
  },
  warn () {
    if (!realtimeLogger) return
    realtimeLogger.warn(`version: ${version}`, 'warn log', ...arguments)
  },
  error () {
    if (!realtimeLogger) return
    realtimeLogger.error(`version: ${version}`, 'error log', ...arguments)
  },
  // 从基础库2.7.3开始支持
  setFilterMsg (msg) {
    if (!realtimeLogger || !realtimeLogger.setFilterMsg) return
    if (typeof msg !== 'string') return
    realtimeLogger.setFilterMsg(msg)
  }
}
