import Vue from 'vue'
import Vuex from 'vuex'

// 导入各个模块的初始状态和 mutations
import base from './modules/base'
import users from './modules/users'
import chat from './modules/chat'

Vue.use(Vuex)

export default new Vuex.Store({
    // 组合各个模块
    modules: {
        base,
        users,
        chat
    }
})
