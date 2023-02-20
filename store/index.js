/*
 * @Author: 王昶 wgeralt@outlook.com
 * @Date: 2023-02-13 13:35:42
 * @LastEditors: 王昶 wgeralt@outlook.com
 * @LastEditTime: 2023-02-20 15:19:48
 * @FilePath: /mp-native-template/store/index.js
 * @Description:
 */
import { configure } from 'mobx-miniprogram'

// 引入模型
export { user } from './user'
export { global } from './global'

// 通过配置强制程序使用action 函数更改应用程序中的状态
configure({ enforceActions: 'observed' })
