import dayjs from 'dayjs'
import sysConfig from '../config/index'

export const formatTime = (date, template) => dayjs(date).format(template)

/**
 * 格式化价格数额为字符串
 * 可对小数部分进行填充，默认不填充
 * @param price 价格数额，以分为单位!
 * @param fill 是否填充小数部分 0-不填充 1-填充第一位小数 2-填充两位小数
 */
export function priceFormat (price, fill = 0) {
  if (isNaN(price) || price === null || price === Infinity) {
    return price
  }

  let priceFormatValue = Math.round(parseFloat(`${price}`) * 10 ** 8) / 10 ** 8 // 恢复精度丢失
  priceFormatValue = `${Math.ceil(priceFormatValue) / 100}` // 向上取整，单位转换为元，转换为字符串
  if (fill > 0) {
    // 补充小数位数
    if (priceFormatValue.indexOf('.') === -1) {
      priceFormatValue = `${priceFormatValue}.`
    }
    const n = fill - priceFormatValue.split('.')[1]?.length
    for (let i = 0; i < n; i++) {
      priceFormatValue = `${priceFormatValue}0`
    }
  }
  return priceFormatValue
}

/**
 * 获取cdn裁剪后链接
 * @param {string} url 基础链接
 * @param {number} width 宽度，单位px
 * @param {number} [height] 可选，高度，不填时与width同值
 */
export const cosThumb = (url, width, height = width) => {
  if (url.indexOf('?') > -1) {
    return url
  }

  if (url.indexOf('http://') === 0) {
    url = url.replace('http://', 'https://')
  }

  return `${url}?imageMogr2/thumbnail/${~~width}x${~~height}`
}

export const get = (source, paths, defaultValue) => {
  if (typeof paths === 'string') {
    paths = paths
      .replace(/\[/g, '.')
      .replace(/\]/g, '')
      .split('.')
      .filter(Boolean)
  }
  const { length } = paths
  let index = 0
  while (source != null && index < length) {
    source = source[paths[index++]]
  }
  return source === undefined || index === 0 ? defaultValue : source
}
let systemWidth = 0
/** 获取系统宽度，为了减少启动消耗所以在函数里边做初始化 */
export const loadSystemWidth = () => {
  if (systemWidth) {
    return systemWidth
  }

  try {
    ({ screenWidth: systemWidth, pixelRatio } = wx.getSystemInfoSync())
  } catch (e) {
    systemWidth = 0
  }
  return systemWidth
}

/**
 * 转换rpx为px
 *
 * @description
 * 什么时候用？
 * - 布局(width: 172rpx)已经写好, 某些组件只接受px作为style或者prop指定
 *
 */
export const rpx2px = (rpx, round = false) => {
  loadSystemWidth()

  // px / systemWidth = rpx / 750
  const result = (rpx * systemWidth) / 750

  if (round) {
    return Math.floor(result)
  }

  return result
}

/**
 * 手机号码*加密函数
 * @param {string} phone 电话号
 * @returns
 */
export const phoneEncryption = (phone) => {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

/**
 * 银行卡号*加密函数
 * @param {string} bankNo 银行卡号
 * @returns
 */
export const bankEncryption = (bankNo) => {
  return bankNo.replace(/(\d{5})\d{6}(\d{5})/, '$1******$2')
}

/**
 * @description: 阿里云oss图片url自动补全 并转webp格式
 * @param {string} url
 * @return {*}
 */
export const wrapperUrl = (url = '') => {
  const checkUrl = url.startsWith('/') ? url : `/${url}`
  return `${sysConfig.ossBaseUrl}${checkUrl}?x-oss-process=image/format,webp`
}

/**
 * @description: 小程序sdk版本比较
 * @param {string} currentVersion 当前sdk版本
 * @param {string} targetVersion 目标sdk版本
 * @return {number} 0相同  1新版本 -1老版本
 */
export const compareSdkVersion = (currentVersion, targetVersion) => {
  currentVersion = currentVersion.split('.')
  targetVersion = targetVersion.split('.')
  const len = Math.max(currentVersion.length, targetVersion.length)

  while (currentVersion.length < len) {
    currentVersion.push('0')
  }
  while (targetVersion.length < len) {
    targetVersion.push('0')
  }

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(currentVersion[i])
    const num2 = parseInt(targetVersion[i])

    if (num1 > num2) {
      return 1
    } else if (num1 < num2) {
      return -1
    }
  }
  return 0
}

/**
 * @description: promise catch 处理promise异常，避免频繁使用try catch
 * @param {Promise} promise
 * @return {*}
 * @example
 * const [err, data] = await promiseCatch(promise)
 * if (err) {
 *  // do something
 * }
 * // do something
 */
export const promiseCatch = (promise) => {
  return promise.then((data) => [null, data]).catch((err) => [err])
}

/**
 * @description: promise sleep 等待函数
 * @param {number} t 等待时间
 * @return {*}
 */
export const sleep = async (t) => new Promise((resolve) => setTimeout(resolve, t))

/**
 * @description: formatNumber 千分位
 * @param {*} num
 * @return {*}
 * @example
 * formatNumber(123456789) // 123,456,789
 * formatNumber(123456789.123) // 123,456,789.123
 */
export function formatNumber (num) {
  num = num + ''
  if (!num.includes('.')) {
    num += '.'
  }
  return num
    .replace(/(\d)(?=(\d{3})+\.)/g, function ($0, $1) {
      return $1 + ','
    })
    .replace(/\.$/, '')
}

/**
 * @description: formatNumberRound 四舍五入并保留两位小数
 * @param {number} num
 * @return {*}
 */
export function formatNumberRound (num) {
  return (Math.round(num * 100) / 100).toFixed(2)
}

/**
 * @description: handleNumber 处理数字，四舍五入并保留两位小数，最后转成千分位
 * @param {*} num
 * @return {*}
 */
export function handleNumber (num) {
  if (num === 0) {
    return formatNumberRound(num)
  } else {
    const round = formatNumberRound(num)
    const format = formatNumber(round)
    return format
  }
}
