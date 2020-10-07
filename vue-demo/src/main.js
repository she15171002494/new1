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

// 注册全局组件
Vue.component('hm-header', HmHeader)
Vue.component('hm-logo', HmLogo)
Vue.component('hm-button', HmButton)

// 构造vue实例
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
