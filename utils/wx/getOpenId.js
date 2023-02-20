import { getOpenId } from '../../api/model/test'
import { user } from '../../store/user'

/** getWxOpenId
 * @param {object} globalData app.js中的globalData
 */
const getWxOpenId = async (globalData) => {
  try {
    const wxRes = await wx.p.login()
    globalData.wxcode = wxRes.code
    const apiRes = await getOpenId({
      js_code: wxRes.code
    })
    user.updateOpenid(apiRes.data.openid || null)
  } catch (error) {
    console.log('openid获取失败', error)
  }
}

export default getWxOpenId
