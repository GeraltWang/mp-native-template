let myCalendar: any = null

Page({
  data: {

  },
  showCalendar () {
    myCalendar.show()
  },
  onLoad (options) {

  },
  onReady () {
    myCalendar = this.selectComponent('#my-calendar')
  },
  onShow () {

  },
  onHide () {

  },
  onUnload () {

  },
  onShareAppMessage () {
    return {
      title: '',
    }
  },
})