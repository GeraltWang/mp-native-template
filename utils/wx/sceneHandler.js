/*
 * @Author: 王昶 wgeralt@outlook.com
 * @Date: 2023-04-26 09:37:51
 * @LastEditors: 王昶 wgeralt@outlook.com
 * @LastEditTime: 2023-04-26 10:52:10
 * @FilePath: /mp-native-template/utils/wx/sceneHandler.js
 * @Description: 场景处理
 */

/**
 * @description: SceneHandler 小程序场景处理类
 * @example: const sceneHandler = new SceneHandler()
 * @example: sceneHandler.setScene().getEnterOptions()
 * @return {*}
 */
class SceneHandler {
  constructor () {
    this.scene = null
    this.path = null
    this.query = {}
    this.shareTicket = null
    this.referrerInfo = {}
  }

  /**
   * @description: 设置场景值
   * @return {*}
   */
  setScene () {
    const enterOption = wx.getEnterOptionsSync()
    this.scene = enterOption.scene
    this.path = enterOption.path
    this.query = enterOption.query
    this.shareTicket = enterOption.shareTicket || ''
    return this
  }

  /**
   * @description: 获取进入小程序的场景值及其它参数
   * @return {object}
   */
  getEnterOptions () {
    return {
      scene: this.scene,
      sceneText: sceneFilter(this.scene),
      path: this.path,
      query: this.query,
      shareTicket: this.shareTicket,
      referrerInfo: this.referrerInfo
    }
  }

  /**
   * @description: 获取场景值
   * @return {*}
   */
  getScene () {
    return this.scene
  }

  /**
   * @description: 获取query参数
   * @return {object}
   */
  getQuery () {
    return this.query
  }

  /**
   * @description: 获取shareTicket
   * @return {string}
   */
  getShareTicket () {
    return this.shareTicket
  }

  /**
   * @description: 获取来源信息
   * @return {object}
   */
  getReferrerInfo () {
    return this.referrerInfo
  }
}

/**
 * @description: 场景值处理
 * @param {*} scene
 * @return {*}
 */
function sceneFilter (scene) {
  const sceneMap = {
    1001: '发现栏小程序主入口，“最近使用”列表',
    1005: '顶部搜索框的搜索结果页',
    1006: '发现栏小程序主入口搜索框的搜索结果页',
    1007: '单人聊天会话中的小程序消息卡片',
    1008: '群聊会话中的小程序消息卡片',
    1011: '扫描二维码',
    1012: '长按图片识别二维码',
    1013: '手机相册选取二维码',
    1014: '小程序模板消息',
    1017: '前往体验版的入口页',
    1019: '微信钱包',
    1020: '公众号 profile 页相关小程序列表',
    1022: '聊天顶部置顶小程序入口',
    1023: '安卓系统桌面图标',
    1024: '小程序 profile 页',
    1025: '扫描一维码',
    1026: '附近小程序列表',
    1027: '顶部搜索框搜索结果页“使用过的小程序”列表',
    1028: '我的卡包',
    1029: '卡券详情页',
    1030: '自动化测试下打开小程序',
    1031: '长按图片识别一维码',
    1032: '手机相册选取一维码',
    1034: '微信支付完成页',
    1035: '公众号自定义菜单',
    1036: 'App 分享消息卡片',
    1037: '小程序打开小程序',
    1038: '从另一个小程序返回',
    1039: '摇电视',
    1042: '添加好友搜索框的搜索结果页',
    1043: '公众号模板消息',
    1044: '带 shareTicket 的小程序消息卡片（详情)',
    1045: '朋友圈广告',
    1046: '朋友圈广告详情页',
    1047: '扫描小程序码',
    1048: '长按图片识别小程序码',
    1049: '手机相册选取小程序码',
    1052: '卡券的适用门店列表',
    1053: '搜一搜的结果页',
    1054: '顶部搜索框小程序快捷入口',
    1056: '音乐播放器菜单',
    1057: '钱包中的银行卡详情页',
    1058: '公众号文章',
    1059: '体验版小程序绑定邀请页',
    1064: '微信连Wi-Fi状态栏',
    1067: '公众号文章广告',
    1068: '附近小程序列表广告',
    1069: '移动应用',
    1071: '钱包中的银行卡列表页',
    1072: '二维码收款页面',
    1073: '客服消息列表下发的小程序消息卡片',
    1074: '公众号会话下发的小程序消息卡片',
    1077: '摇周边',
    1078: '连Wi-Fi成功页',
    1079: '微信游戏中心',
    1081: '客服消息下发的文字链',
    1082: '公众号会话下发的文字链',
    1084: '朋友圈广告原生页',
    1089: '微信聊天主界面下拉',
    1090: '长按小程序右上角菜单唤出最近使用历史',
    1091: '公众号文章商品卡片',
    1092: '城市服务入口',
    1095: '小程序广告组件',
    1096: '聊天记录',
    1097: '微信支付签约页',
    1099: '页面内嵌插件',
    1102: '公众号 profile 页服务预览',
    1103: '发现栏小程序主入口，“我的小程序”列表',
    1104: '微信聊天主界面下拉，“我的小程序”栏',
    1106: '聊天主界面下拉，从顶部搜索结果页，打开小程序',
    1107: '订阅消息，打开小程序',
    1113: '安卓系统桌面图标',
    1114: '小程序 profile 页，“关于小程序”列表',
    1124: '扫描小程序码',
    1125: '长按图片识别“一物一码”',
    1126: '扫描手机相册中选取的“一物一码”',
    1129: '微信爬虫访问',
    1131: '浮窗打开小程序',
    1133: '硬件设备打开小程序',
    1135: '小程序profile页相关小程序列表,打开小程序',
    1144: '公众号文章 - 视频贴片',
    1145: '发现栏 - 发现小程序',
    1146: '地理位置信息打开出行类小程序',
    1148: '卡包-交通卡，打开小程序'
  }
  return sceneMap[scene] || `${scene}: 未知场景`
}

export default new SceneHandler()
