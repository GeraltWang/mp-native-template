import { http } from '../index'

export const getOpenId = async (data = {}) => http.post({
  url: '/mini/get-open-id',
  data,
  options: { needLoading: true }
})

export const getMemberInfo = async (data = {}) => http.post({
  url: '/mini/member-info',
  data,
  options: { needLoading: false }
})
