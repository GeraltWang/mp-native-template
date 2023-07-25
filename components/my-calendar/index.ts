import { WeekDays, getDaysOfMonth, getYearAndMonthAndDay, getFirstDayOfMonth, CalendarType } from './config'
import { solar2lunar } from './convert'

Component({
  behaviors: [],
  properties: {
    type: {
      type: String,
      value: CalendarType.Single,
    },
    /**
     * 选中的日期
     * 单选时为字符串，多选时为字符串数组
     * 格式YYYY-MM-DD 2021-09-01
     * ['2021-09-01', '2021-09-02']
     * 传入的日期必须在minDate和maxDate之间
     */
    value: {
      type: String,
      optionalTypes: [Array],
      value: '',
    },
    /**
     * 最小可选日期(不在范围内日期禁用不可选)
     * 之前的日期不可选
     * 1920-01-01
     */
    minDate: {
      type: String,
      value: '1920-01-01',
    },
    /**
     * 最大可选日期
     * 默认最大值为今天，之后的日期不可选
     * 2030-12-31
     */
    maxDate: {
      type: String,
      value: '',
    },
    lunar: {
      type: Boolean,
      value: false,
    },
    title: {
      type: String,
      value: '请选择日期',
    },
    //显示圆角
    radius: {
      type: Boolean,
      value: true,
    },
  },
  observers: {
    'value': function (value: string | string[]) {
      const { type } = this.properties
      if (type === CalendarType.Single) {
        this.setData({
          activeDate: value,
        })
      } else {
        const [start, end] = value as string[]
        this.setData({
          activeStartDate: start,
          activeEndDate: end,
        })
      }
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
    day: 0,
    min: {},
    max: {},
    // 单选时的选中日期
    activeDate: '',
    // 选择范围时的开始日期
    activeStartDate: '',
    // 选择范围时的结束日期
    activeEndDate: '',
    CalendarType
  },
  lifetimes: {
    created () {},
    attached () {
      this.init()
    },
    moved () {},
    detached () {},
  },
  methods: {
    selectDate (e: any) {
      const { index } = e.currentTarget.dataset
      const { type } = this.properties
      if (type === CalendarType.Single) {
        this.selectSingleDate(index)
      } else {
        this.selectRangeDate(index)
      }
    },
    selectSingleDate (index: number) {
      const result = this.beforeSelectDate(index)
      if (!result) return
      const { year, month } = this.data
      const dateStr = `${year}-${month + 1}-${index + 1}`
      this.setData({
        activeDate: dateStr,
      })
    },
    selectRangeDate (index: number) {
      const result = this.beforeSelectDate(index)
      if (!result) return
      const { activeStartDate, activeEndDate, month, year } = this.data
      const padMonth = month + 1 < 10 ? `0${month + 1}` : month + 1
      const padDay = index + 1 < 10 ? `0${index + 1}` : index + 1
      if (!activeStartDate && !activeEndDate) {
        this.setData({
          activeStartDate: `${year}-${padMonth}-${padDay}`,
        })
      }
      if (!activeStartDate && activeEndDate) {
        this.setData({
          activeStartDate: `${year}-${padMonth}-${padDay}`,
          activeEndDate: '',
        })
      }
      if (activeStartDate && !activeEndDate) {
        const [startYear, startMonth, startDay] = activeStartDate.split('-').map((item: string) => parseInt(item))
        const [endYear, endMonth, endDay] = [year, padMonth, padDay]
        console.log(endYear, endMonth, endDay)
        // ios下new Date('2021-09-01')不支持，需要转换成new Date('2021/09/01')
        if (new Date(`${startYear}/${startMonth}/${startDay}`).getTime() > new Date(`${endYear}/${endMonth}/${endDay}`).getTime()) {
          wx.showToast({
            title: '结束日期不能小于开始日期',
            icon: 'none',
            mask: false
          })
          return
        }
        this.setData({
          activeEndDate: `${year}-${padMonth}-${padDay}`,
        })
      }
      if (activeStartDate && activeEndDate) {
        this.setData({
          activeStartDate: `${year}-${padMonth}-${padDay}`,
          activeEndDate: '',
        })
      }
    },
    onConfirm () {
      const { type, lunar } = this.properties
      const { activeDate, activeStartDate, activeEndDate } = this.data
      const [year, month, day] = activeDate.split('-').map((item: string) => parseInt(item))
      console.log({
        date: type === CalendarType.Single ? activeDate : [activeStartDate, activeEndDate],
        startDate: type === CalendarType.Range ? activeStartDate : null,
        endDate: type === CalendarType.Range ? activeEndDate : null,
        year: type === CalendarType.Range ? null : year,
        month: type === CalendarType.Range ? null : month,
        day: type === CalendarType.Range ? null : day,
        lunar: lunar ? this.data.lunarDaysArr[day - 1] : null,
      })
      this.triggerEvent('confirm', {
        date: type === CalendarType.Single ? activeDate : [activeStartDate, activeEndDate],
        startDate: type === CalendarType.Range ? activeStartDate : null,
        endDate: type === CalendarType.Range ? activeEndDate : null,
        year: type === CalendarType.Range ? null : year,
        month: type === CalendarType.Range ? null : month,
        day: type === CalendarType.Range ? null : day,
        lunar: lunar ? this.data.lunarDaysArr[day - 1] : null,
      })
    },
    beforeSelectDate (index: number) {
      const { year, month } = this.data
      const dateStr = `${year}-${month + 1}-${index + 1}`
      const { min, max } = this.data
      if (min.year && min.month && min.day) {
        const minDateStr = `${min.year}-${min.month + 1}-${min.day}`
        if (new Date(dateStr).getTime() < new Date(minDateStr).getTime()) {
          wx.showToast({
            title: '超出最小日期',
            icon: 'none',
          })
          return false
        }
      }
      if (max.year && max.month && max.day) {
        const maxDateStr = `${max.year}-${max.month + 1}-${max.day}`
        if (new Date(dateStr).getTime() > new Date(maxDateStr).getTime()) {
          wx.showToast({
            title: '超出最大日期',
            icon: 'none',
          })
          return false
        }
      }
      return true
    },
    /**
     * 根据年月日获取对应日期的农历字符串
     * @param year 年份
     * @param month 月份 注意：月份是从1开始的
     * @param day 日期 注意：日期是从1开始的
     * @returns
     */
    getLunar (year: number, month: number, day: number) {
      let obj: any = solar2lunar(year, month, day)
      return obj.IDayCn
    },
    /**
     * 根据年月日获取对应日期的农历字符串组成的数组
     * @param year 年份
     * @param month 月份 注意：月份是从0开始的
     * @param days 天数 传入年月对应月的天数
     * @returns
     */
    getLunarArr (year: number, month: number, days: number) {
      let arr = []
      for (let i = 1; i <= days; i++) {
        arr.push(this.getLunar(year, month + 1, i))
      }
      return arr
    },
    changeMonth (e: any) {
      const { add } = e.currentTarget.dataset
      if (add === '1') {
        // 下一个月
        let { year, month } = this.data
        if (month === 11) {
          year++
          month = 0
        } else {
          month++
        }
        const days = getDaysOfMonth(year, month)
        const emptyDays = getFirstDayOfMonth(year, month)
        const { lunar } = this.properties
        let lunarDaysArr = []
        if (lunar) {
          lunarDaysArr = this.getLunarArr(year, month, days)
        }
        this.setData({
          emptyDays,
          lunarDaysArr,
          year,
          month,
          days,
          dateForDisplay: `${year}年${month + 1}月`,
        })
      } else {
        // 上一个月
        let { year, month } = this.data
        if (month === 0) {
          year--
          month = 11
        } else {
          month--
        }
        const days = getDaysOfMonth(year, month)
        const emptyDays = getFirstDayOfMonth(year, month)
        const { lunar } = this.properties
        let lunarDaysArr = []
        if (lunar) {
          lunarDaysArr = this.getLunarArr(year, month, days)
        }
        this.setData({
          emptyDays,
          lunarDaysArr,
          year,
          month: month,
          days,
          dateForDisplay: `${year}年${month + 1}月`,
        })
      }
    },
    changeYear (e: any) {
      const { add } = e.currentTarget.dataset
      if (add === '1') {
        // 下一年
        let { year, month } = this.data
        year++
        const days = getDaysOfMonth(year, month)
        const emptyDays = getFirstDayOfMonth(year, month)
        const { lunar } = this.properties
        let lunarDaysArr = []
        if (lunar) {
          lunarDaysArr = this.getLunarArr(year, month, days)
        }
        this.setData({
          emptyDays,
          lunarDaysArr,
          year,
          month,
          days,
          dateForDisplay: `${year}年${month + 1}月`,
        })
      } else {
        // 上一年
        let { year, month } = this.data
        year--
        const days = getDaysOfMonth(year, month)
        const emptyDays = getFirstDayOfMonth(year, month)
        const { lunar } = this.properties
        let lunarDaysArr = []
        if (lunar) {
          lunarDaysArr = this.getLunarArr(year, month, days)
        }
        this.setData({
          emptyDays,
          lunarDaysArr,
          year,
          month,
          days,
          dateForDisplay: `${year}年${month + 1}月`,
        })
      }
    },
    initDate (endDate?: string) {
      // 根据endDate获取当前年月日
      const { year, month, day } = getYearAndMonthAndDay(endDate)
      return {
        year,
        month,
        day
      }
    },
    init () {
      // 获取年月日
      const { type } = this.properties
      let currentDate = ''
      if (type === CalendarType.Single) {
        currentDate = this.properties.value as string
      } else {
        const [start, end] = this.properties.value as string[]
        currentDate = end
      }
      const { year, month, day } = getYearAndMonthAndDay(currentDate)
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
        today: `${year}-${month + 1}-${day}`,
        emptyDays,
        lunarDaysArr,
        year,
        month,
        day,
        days,
        dateForDisplay: `${year}年${month + 1}月`,
        min: this.initDate(this.properties.minDate),
        max: this.initDate(this.properties.maxDate),
      })
    },
    show () {
      this.setData({
        visible: true,
      })
    },
    hide () {
      this.setData({
        visible: false,
      })
    },
    onTapMask () {
      this.setData({
        visible: false,
      })
    },
    stop () {
      return false
    }
  },
})
