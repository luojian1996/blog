const routerMode = 'hash'

const urlArray = [
  'http://localhost:8081/api/'
]

const baseUrl = process.env.NODE_ENV !== 'production' ? urlArray[0] : ''

export {
  baseUrl,
  routerMode
}
