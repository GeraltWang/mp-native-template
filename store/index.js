import { configure } from 'mobx-miniprogram'

// 引入模型
export { user } from './user'

// 通过配置强制程序使用action 函数更改应用程序中的状态
configure({ enforceActions: 'observed' })
