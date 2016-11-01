import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import * as filters from './filters'

// ajax插件（fetch）
// https://github.com/github/fetch
import 'whatwg-fetch'

import VueTimeago from 'vue-timeago'
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

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

Vue.config.devtools = true//TODO：开发阶段使用

window.router = router

//将服务端渲染时候的状态写入vuex
//if(window.__INITIAL_STATE__){
//    store.replaceState(window.__INITIAL_STATE__)
//}

const app = new Vue({
    router,
    store,
    ...App // Object spread copying everything from App.vue : render: h => h(App)
}).$mount('#app')//挂载到DOM元素

export {app, store, router}

/* eslint-disable no-new */
//new Vue({
//    el: '#app',
//    template: '<App/>',
//    components: {App}
//})
