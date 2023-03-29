/*
 * @Author: 王昶 wgeralt@outlook.com
 * @Date: 2023-03-29 10:23:06
 * @LastEditors: 王昶 wgeralt@outlook.com
 * @LastEditTime: 2023-03-29 10:39:12
 * @FilePath: /mp-native-template/utils/verification.js
 * @Description:
 */

// 内置手机号正则字符串
export const phoneReg = /^1(?:3\\d|4[4-9]|5[0-35-9]|6[67]|7[0-8]|8\\d|9\\d)\\d{8}$/

/**
 * 手机号正则校验
 * @param phone 手机号
 * @param phoneReg 正则字符串
 * @returns true - 校验通过 false - 校验失败
 */
export function verifyPhone (phone) {
  return phoneReg.test(phone)
}

// 内置身份证正则
export const idReg = /^\\d{6}((((((19|20)\\d{2})(0[13-9]|1[012])(0[1-9]|[12]\\d|30))|(((19|20)\\d{2})(0[13578]|1[02])31)|((19|20)\\d{2})02(0[1-9]|1\\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\\d{3})|((((\\d{2})(0[13-9]|1[012])(0[1-9]|[12]\\d|30))|((\\d{2})(0[13578]|1[02])31)|((\\d{2})02(0[1-9]|1\\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\\d{2}))(\\d|X|x)$/

/**
 * 身份证正则校验
 * @param id 身份证号
 * @returns true - 校验通过 false - 校验失败
 */
export const verifyId = (id) => {
  return idReg.test(id)
}

// 内置姓名正则字符串
export const nameReg = /^(?:[\u4e00-\u9fa5·]{2,16})$/

/**
 * 姓名正则校验
 * @param name 姓名
 * @returns true - 校验通过 false - 校验失败
 */
export const nameRegCheck = (name) => {
  return nameReg.test(name)
}
