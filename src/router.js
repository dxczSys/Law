import Vue from 'vue'
import VueRouter from 'vue-router'
import cookie from 'vue-cookie'
import store from './store'
import * as types from './store/type'
import homeContent from './view/home'
import login from './view/login'


var router = new VueRouter({
    routes : [
        {
            path : '/',
            name : 'home',
            component : homeContent,
        },
        {
            path : '/login',
            name : 'login',
            component : login
        },
    ]
})
// 页面刷新时，重新赋值token
if (cookie.get('token')) {
    let num = (new Date().getTime() - parseInt(cookie.get('token'))) / 60000 
    if (num < 0.1) {
        store.commit(types.LOGIN, { username : cookie.get('username'), accout : new Date().getTime() })
    }else {
        store.commit(types.LOGOUT)
    }
}

//注册全局钩子用来拦截导航
   router.beforeEach((to, from, next) => {
    if (to.matched.some(r => r.meta.requiresAuth)) {
        if (store.state.token) {
            next();
        }else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}
            })
        }
    }else {
        next();
    }
})

export default router