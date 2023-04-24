/*
 * @Author: GeraltWang WGERALT@OUTLOOK.COM
 * @Date: 2023-04-16 17:16:21
 * @LastEditors: 王昶 wgeralt@outlook.com
 * @LastEditTime: 2023-04-24 13:11:16
 * @FilePath: /mp-native-template/utils/color.js
 * @Description:
 */
import sysConfig from '../config/index'

export default {
  /**
   * @description: hex颜色转rgb颜色
   * @param {string} str
   * @return {*}
   */
  HexToRgb (str = sysConfig.mpThemeColor) {
    str = str.replace('#', '')
    let hxs = str.match(/../g)
    for (let i = 0; i < 3; i++) hxs[i] = parseInt(hxs[i], 16)
    return hxs
  },
  /**
   * @description: rgb颜色转hex颜色
   * @param {*} a
   * @param {*} b
   * @param {*} c
   * @return {*}
   */
  RgbToHex (a, b, c) {
    let hexs = [a.toString(16), b.toString(16), c.toString(16)]
    for (let i = 0; i < 3; i++) {
      if (hexs[i].length === 1) hexs[i] = '0' + hexs[i]
    }
    return '#' + hexs.join('')
  },
  /**
   * @description: 颜色变深
   * @param {*} color
   * @param {*} level
   * @return {*}
   */
  darken (color, level) {
    let rgbc = this.HexToRgb(color)
    for (let i = 0; i < 3; i++) rgbc[i] = Math.floor(rgbc[i] * (1 - level))
    return this.RgbToHex(rgbc[0], rgbc[1], rgbc[2])
  },
  /**
   * @description: 颜色变浅
   * @param {*} color
   * @param {*} level
   * @return {*}
   */
  lighten (color, level) {
    let rgbc = this.HexToRgb(color)
    for (let i = 0; i < 3; i++) rgbc[i] = Math.floor((255 - rgbc[i]) * level + rgbc[i])
    return this.RgbToHex(rgbc[0], rgbc[1], rgbc[2])
  }
}
