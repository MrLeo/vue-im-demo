//https://github.com/vuejs/vuex/tree/dev/examples/shopping-cart/store

import Vue from "vue";
import Vuex from "vuex";
import * as actions from './actions'
import * as getters from './getters'
import base from './modules/base'
import users from './modules/users'
//import createLogger from 'vuex/dist/logger' //vuex内置的Logger日志插件
//const debug = process.env.NODE_ENV !== 'production' //发布产品时需要用 Webpack 的 DefinePlugin 来转换 process.env.NODE_ENV !== 'production' 的值为 false

Vue.use(Vuex)

export default new Vuex.Store({
    actions,
    getters,
    modules: {
        base,
        users
    },
    //strict: debug,//TODO:开发阶段使用
    //plugins: debug ? [createLogger()] : []//vuex插件
})

//热重载
//if (module.hot) {
//    // 使 mutations，modules ，actions 和 getters 成为可热重载模块
//    module.hot.accept([
//        './actions',
//        './getters'
//    ], () => {
//        // 获取更新后的模块
//        // 因为 babel 6 的模块编译格式问题，这里需要加上 .default
//        // 成新的 mutation 和 mudule
//        store.hotUpdate({
//            actions: require('./actions').default,
//            getters: require('./getters').default
//        })
//    })
//}