/**
 * @Date: 2016/10/20  0020  21:50
 * @Author: lxbin
 *
 * Created with JetBrains WebStorm.
 */

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    base: '/',//应用的基路径
    mode: 'history', //"hash" (URL hash 模式) | "history"(HTML5 History 模式) | "abstract" (Node.js 环境)
    scrollBehavior (to, from, savedPosition) {//路由切换的滚动行为，只在 HTML5 history 模式下可用
        if (savedPosition) {
            return savedPosition
        } else {
            return {x: 0, y: 0}
        }
    },
    routes: [
        //{path: '/index', component: r => require.ensure([], () => r(require('views/index.vue')), 'group-index')},//异步组件分组
        //{path: '/', component: r => require.ensure(['views/Foo.vue'], () => r(require('views/Foo.vue')))},// Webpack 风格的异步组件
        //{path: '/', component: resolve => require(['views/index.vue'], resolve)},// AMD 风格的异步组件
        {
            path: '/h5/login',
            name: 'h5login',
            title: 'h5端登录',
            component: resolve => require(['views/h5/login'], resolve)
        }, {
            path: '/h5/index',
            name: 'h5index',
            title: 'h5端首页',
            component: resolve => require(['views/h5/index'], resolve),
            children: [{
                path: '/chat/:id/:name',
                name: 'h5chat',
                title: 'h5端对话框',
                component: resolve => require(['views/h5/chat'], resolve)
            }]
        },{
            path: '/pc/login',
            name: 'pclogin',
            title: 'pc端登录',
            component: resolve => require(['views/pc/login'], resolve)
        }, {
            path: '/pc/index',
            name: 'pcindex',
            title: 'pc端首页',
            component: resolve => require(['views/pc/index'], resolve),
            children: [{
                path: '/chat/:id/:name',
                name: 'pcchat',
                title: 'h5端对话框',
                component: resolve => require(['views/pc/chat'], resolve)
            }]
        },
        //{path: '/', redirect: '/index'}
        {
            path: '*', redirect: '/h5/login'
        }
    ]
})