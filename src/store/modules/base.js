import Vue from 'vue'
import * as types from '../mutation-types'

//状态数据源
const state = {
    $vm: new Vue(),
    socket: null
}

//注册事件，提交(commit)状态改变
//必须是《同步》事务
const mutations = {
    [types.SET_SOCKET](state, socket){
        Vue.set(state, 'socket', socket)
    }
}

export default {
    state,
    mutations
}
