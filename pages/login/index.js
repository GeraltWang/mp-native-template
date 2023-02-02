// pages/login/login.js
import { showToast } from '../../utils/wx/interaction'
import storage from '../../utils/wx/storage'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dialogVisible: false,
    agree: [],
    confirmBtn: { content: '同意并继续', variant: 'base' },
    cancelBtn: { content: '拒绝', variant: 'base' }
  },
  doLogin () {
    if (this.data.agree[0] !== '1') {
      showToast({
        title: '请审慎阅读并同意《隐私权政策》、《注册协议》'
      })
      return false
    }
    console.log(1)
  },
  onDialogConfirm () {
    this.setData({
      agree: ['1'],
      dialogVisible: false
    })
    storage.local.set('AGREE_POLICY', true)
  },
  onDialogCancel () {
    this.setData({
      agree: [],
      dialogVisible: false
    })
    storage.local.remove('AGREE_POLICY')
  },
  handleGroupChange (e) {
    this.setData({
      agree: e.detail.value
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
        agree: ['1']
      })
    }
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
