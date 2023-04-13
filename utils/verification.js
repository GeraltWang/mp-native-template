/*
 * @Author: 王昶 wgeralt@outlook.com
 * @Date: 2023-03-29 10:23:06
 * @LastEditors: 王昶 wgeralt@outlook.com
 * @LastEditTime: 2023-04-13 11:09:33
 * @FilePath: /mp-native-template/utils/verification.js
 * @Description:
 */

// 内置手机号正则字符串
export const phoneReg = /^(?:(?:\+|00)86)?1\d{10}$/

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
export const idReg = /^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))(\d|X|x)$/

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

// 内置邮箱正则字符串
export const emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$/

/**
 * 邮箱正则校验
 * @param email 邮箱
 * @returns true - 校验通过 false - 校验失败
 */
export const emailRegCheck = (email) => {
  return emailReg.test(email)
}

// 内置银行卡正则字符串
export const bankCardReg = /^([1-9]{1})(\d{14}|\d{18})$/

/**
 * 银行卡正则校验
 * @param bankCard 银行卡号
 * @returns true - 校验通过 false - 校验失败
 * @description 16-19位
 */
export const bankCardRegCheck = (bankCard) => {
  return bankCardReg.test(bankCard)
}
