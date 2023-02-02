import { getOpenId } from '../../api/model/test'

const getWxOpenId = globalData => {
  wx.login({
    success: wxRes => {
      globalData.wxcode = wxRes.code
      getOpenId({
        js_code: wxRes.code
      }).then(res => {
        console.log(res)
        globalData.openid = res.data.openid
      }).catch(err => {
        console.log('openid获取失败', err)
      })
    }
  })
}

export default getWxOpenId
