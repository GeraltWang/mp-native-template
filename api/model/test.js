import { http } from '../index'

export const getOpenId = (data = {}) => http.post({
  url: '/mini/get-open-id',
  data,
  options: { needLoading: true }
})

export const getMemberInfo = (data = {}) => http.post({
  url: '/mini/member-info',
  data,
  options: { needLoading: false }
})
