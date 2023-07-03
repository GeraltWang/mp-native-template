// pages/usercenter/index.js
const menuData = [
  [
    {
      title: '收货地址',
      tit: '',
      url: '',
      type: 'address'
    },
    {
      title: '优惠券',
      tit: '',
      url: '',
      type: 'coupon'
    },
    {
      title: '积分',
      tit: '',
      url: '',
      type: 'point'
    }
  ],
  [
    {
      title: '帮助中心',
      tit: '',
      url: '',
      type: 'help-center'
    },
    {
      title: '客服热线',
      tit: '',
      url: '',
      type: 'service',
      icon: 'service'
    }
  ]
]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuData,
    value: 121
  },
  change () {
    this.setData({
      value: 200
    })
  },
  getVersionInfo () {
    const versionInfo = wx.getAccountInfoSync()
    const { version, envVersion = __wxConfig } = versionInfo.miniProgram
    console.log(envVersion, __wxConfig)
    this.setData({
      versionNo: envVersion === 'release' ? version : envVersion
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    this.getVersionInfo()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    this.getTabBar().init()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage () {

  },
  /**
   * 用户滑动页面
   */
  onPageScroll (e) {
    console.log(e)
  }
})
