import fetch from '../config/fetch'

export const login = params => fetch({
  url: '/signIn',
  params: params,
  method: 'post'
})

export const regist = params => fetch({
  url: '/regist',
  params: params,
  method: 'post'
})
