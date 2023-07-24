import { WeekDays, getDaysOfMonth, getYearAndMonthAndDay, getFirstDayOfMonth } from './conifg'
import { solar2lunar, lunar2solar } from './convert'

Component({
  behaviors: [],
  properties: {
    type: {
      type: String,
      value: 'single'
    },
    value: {
      type: String,
      additionalTypes: [Number, Array],
      value: ''
    },
    lunar: {
      type: Boolean,
      value: false
    }
  },
  data: {
    visible: false,
    WeekDays,
    emptyDays: 0,
    days: 0,
    lunarDaysArr: [],
    year: 0,
    month: 0,
  },
  lifetimes: {
    created () {

    },
    attached () {
      this.init()
    },
    moved () {

    },
    detached () {

    },
  },
  methods: {
    getLunar (year: number, month: number, day: number) {
      let obj: any = solar2lunar(year, month, day)
      return obj.IDayCn
    },
    getLunarArr (year: number, month: number, days: number) {
      let arr = []
      for (let i = 1; i <= days; i++) {
        arr.push(this.getLunar(year, month, i))
      }
      return arr
    },
    init () {
      // 获取当前年月
      const { year, month } = getYearAndMonthAndDay()
      // 获取当前月的天数
      const days = getDaysOfMonth(year, month)
      // 获取当前月的第一天是星期几
      const emptyDays = getFirstDayOfMonth(year, month)
      // 如果需要显示农历
      const { lunar } = this.properties
      let lunarDaysArr = []
      if (lunar) {
        lunarDaysArr = this.getLunarArr(year, month, days)
      }
      this.setData({
        emptyDays,
        lunarDaysArr,
        year,
        month: month + 1,
        days
      })
    },
    show () {
      this.setData({
        visible: true
      })
    },
    onTapMask () {
      this.setData({
        visible: false
      })
    }
  },
})