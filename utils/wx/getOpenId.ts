/*
 * @Author: 王昶 wgeralt@outlook.com
 * @Date: 2023-02-12 22:08:44
 * @LastEditors: 王昶 wgeralt@outlook.com
 * @LastEditTime: 2023-04-14 16:11:07
 * @FilePath: /mp-native-template/utils/wx/getOpenId.js
 * @Description:
 */
import { getOpenId } from '../../api/szCoinBase/model/test'
import { CODE_ENUM } from '../../api/szCoinBase/enum/index'
import { user } from '../../store/index'

// 已重试次数
let retryCount = 0

/** getWxOpenId
 * @description: getWxOpenId,调用wx.login成功后，调用后台获取openid方法
 * @param {string} maxRetry 重试次数
 */
const getWxOpenId = async (maxRetry = 2) => {
  // 调用wx.login获取code
  const wxRes = await wx.p.login()
  // 调用后台获取openid
  const [error, apiRes] = await getOpenId({
    js_code: wxRes.code
  })
  // 获取openid失败
  if (error) {
    // 401 403 不重试
    if (error.code === CODE_ENUM.FORBIDDEN || error.code === CODE_ENUM.UNAUTHORIZED) {
      console.log(`openid获取失败, 失败次数:${retryCount}`, `失败原因:${error.msg}`)
      return [error, null]
    }
    // 重试次数超过最大值 停止重试
    if (retryCount >= maxRetry) {
      console.log(`openid获取失败, 失败次数:${retryCount}`, `失败原因:${error.msg}`)
      return [error, null]
    }
    retryCount++
    await getWxOpenId(maxRetry = 2)
  // 获取openid成功
  } else {
    user.updateOpenid(apiRes.data.openid || null, true)
    return [null, apiRes]
  }
}

export default getWxOpenId
