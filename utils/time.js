/*
 * @Author: 王昶 wgeralt@outlook.com
 * @Date: 2023-04-19 10:08:23
 * @LastEditors: 王昶 wgeralt@outlook.com
 * @LastEditTime: 2023-05-05 09:58:46
 * @FilePath: /mp-native-template/utils/time.js
 * @Description:
 */

/**
 * @description: 获取当年月份组成的数组
 * @param {string} suffix 月份后缀
 * @return {array}
 * @example: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
 */
export function getMonth (suffix = '月') {
  let month = []
  for (let i = 1; i <= 12; i++) {
    month.push(`${i}${suffix}`)
  }
  return month
}

/**
 * @description: 获取当月日期组成的数组
 * @param {*} year 年份
 * @param {*} month 月份
 * @return {array} 日期数组
 */
export function getDateOfMonth (year, month) {
  let d = new Date(year, month, 0)
  const days = d.getDate()
  let dateOfMonth = []
  for (let i = 1; i <= days; i++) {
    dateOfMonth.push(i)
  }
  return dateOfMonth
}
