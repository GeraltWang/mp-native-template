/*
 * @Author: 王昶 wgeralt@outlook.com
 * @Date: 2023-03-29 10:40:20
 * @LastEditors: 王昶 wgeralt@outlook.com
 * @LastEditTime: 2023-03-29 11:33:36
 * @FilePath: /mp-native-template/utils/authStep.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import sysConfig from '../config/index'

/**
 * @description: noneAuth未登录，login登录但未实名，verified登录且实名
 * @return {*}
 */
export const AuthStepEnum = {
  noneAuth: 1,
  login: 2,
  verified: 3
}

/**
 * @description: 根据鉴权状态判断用户访问权限
 * @param {*} currAuthStep 当前鉴权状态
 * @param {*} requireAuthStep 应具备的鉴权状态
 * @return {*}
 */
export const checkByAuthStep = (currAuthStep, requireAuthStep) => {
  if (requireAuthStep === AuthStepEnum.login) {
    if (currAuthStep === AuthStepEnum.noneAuth) {
      wx.navigateTo({
        url: '/pages/login/index'
      })
      return false
    }
    return true
  } else if (requireAuthStep === AuthStepEnum.verified) {
    if (currAuthStep === AuthStepEnum.noneAuth) {
      wx.navigateTo({
        url: '/pages/login/index'
      })
      return false
    } else if (currAuthStep === AuthStepEnum.login) {
      wx.showModal({
        title: '提示',
        content: `使用${sysConfig.mpName}小程序服务需要完成实名认证`,
        confirmText: '去认证',
        confirmColor: '#d33b42',
        cancelText: '取消',
        cancelColor: '#3d3d3d',
        complete: (res) => {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/user-verification/index'
            })
          }
        }
      })
      return false
    }
  }
  return true
}
