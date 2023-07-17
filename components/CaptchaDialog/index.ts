// components/CaptchaDialog/index.js
import { showToast } from '../../utils/wx/interaction'
import { userBehavior } from '../../behaviors/store/user'
import { verifyPhone } from '../../utils/verification'

Component({
  behaviors: [userBehavior],
  /**
   * 组件的属性列表
   */
  properties: {
    // 验证码发送请求
    apiObj: {
      type: Object,
      value: async () => {}
    },
    // 输入框距离键盘的距离
    inputCursorSpacing: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 弹窗可见性
    visible: false,
    // 验证码
    captcha: '',
    // 倒计时
    countDown: 60,
    // 是否发送过验证码
    isCaptchaSend: false
  },
  /**
   * 组件的方法列表
   */
  methods: {
    /**
   * @description: 发送验证码
   * @return {*}
   */
    async sendCaptcha () {
      const { apiObj } = this.properties
      const { isCaptchaSend } = this.data
      const { userMobile: phone } = this.data.userStore
      if (isCaptchaSend) {
        showToast({
          title: '验证码已发送，请稍后'
        })
        return
      }
      // 手机号检查
      if (!verifyPhone(phone)) {
        showToast({
          title: '手机号格式不正确'
        })
        return
      }
      try {
        // 发送验证码
        await apiObj({
          phone,
          code: '',
          uuid: ''
        })
        // 验证码发送成功 并设置60秒定时器
        this.setData({
          isCaptchaSend: true
        }, () => {
          let timer: any
          clearInterval(timer)
          const TIME_COUNT = 60
          timer = setInterval(() => {
            const { countDown } = this.data
            if (countDown > 1 && countDown <= TIME_COUNT) {
              this.setData({
                countDown: countDown - 1
              })
            } else {
              if (timer) {
                clearInterval(timer)
              }
              clearInterval(timer)
              timer = null
              this.setData({
                isCaptchaSend: false,
                countDown: TIME_COUNT
              })
            }
          }, 1000)
        })
      } catch (error) {
        showToast({
          title: error.message || error.msg || '验证码发送失败'
        })
      }
    },
    /**
   * @description: 验证码输入事件
   * @param {object} e
   * @return {*}
   */
    onCaptchaInput (e: any) {
      const { value } = e.detail
      this.setData({
        captcha: value
      })
    },
    /**
   * @description: 清空验证码
   * @return {*}
   */
    onClearCaptcha () {
      this.setData({
        captcha: ''
      })
    },
    /**
     * @description: 显示dialog
     * @return {*}
     */
    showDialog () {
      this.setData({ visible: true })
    },
    /**
     * @description: 隐藏dialog
     * @return {*}
     */
    closeDialog () {
      this.setData({ visible: false })
    },
    /**
     * @description: 触发事件 确认
     * @return {*}
     */
    onConfirm () {
      // 检测captcha
      const { captcha } = this.data
      const captchaReg = /^[0-9]{4}$/
      if (!captchaReg.test(captcha)) {
        showToast({
          title: '验证码格式不正确'
        })
        return
      }
      this.triggerEvent('on-confirm', captcha)
      this.closeDialog()
    }
  }
})
