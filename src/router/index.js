/**
 * @Date: 2016/10/20  0020  21:50
 * @Author: lxbin
 *
 * Created with JetBrains WebStorm.
 */

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import index from 'views/index.vue'

export default new Router({
    base: '/',//应用的基路径
    mode: 'hash', //"hash" (URL hash 模式) | "history"(HTML5 History 模式) | "abstract" (Node.js 环境)
    //scrollBehavior (to, from, savedPosition) {//路由切换的滚动行为，只在 HTML5 history 模式下可用
    //    if (savedPosition) {
    //        return savedPosition
    //    } else {
    //        return {x: 0, y: 0}
    //    }
    //},
    routes: [
        //{path: '/index', component: r => require.ensure([], () => r(require('views/index.vue')), 'group-index')},//异步组件分组
        //{path: '/', component: r => require.ensure(['views/Foo.vue'], () => r(require('views/Foo.vue')))},// Webpack 风格的异步组件
        //{path: '/', component: resolve => require(['views/index.vue'], resolve)},// AMD 风格的异步组件
        {
            name: 'index',
            path: '/',
            component: index,
            children: [{
                name: 'map',
                path: 'map',
                component: resolve=>require(['views/map.vue'], resolve)
            }, {
                name: 'list',
                path: 'list',
                component: resolve=>require(['views/indexList.vue'], resolve)
            }]
        }, {
            name: 'search-more',
            path: '/search/more',
            component: resolve=>require(['views/moreSearch.vue'], resolve)
        },
        {path: '/', redirect: '/map'}
    ]
})