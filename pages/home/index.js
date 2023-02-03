// pages/home/home.js
import { getMemberInfo } from '../../api/model/test'
import getWxOpenId from '../../utils/wx/getOpenId'
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 获取openid
  getUserAuth () {
    this.selectComponent('#my-t-message').showIconMsg('error', '这是一条错误提示通知')
    getWxOpenId(app.globalData)
  },
  async testMethod () {
    const res = await getMemberInfo()
    console.log(res)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    this.getUserAuth()
    this.testMethod()
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

  }
})
