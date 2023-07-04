/*
 * @Author: 王昶
 * @Date: 2023-05-31 17:00:41
 * @LastEditors: 王昶
 * @LastEditTime: 2023-05-31 17:01:09
 * @FilePath: /mp-xmtc/utils/cal.js
 * @Description:
 *
 *
 */
export default {
  add: (arg1: number, arg2: number) => {
    let r1, r2, m
    try {
      r1 = arg1.toString().split('.')[1].length
    } catch (e) {
      r1 = 0
    }
    try {
      r2 = arg2.toString().split('.')[1].length
    } catch (e) {
      r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2))
    return (arg1 * m + arg2 * m) / m
  },
  
  sub: (arg1: number, arg2: number) => {
    let r1, r2, m
    try {
      r1 = arg1.toString().split('.')[1].length
    } catch (e) {
      r1 = 0
    }
    try {
      r2 = arg2.toString().split('.')[1].length
    } catch (e) {
      r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2))
    return (arg1 * m - arg2 * m) / m
  },
  
  mul: (arg1: number, arg2: number) => {
    let m = 0
    let s1 = arg1.toString()
    let s2 = arg2.toString()
    try {
      m += s1.split('.')[1].length
    } catch (e) {}
    try {
      m += s2.split('.')[1].length
    } catch (e) {}
    return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
  },
  
  div: (arg1: number, arg2: number) => {
    let t1 = 0
    let t2 = 0
    let r1; let r2
    try {
      t1 = arg1.toString().split('.')[1].length
    } catch (e) {}
    try {
      t2 = arg2.toString().split('.')[1].length
    } catch (e) {}
  
    r1 = Number(arg1.toString().replace('.', ''))
    r2 = Number(arg2.toString().replace('.', ''))
    return (r1 / r2) * Math.pow(10, t2 - t1)
  }
}