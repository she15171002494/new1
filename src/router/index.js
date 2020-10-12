// 配置路由信息
import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入组件
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import User from '../views/User.vue'
import Edit from '../views/Edit.vue'

// 注册
Vue.use(VueRouter)

// 路由规则配置
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' }, //网页重定向
    { path: '/login', name: 'login', component: Login }, //hash(哈希值)去login页面
    { path: '/register', name: 'register', component: Register }, //hash(哈希值)去register
    { path: '/user', name: 'user', component: User }, //个人中心主页
    { path: '/edit', name: 'edit', component: Edit }, //编辑资料
  ],
})

// 设置全局前置守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/user') {
    let token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

// 导出
export default router
