// components/Dialog/index.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots: true
  },
  properties: {
    visible: {
      type: Boolean,
      value: true
    },
    title: {
      type: String,
      value: 'Dialog标题'
    },
    content: {
      type: String,
      value: ''
    },
    confirmBtn: {
      type: Object,
      value: {
        content: '确定', variant: 'base'
      }
    },
    cancelBtn: {
      type: Object,
      value: {
        content: '取消', variant: 'base'
      }
    }
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
    closeDialog () {
      this.triggerEvent('close')
    },
    cancelDialog () {
      this.triggerEvent('cancel')
    },
    confirmDialog () {
      this.triggerEvent('confirm')
    }
  }
})
