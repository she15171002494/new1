// 配置路由信息
import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入组件
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

// 注册
Vue.use(VueRouter)

// 路由规则配置
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' }, //网页重定向
    { path: '/login', component: Login }, //hash(哈希值)去login页面
    { path: '/register', component: Register }, //hash(哈希值)去register
  ],
})

// 导出
export default router
