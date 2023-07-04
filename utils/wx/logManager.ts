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
  info (...args: any[]) {
    if (!realtimeLogger) return
    realtimeLogger.info(`version: ${version}`, 'info log', ...args)
  },
  warn (...args: any[]) {
    if (!realtimeLogger) return
    realtimeLogger.warn(`version: ${version}`, 'warn log', ...args)
  },
  error (...args: any[]) {
    if (!realtimeLogger) return
    realtimeLogger.error(`version: ${version}`, 'error log', ...args)
  },
  // 从基础库2.7.3开始支持
  setFilterMsg (msg: string) {
    if (!realtimeLogger || !realtimeLogger.setFilterMsg) return
    if (typeof msg !== 'string') return
    realtimeLogger.setFilterMsg(msg)
  }
}
