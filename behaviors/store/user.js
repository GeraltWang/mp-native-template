import { BehaviorWithStore } from 'mobx-miniprogram-bindings'

import { user } from '../../store/user'

export const userBehavior = BehaviorWithStore({
  storeBindings: [
    {
      namespace: 'userStore',
      store: user,
      fields: ['userInfo', 'openid'],
      actions: ['updateUserInfo', 'updateOpenid']
    }
  ]
})
