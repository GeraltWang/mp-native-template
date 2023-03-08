/*
 * @Author: 王昶 wgeralt@outlook.com
 * @Date: 2023-02-12 22:08:44
 * @LastEditors: 王昶 wgeralt@outlook.com
 * @LastEditTime: 2023-03-08 17:57:06
 * @FilePath: /mp-native-template/utils/wx/getOpenId.js
 * @Description:
 */
import { getOpenId } from '../../api/sz-coin-base/model/test'
import { user } from '../../store/index'

let retryCount = 0

/** getWxOpenId
 * @description: getWxOpenId,调用wx.login成功后，调用后台获取openid方法
 * @param {object} globalData app.js中的globalData
 * @param {string} maxRetry 重试次数
 */
const getWxOpenId = async (globalData, maxRetry = 2) => {
  try {
    const wxRes = await wx.p.login()
    globalData.wxcode = wxRes.code
    const apiRes = await getOpenId({
      js_code: wxRes.code
    })
    user.updateOpenid(apiRes.data.openid || null, true)
  } catch (error) {
    if (retryCount >= maxRetry) {
      throw new Error('获取openid超过最大次数')
    }
    retryCount++
    console.log(`openid获取失败, 失败次数:${retryCount}`, `失败原因:${error.message}`)
    await getWxOpenId(globalData, maxRetry = 2)
  }
}

export default getWxOpenId
