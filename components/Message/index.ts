import Message from 'tdesign-miniprogram/message/index'

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
    * @description 带icon和状态的提示通知
    * @param type {string}
    * @param content {string}
    */
    showIconMsg (type = 'info', content = '占位信息') {
      Message[type]({
        context: this,
        selector: '#t-message',
        offset: [14, 20],
        duration: 5000,
        icon: true,
        content
      })
    },
    /**
    * @description 纯文本的提示通知
    * @param content {string}
    */
    showTextMsg (content = '占位信息') {
      Message.info({
        context: this,
        selector: '#t-message',
        offset: [14, 20],
        duration: 5000,
        icon: false,
        content
      })
    }
  }
})
