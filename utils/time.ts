/*
 * @Author: 王昶 wgeralt@outlook.com
 * @Date: 2023-04-19 10:08:23
 * @LastEditors: 王昶 wgeralt@outlook.com
 * @LastEditTime: 2023-05-12 15:33:36
 * @FilePath: /mp-native-template/utils/time.js
 * @Description:
 */
import dayjs from 'dayjs'

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
 * @description: 根据年份和月份获取指定月份日期组成的数组
 * @param {*} year 年份
 * @param {*} month 月份
 * @example: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, ..., 31]
 * @return {array} dateOfMonth 指定月份日期组成的数组
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

/**
 * @description: 获取最近几年的年份组成的数组
 * @param {number} yearsCount 最近几年
 * @example: [2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014]
 * @return {array} years 年份组成的数组
 */
export function getLastSeveralYears (yearsCount = 10) {
  let years = []
  for (let i = 0; i < yearsCount; i++) {
    years.push(dayjs().subtract(i, 'year').format('YYYY'))
  }
  return years
}

/**
 * @description: 判断是否是闰年
 * @param {number} year 年份
 * @return {boolean} isLeapYear 是否是闰年
 */
export function isLeapYear (year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}
