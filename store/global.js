import { observable, action } from 'mobx-miniprogram'
import storage from '../utils/wx/storage'

export const global = observable({
  location: null,
  updateLocation: action(function (data = {}) {
    this.location = data
    storage.local.set('GLOBAL_LOCATION', this.location)
  })
})
