import Vue from 'vue'
import App from './App'
import filter from './filter'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import {
    configRouter
} from './config_router'
import infiniteScroll from 'vue-infinite-scroll'
import VueTouch from 'vue-touch'
import VueTimeago from 'vue-timeago'

/**
 * 注册插件
 */
Vue.use(filter)
Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(infiniteScroll)
Vue.use(VueTouch)
Vue.use(VueTimeago, {
    name: 'timeago', // component name, `timeago` by default
    autoUpdate: 1,
    maxTime: 86400,
    locale: 'zh-CN',
    locales: {
        'en-US': require('vue-timeago/locales/en-US.json'),
        'zh-CN': require('vue-timeago/locales/zh-CN.json')
    }
})

/**
 * 路由配置
 */
Vue.config.debug = true
var router = new VueRouter({
    //root:'/live',
    hashbang: true,
    history: false,
    saveScrollPosition: true,
    suppressTransitionError: false // TODO：开发环境
    //suppressTransitionError: true // TODO：生产环境
})
window.router = router
configRouter(router)
router.start(App, 'app')