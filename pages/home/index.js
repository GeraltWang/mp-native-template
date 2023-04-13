/*
 * @Author: 王昶 wgeralt@outlook.com
 * @Date: 2023-02-20 16:41:27
 * @LastEditors: GeraltWang WGERALT@OUTLOOK.COM
 * @LastEditTime: 2023-03-31 23:59:41
 * @FilePath: /mp-native-template/pages/home/index.js
 * @Description:
 */
// pages/home/home.js
import { userBehavior } from '../../behaviors/store/user'
import { getMemberInfo } from '../../api/sz-coin-base/model/test'
import getWxOpenId from '../../utils/wx/getOpenId'
const app = getApp()

Page({
  behaviors: [userBehavior],
  /**
   * 页面的初始数据
   */
  data: {

  },
  // 获取openid
  async getUserAuth () {
    // this.selectComponent('#my-t-message').showIconMsg('error', '这是一条错误提示通知')
    await getWxOpenId(app.globalData)
  },
  async testMethod () {
    const res = await getMemberInfo()
    console.log(res)
  },
  async initPage () {
    // await this.getUserAuth()
    // await this.testMethod()
  },
  goCharts () {
    wx.navigateTo({
      url: '/package-charts/pages/chart-demo/index'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    this.initPage()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    this.updateOpenid('hahaha', true)
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
