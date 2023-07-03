/*
 * @Author: 王昶 wgeralt@outlook.com
 * @Date: 2023-05-15 09:39:03
 * @LastEditors: 王昶 wgeralt@outlook.com
 * @LastEditTime: 2023-05-15 17:09:58
 * @FilePath: /mp-native-template/components/my-signature/index.js
 * @Description:
 */
const MAX_V = 1 // 最大书写速度
const MIN_V = 0 // 最小书写速度
const MAX_LINE_WIDTH = 12 // 最大笔画宽度
const MIN_LINE_WIDTH = 4 // 最小笔画宽度
const MAX_LINE_DIFF = 0.03 // 两点之间笔画宽度最大差异
let canvasObj = null // canvas对象
let context = null // canvas上下文
let lastPoint = null

Component({
  options: {
    addGlobalClass: true
  },
  behaviors: [],
  properties: {},
  data: {
    draw: false
  },
  lifetimes: {
    created () {},
    attached () {
      this.initPage()
    },
    ready () {
      this.initCanvas()
    },
    moved () {},
    detached () {}
  },
  methods: {
    catchTouchStart (e) {
      const { offsetLeft, offsetTop } = e.currentTarget
      const { clientX, clientY } = e.changedTouches[0]
      lastPoint = {
        x: clientX - offsetLeft, // X坐标
        y: clientY - offsetTop, // Y坐标
        t: new Date().getTime(), // 当前时间
        w: (MAX_LINE_WIDTH + MIN_LINE_WIDTH) / 2 /* 默认宽度 */
      }
    },
    catchTouchMove (e) {
      const { draw } = this.data
      const { offsetLeft, offsetTop } = e.currentTarget
      const { clientX, clientY } = e.changedTouches[0]
      if (!draw) {
        this.data.draw = true
      }
      let currPoint = {
        x: clientX - offsetLeft, // X坐标
        y: clientY - offsetTop, // Y坐标
        t: new Date().getTime(), // 当前时间
        w: (MAX_LINE_WIDTH + MIN_LINE_WIDTH) / 2 /* 默认宽度 */
      }
      if (lastPoint) {
        currPoint.w = this.calcLineWidth(currPoint) // 重新赋值宽度，覆盖默认值
        context.beginPath()
        context.strokeStyle = '#000'
        context.lineCap = 'round'
        context.lineJoin = 'round'
        context.lineWidth = currPoint.w
        context.moveTo(lastPoint.x, lastPoint.y)
        context.lineTo(currPoint.x, currPoint.y)
        context.stroke()
      }
      lastPoint = currPoint // 结束前保存当前点为上一点
    },
    catchTouchEnd (e) {
      lastPoint = null // 每笔画完清除缓存
    },
    // 计算当前点的宽度，书写速度越快，笔画宽度越小，呈现出笔锋的感觉（笑）
    calcLineWidth (currPoint) {
      let consuming = currPoint.t - lastPoint.t // 两点之间耗时
      if (!consuming) return lastPoint.w // 如果当前点用时为0，返回上点的宽度。
      let maxWidth = Math.min(MAX_LINE_WIDTH, lastPoint.w * (1 + MAX_LINE_DIFF)) // 当前点的最大宽度
      let minWidth = Math.max(MIN_LINE_WIDTH, lastPoint.w * (1 - MAX_LINE_DIFF * 3)) // 当前点的最小宽度，变细时速度快所以宽度变化要稍快
      let distance = Math.sqrt(Math.pow(currPoint.x - lastPoint.x, 2) + Math.pow(currPoint.y - lastPoint.y, 2)) // 两点之间距离
      let speed = Math.max(Math.min(distance / consuming, MAX_V), MIN_V) /* 当前点速度 */
      let lineWidth = Math.max(Math.min(MAX_LINE_WIDTH * (1 - speed / MAX_V), maxWidth), minWidth) /* 当前点宽度 */
      return lineWidth
    },
    initCanvas () {
      const { pixelRatio } = this.data
      const query = wx.createSelectorQuery().in(this)
      query
        .select('#my-signature')
        .fields({ node: true, size: true })
        .exec((res) => {
          const canvas = res[0].node
          const ctx = canvas.getContext('2d')
          const dpr = pixelRatio
          canvas.width = res[0].width * dpr
          canvas.height = res[0].height * dpr
          ctx.scale(dpr, dpr)
          ctx.fillStyle = '#cccccc'
          ctx.font = '28px serif'
          context = ctx
          canvasObj = canvas
        })
    },
    confirmCanvas () {
      const { draw } = this.data
      if (!draw) {
        wx.showToast({
          title: '请先签名',
          icon: 'none'
        })
        return
      }
      const query = wx.createSelectorQuery().in(this)
      query
        .select('#my-signature')
        .fields({ node: true, size: true })
        .exec((res) => {
          const canvas = res[0].node
          wx.canvasToTempFilePath({
            canvas,
            success: (res) => {
              console.log(res.tempFilePath)
            },
            fail: (err) => {
              console.log(err)
            }
          })
        })
    },
    clearCanvas () {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height)
    },
    initPage () {
      const sysInfo = wx.getSystemInfoSync()
      const { windowHeight, windowWidth, screenHeight, pixelRatio } = sysInfo
      this.setData({
        windowHeight: windowHeight - 40,
        windowWidth: windowWidth - 80,
        navbarHeight: screenHeight - windowHeight + 16,
        pixelRatio
      })
    }
  }
})
