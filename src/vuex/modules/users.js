import * as types from '../mutation-types'

const state = {
    me: {
        userName: null,
        userId: null,
        loginDate: '',
        lastSendDate: ''
    },
    online: {
        count: 0,
        users: []
    },
    allMsgRemind: []
}

const mutations = {
    [types.LOGIN](state, info) {
        state.me.userId = info.userId;
        state.me.userName = info.userName;
        state.me.loginDate = new Date();
        return state.me
    },
    [types.UPDATE_USERS](state, users) {
        console.log('[Leo]UPDATE_USERS => ', users)
        for (let user of users) {
            if (!user.msg)user.msg = []
            if (!user.noRead)user.noRead = 0
        }
        state.online.users.splice(0, state.online.users.length)
        for (let user of users) {
            if (user.userId == state.me.userId) continue
            //state.online.users.$set(users)
            state.online.users.push(user)
        }
    },
    [types.ADD_USERS](state, list) {
        console.log('[Leo]ADD_USERS => ', list)
        for (let user of list) {
            if (state.online.users.hasOwnProperty(user)) continue
            if (user.userId == state.me.userId) continue

            user.msg = user.msg && []
            user.noRead = user.noRead && 0

            if (!state.online.users.length) {
                state.online.users.push(user)
            } else {
                for (let online of state.online.users) {
                    if (online.userId != user.userId) {
                        state.online.users.push(user)
                    }
                }
            }
        }
    },
    [types.REMOVE_USER](state, userId) {
        let removedUser = null
        //let users = state.online.users
        //for (let i in users) {
        //    if (users[i] && users[i].userId == userId) {
        //        removedUser = users[i]
        //        console.log('[Leo]REMOVE_USER => ', users[i])
        //        state.online.users.splice(i, 1)
        //    }
        //}
        for (let [index,user] of state.online.users.entries()) {
            if (user && user.userId == userId) {
                removedUser = user
                console.log('[Leo]REMOVE_USER => ', user)
                state.online.users.splice(index, 1)
            }
        }
        return removedUser
    },
    [types.LOGOUT](state) {
        console.log('[Leo]LOGOUT => ', state.me)
        let userId = state.me.userId

        state.me.userName = null
        state.me.userId = null

        return userId
    },
    [types.ADD_SEND_MSG](state, msg){
        console.log('[Leo]我发出的消息 => ', msg)
        for (let user of state.online.users) {
            if (user.userId != msg.to.userId)continue
            if (!user.msg)user.msg = []
            user.msg.push(msg)
        }
    },
    [types.ADD_RECEIVE_MSG](state, msg){
        console.log('[Leo]我收到的消息 => ', msg)
        for (let user of state.online.users) {
            if (user.userId != msg.from.userId)continue
            if (!user.msg)user.msg = []
            user.msg.push(msg)
            user.noRead++
            break
        }
    },
    [types.ADD_REMIND](state, msg){
        state.allMsgRemind.push(msg)
    },
    [types.REMOVE_REMIND](state, user){
        for (let [index,remind] of state.allMsgRemind.entries()) {
            if (remind.from.userId == user.userId) {
                state.allMsgRemind.splice(index, 1)
            }
        }
    }
}

export default {
    state,
    mutations
}
