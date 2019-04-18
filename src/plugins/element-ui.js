import Vue from 'vue'

import {
  Input,
  Button,
  Message
} from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Input)
Vue.use(Button)
Vue.use(Message)

Vue.prototype.$message = Message
