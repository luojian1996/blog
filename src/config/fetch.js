import { baseUrl } from './evn'
import Axios from 'axios'
import qs from 'qs'

const service = Axios.create({
  baseURL: baseUrl,
  transformRequest: [function (data) {
    console.log(data)
    return qs.stringify(data)
  }]
})

export default service
