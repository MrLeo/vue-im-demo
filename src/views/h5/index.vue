<template>
    <div>
        <div class="_full full-index">
            <page-header>
                <span slot="header-title">聊天</span>
                <i slot="left-btn" class="fa fa-sign-out" aria-hidden="true" @click="doLogout"></i>
            </page-header>
            <div class="page-content">
                <ul class="user-list">
                    <li class="_line-fine" v-for="(item,index) in online.users" :key="index" @click="chat(item)">
                        <div class="info clearfix">
                            <div class="ico-box">
                                <i class="news-count" v-text="item.noRead" v-show="item.noRead>0"></i>
                                <div class="ico">
                                    <img src="/static/logo.png">
                                </div>
                            </div>
                            <div class="desc">
                                <div class="desc-time"
                                     v-text="fmtDate(item,'hh:mm')"></div>
                                <div class="desc-title" v-text="item.userName"></div>
                                <div class="desc-message" v-show="item.noRead>0">
                                    <span v-text="item.msg&&item.msg.length>0&&item.msg[item.msg.length-1].content"></span>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
    import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
    import * as types from '../../store/mutation-types'

    import io from 'socket.io-client'
    import common from '../../utils/common'
    import {DateFormat, getLocalTime} from '../../utils/convert/date'

    import pageHeader from 'components/h5/page-header'
    export default{
        name: 'index',
        components: {
            pageHeader
        },
        computed: {
            ...mapState({
                me: state=>state.users.me,
                online: state=>state.users.online,
                socket: ({base})=>base.socket
            }),
            ...mapGetters({})
        },
        methods: {
            ...mapActions([]),
            ...mapMutations({
                logout: types.LOGOUT,
                updateUsers: types.UPDATE_USERS,
                addUsers: types.ADD_USERS,
                removeUser: types.REMOVE_USER,
                logout: types.LOGOUT,
                addReceiveMsg: types.ADD_RECEIVE_MSG,
                addRemind: types.ADD_REMIND,
                removeRemind: types.REMOVE_REMIND
            }),
            fmtDate(item, fmt){
                return item.msg && item.msg.length > 0 && item.msg[item.msg.length - 1].sendtime ? DateFormat(getLocalTime(item.msg[item.msg.length - 1].sendtime), fmt) : ''
            },
            doLogout(){
                this.socket.disconnect()
                this.logout()
                router.push('/h5/login')
            },
            //监听新用户登录
            listenLogin(){
                const _self = this
                if (_self.socket) {
                    _self.socket.on('login', function (o) {
                        console.log('[Leo]新用户加入 => ', o.user)
                        console.log('[Leo]当前在线用户 => ', o.onlineUsers)
                        _self.updateUsers(o.onlineUsers)
                    })
                }
            },
            //监听用户退出
            listenLogout(){
                const _self = this
                if (_self.socket) {
                    _self.socket.on('logout', function (o) {
                        console.log('[Leo]有用户退出 => ', o)
                        _self.removeUser(o.user.userId)
                    })
                }
            },
            //监听消息新发送
            listenMsg(){
                const _self = this
                if (_self.socket) {
                    _self.socket.on(_self.me.userId, function (obj) {
                        console.log('[Leo]有人对我说话 => ', obj.from.userName + " 对 " + obj.to.userName + " 说 " + obj.content)
                        _self.addReceiveMsg(obj)
                        if (_self.$route.params.id != obj.from.userId)
                            _self.addRemind(obj)
                    })
                }
            },
            chat(user){
                const _self = this
                _self.removeRemind(user)
                router.push({
                    name: 'h5chat',
                    params: {
                        "id": user.userId,
                        "name": user.userName
                    }
                })
            }
        },
        created(){
            if (!this.me.userName) {
                router.push('/h5/login')
            }
            this.listenLogin()
            this.listenLogout()
            this.listenMsg()
        }
    }
</script>
<style lang="scss" scoped src="assets/css/h5index.scss"></style>
