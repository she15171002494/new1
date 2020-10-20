// 配置路由信息
import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入组件
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import User from '../views/User.vue'
import Edit from '../views/Edit.vue'
import MyFollows from '../views/MyFollows.vue'
import MyComments from '../views/MyComments.vue'
import MyStar from '../views/MyStar.vue'
import Home from '../views/Home.vue'
import Detail from '../views/Detail.vue'

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
    { path: '/myfollows', name: 'myfollows', component: MyFollows }, //我的关注
    { path: '/mycomments', name: 'mycomments', component: MyComments }, //我的跟帖
    { path: '/mystar', name: 'mystar', component: MyStar }, //我的收藏
    { path: '/home', name: 'name', component: Home }, //首页
    { path: '/detail/:id', name: 'detail', component: Detail },
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
