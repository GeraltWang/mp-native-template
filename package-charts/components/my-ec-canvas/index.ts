/*
 * @Author: 王昶 wgeralt@outlook.com
 * @Date: 2023-02-12 22:08:44
 * @LastEditors: 王昶 wgeralt@outlook.com
 * @LastEditTime: 2023-05-04 17:42:39
 * @FilePath: /mp-native-template/package-charts/components/my-ec-canvas/index.js
 * @Description:
 */
// package-charts/components/my-ec-canvas/index.js
// @ts-expect-error
import * as echarts from '../../libs/echarts.min'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    chartLineId: { type: String },
    canvasId: { type: String },
    options: { type: Object },
    height: {
      type: String,
      value: '100%'
    }
  },

  observers: {
    options (newVal) {
      this.setData({
        myOptions: newVal
      })
      if (this.data.init) {
        this.initChart()
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    init: false,
    ec: {
      lazyLoad: true // 设置echarts延时加载
    }
  },
  lifetimes: {
    ready () {
      this[this.data.chartLineId] = this.selectComponent('#' + this.data.chartLineId) // 通过`id`获取echarts组件
      this.initChart()
    },
    detached () {
      this[this.data.chartLineId] = null
      this[this.data.canvasId] = null
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    initChart () {
      this[this.data.chartLineId].init((canvas: any, width: any, height: any, dpr: any) => {
        const chart = echarts.init(canvas, null, {
          width,
          height,
          devicePixelRatio: dpr // new
        })
        canvas.setChart(chart)
        chart.setOption(this.getOption())
        this.setData({
          init: true
        })
        return chart
      })
    },
    getOption () {
      const option = this.data.options
      return option
    }
  }
})
