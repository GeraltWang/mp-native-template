// pages/login/login.js
import { showToast } from '../../utils/wx/interaction'
import storage from '../../utils/wx/storage'
import { userBehavior } from '../../behaviors/store/user'
const computedBehavior = require('miniprogram-computed').behavior

Page({
  behaviors: [userBehavior, computedBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    // 是否同意协议
    isAgree: false,
    // 弹窗相关数据
    dialogVisible: false,
    confirmBtn: {
      content: '同意并继续',
      variant: 'base'
    },
    cancelBtn: {
      content: '拒绝',
      variant: 'base'
    },
    // link跳转链接配置
    privacyPolicy: {
      url: `/pages/web-view/index?url=${encodeURIComponent(
        'https://baidu.com'
      )}`
    },
    regPolicy: {
      url: `/pages/web-view/index?url=${encodeURIComponent(
        'https://baidu.com'
      )}`
    }
  },
  computed: {
    testComputed (data) {
      return data.isAgree
    }
  },
  // 获取手机号 - 登录
  doLogin (e) {
    if (!this.data.isAgree) {
      showToast({
        title: '请审慎阅读并同意《隐私权政策》、《注册协议》'
      })
      return false
    }
    console.log(e)
    const { detail: { code } } = e
    // 拿到code之后传给后台换取真实手机号
  },
  onDialogConfirm () {
    this.setData({
      isAgree: true,
      dialogVisible: false
    })
    storage.local.set('AGREE_POLICY', true)
  },
  onDialogCancel () {
    this.setData({
      isAgree: false,
      dialogVisible: false
    })
    storage.local.remove('AGREE_POLICY')
  },
  // 同意/不同意协议
  onAgreeChange (e) {
    this.setData({
      isAgree: e.detail.checked
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    const isAgree = storage.local.get('AGREE_POLICY')
    if (!isAgree) {
      this.setData({
        dialogVisible: true
      })
    } else {
      this.setData({
        isAgree: true
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () { },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () { },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () { },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () { },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () { },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom () { },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage () { }
})
