import { BehaviorWithStore } from 'mobx-miniprogram-bindings'

import { global } from '../../store/global'

export const globalBehavior = BehaviorWithStore({
  storeBindings: [
    {
      namespace: 'globalStore',
      store: global,
      fields: ['location'],
      actions: ['updateLocation']
    }
  ]
})
