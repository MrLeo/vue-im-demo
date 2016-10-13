/**
 * @Date: 2016/10/8  0008  11:58
 * @Author: lxbin
 *
 * Created with JetBrains WebStorm.
 */

import * as types from '../mutation-types'
import common from 'utils/common'

const state = {
    socket: null
}

const mutations = {
    [types.SET_SOCKET](state, socket){
        state.socket = socket
        return socket
    }
}

export default {
    state,
    mutations
}