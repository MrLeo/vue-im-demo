import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import {
    configRouter
} from './config_router'
import infiniteScroll from 'vue-infinite-scroll'
import VueTouch from 'vue-touch'
import filter from './filter'

/**
 * 注册插件
 */
Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(infiniteScroll)
Vue.use(VueTouch)
Vue.use(filter)

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