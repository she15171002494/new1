// 配置vue
import Vue from 'vue'
import App from './App.vue'

// 引入公共样式
import './assets/base.less'

// 引入字体图标
import './assets/iconfont.css'

// 自动适配所用屏幕
import 'lib-flexible'

// 导入路由对象
import router from './router'

// 引入子组件
import HmHeader from './components/HmHeader.vue'
import HmLogo from './components/HmLogo.vue'
import HmButton from './components/HmButton.vue'
import HmPost from './components/HmPost.vue'
import HmComment from './components/HmComment.vue'
import HmFloor from './components/HmFloor.vue'

// 注册全局组件
Vue.component('hm-header', HmHeader)
Vue.component('hm-logo', HmLogo)
Vue.component('hm-button', HmButton)
Vue.component('hm-post', HmPost)
Vue.component('hm-comment', HmComment)
Vue.component('hm-floor', HmFloor)

// 引入vant组件里面的输入框
import { Field } from 'vant'
Vue.use(Field)

// 引入vant组件里面的轻提示
import { Toast } from 'vant'
Vue.use(Toast)

// 引入vant组件里面的
import { Cell, CellGroup } from 'vant'
Vue.use(Cell)
Vue.use(CellGroup)

// 引入 vant 组件里面的确认弹框
import { Dialog } from 'vant'
Vue.use(Dialog)

// 单选框
import { RadioGroup, Radio } from 'vant'
Vue.use(Radio)
Vue.use(RadioGroup)

// 上传文件
import { Uploader } from 'vant'
Vue.use(Uploader)

// list列表
import { List } from 'vant'
Vue.use(List)

// tab 栏
import { Tab, Tabs } from 'vant'
Vue.use(Tab)
Vue.use(Tabs)

// 下拉刷新
import { PullRefresh } from 'vant'
Vue.use(PullRefresh)

// 粘性布局
import { Sticky } from 'vant'
Vue.use(Sticky)

// icon图标
import { Icon } from 'vant'
Vue.use(Icon)

// 注册全局 axios
import axios from 'axios'
// 添加基准/基础地址
axios.defaults.baseURL = 'http://localhost:3000'
Vue.prototype.$axios = axios

// 注册一个全局时间过滤器
import moment from 'moment'
Vue.filter('date', function(val, format = 'YYYY-MM-DD') {
  return moment(val).format(format)
})

// bus 事件总线
let bus = new Vue()
Vue.prototype.$bus = bus

// 添加请求拦截器
axios.interceptors.request.use(function(config) {
  let token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

// 添加响应拦截器
// axios.interceptors.response.use(function(res) {
//   let { statusCode, message } = res.data
//   if (statusCode === 200 && message === '用户信息验证失败') {
//     // 删除 token + id
//     localStorage.remover('token')
//     localStorage.remover('user_id')
//     // 跳转
//     this.$router.push('/login')
//   }
//   return res
// })

// 构造vue实例
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
