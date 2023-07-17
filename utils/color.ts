/*
 * @Author: GeraltWang WGERALT@OUTLOOK.COM
 * @Date: 2023-04-16 17:16:21
 * @LastEditors: 王昶 wgeralt@outlook.com
 * @LastEditTime: 2023-04-24 13:11:16
 * @FilePath: /mp-native-template/utils/color.js
 * @Description:
 */
import sysConfig from '../config/index'

type Color = {
  hexToRgb: (str: string) => number[] | null
  rgbToHex: (a: number, b: number, c: number) => string
  darken: (color: string, level: number) => string
  lighten: (color: string, level: number) => string
}

export default <Color>{
  /**
   * @description: hex颜色转rgb颜色
   * @param {string} hex
   * @return {*}
   */
  hexToRgb (hex: string = sysConfig.mpThemeColor): number[] | null {
    const match = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i)
    if (!match) {
      return null
    }
    const r = parseInt(match[1], 16)
    const g = parseInt(match[2], 16)
    const b = parseInt(match[3], 16)
    return [r, g, b]
  },
  /**
   * @description: rgb颜色转hex颜色
   */
  //rgb颜色转hex颜色
  rgbToHex (a: number, b: number, c: number) {
    let hexs = [a.toString(16), b.toString(16), c.toString(16)]
    for (let i = 0; i < 3; i++) {
      if (hexs[i].length == 1) hexs[i] = '0' + hexs[i]
    }
    return '#' + hexs.join('')
  },
  /**
   * @description: 颜色变深
   * @param {*} color
   * @param {*} level
   * @return {*}
   */
  darken (color: string, level: number) {
    let rgbc = this.hexToRgb(color)
    for (let i = 0; i < 3; i++) rgbc[i] = Math.floor(rgbc[i] * (1 - level))
    return this.rgbToHex(rgbc[0], rgbc[1], rgbc[2])
  },
  /**
   * @description: 颜色变浅
   * @param {*} color
   * @param {*} level
   * @return {*}
   */
  lighten (color: string, level: number) {
    let rgbc = this.HexToRgb(color)
    for (let i = 0; i < 3; i++) rgbc[i] = Math.floor((255 - rgbc[i]) * level + rgbc[i])
    return this.rgbToHex(rgbc[0], rgbc[1], rgbc[2])
  }
}
