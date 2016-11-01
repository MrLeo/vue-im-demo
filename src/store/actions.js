/**
 * action 不改变状态，只提交(commit) mutation
 * action 可以包含任意《异步》操作。
 * @param state
 */

import * as types from './mutation-types'
import api from './api'

export const initSearchInfo = ({commit, state}, info)=> {
    //区域
    api.getQuYuList(info || '').then(res=> {
        if (res.returnCode == '00')
            commit(types.SET_QUYU_LIST, res.list || {})
        else
            console.warn('[Leo]getQuYuList => ', res.messageInfo)
    }).catch(error=> {
        console.warn('[Leo]getQuYuList => ', error)
    })
    //地铁
    api.getDiTieList(info || '').then(res=> {
        if (res.returnCode == '00')
            commit(types.SET_DITIE_LIST, res.list || {})
        else
            console.log('[Leo]getDiTieList => ', res.messageInfo)
    }).catch(error=> {
        console.warn('[Leo]getDiTieList => ', error)
    })
    //类型
    api.getTypeList(info || '').then(res=> {
        if (res.returnCode == '00')
            commit(types.SET_TYPE_LIST, JSON.parse(res).list || {})
        else
            console.log('[Leo]getTypeList => ', res.messageInfo)
    }).catch(error=> {
        console.warn('[Leo]getTypeList => ', error)
    })
    //地图
    api.getMap(info || '').then(res=> {
        if (res.returnCode == '00')
            commit(types.SET_MAP_LIST, res.list || {})
        else
            console.log('[Leo]getMap => ', res.messageInfo)
    }).catch(error=> {
        console.warn('[Leo]getMap => ', error)
    })
}


/**
 * 用统一的函数处理并分发mutations。
 * @param type
 * @returns {function({dispatch: *}, ...[*]): *}
 */
function makeAction(type) {
    return ({dispatch, state}, ...args) => commit(type, ...args)
}
//base action
export const setSocket = makeAction(types.SET_SOCKET)
//user actions
export const login = makeAction(types.LOGIN)
export const logout = makeAction(types.LOGOUT)
export const updateUsers = makeAction(types.UPDATE_USERS)
export const addUsers = makeAction(types.ADD_USERS)
export const removeUser = makeAction(types.REMOVE_USER)
export const genUid = makeAction(types.GEN_UID)
export const addSendMsg = makeAction(types.ADD_SEND_MSG)
export const addReceiveMsg = makeAction(types.ADD_RECEIVE_MSG)
export const addRemind = makeAction(types.ADD_REMIND)
export const removeRemind = makeAction(types.REMOVE_REMIND)
