const getPermission = ({ code, name }) => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: (res) => {
        console.log(res)
        if (res.authSetting[code] === false) {
          wx.showModal({
            title: `获取${name}失败`,
            content: `获取${name}失败，请在【右上角】-小程序【设置】项中，将【${name}】开启。`,
            confirmText: '去设置',
            // confirmColor: '#FA550F',
            cancelColor: '取消',
            success (res) {
              if (res.confirm) {
                wx.openSetting({
                  success (settingRes) {
                    if (settingRes.authSetting[code] === true) {
                      resolve()
                    } else {
                      console.warn('用户未打开权限', name, code)
                      reject(new Error('用户未打开权限'))
                    }
                  }
                })
              } else {
                reject(new Error(`获取${name}被用户取消`))
              }
            },
            fail () {
              reject(new Error('调用失败'))
            }
          })
        } else {
          resolve()
        }
      },
      fail () {
        reject(new Error('wx.getSetting调用失败'))
      }
    })
  })
}

export default getPermission
