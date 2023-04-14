// package-charts/pages/chart-demo/index.
let option = {
  title: {
    text: '测试下面legend的红色区域不应被裁剪',
    left: 'center'
  },
  legend: {
    data: ['A', 'B', 'C'],
    top: 30,
    left: 'center',
    // backgroundColor: 'red',
    z: 100
  },
  grid: {
    containLabel: true
  },
  tooltip: {
    show: true,
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    // show: false
  },
  yAxis: {
    x: 'center',
    type: 'value',
    splitLine: {
      lineStyle: {
        type: 'dashed'
      }
    }
    // show: false
  },
  series: [{
    name: 'A',
    type: 'line',
    smooth: true,
    data: [18, 36, 65, 30, 78, 40, 33]
  }, {
    name: 'B',
    type: 'line',
    smooth: true,
    data: [12, 50, 51, 35, 70, 30, 20]
  }, {
    name: 'C',
    type: 'line',
    smooth: true,
    data: [10, 30, 31, 50, 40, 20, 10]
  }]
}

let barOption = {
  title: {
    text: '测试下面legend的红色区域不应被裁剪',
    left: 'center'
  },
  legend: {
    data: ['A', 'B', 'C'],
    top: 30,
    left: 'center',
    // backgroundColor: 'red',
    z: 100
  },
  grid: {
    containLabel: true
  },
  tooltip: {
    show: true,
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    // show: false
  },
  yAxis: {
    x: 'center',
    type: 'value',
    splitLine: {
      lineStyle: {
        type: 'dashed'
      }
    }
    // show: false
  },
  series: [{
    name: 'A',
    type: 'bar',
    smooth: true,
    data: [18, 36, 65, 30, 78, 40, 33]
  }, {
    name: 'B',
    type: 'bar',
    smooth: true,
    data: [12, 50, 51, 35, 70, 30, 20]
  }, {
    name: 'C',
    type: 'bar',
    smooth: true,
    data: [10, 30, 31, 50, 40, 20, 10]
  }]
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    options: option,
    barOptions: barOption
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {

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
