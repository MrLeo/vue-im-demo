<template>
    <!--<div class="msg-remind">-->
    <!--<ul>-->
    <!--<li v-for="remind in allMsgRemind" track-by="$index"-->
    <!--@click="chat({'userId':remind.id,'userName':remind.name})">-->
    <!--<span v-text="remind.name"></span>-->
    <!--<em v-text="remind.noRead"></em>-->
    <!--</li>-->
    <!--</ul>-->
    <!--</div>-->
    <div class="_full full-index">
        <page-header>
            <span slot="header-title">IM</span>
            <i slot="left-btn" class="fa fa-sign-out" aria-hidden="true" @click="doLogout"></i>
        </page-header>
        <div class="page-content">
            <ul class="user-list">
                <li class="_line-fine" v-for="item in online.users" track-by="$index" @click="chat(item)">
                    <div class="info clearfix">
                        <div class="ico-box">
                            <i class="news-count" v-text="item.noRead" v-show="item.noRead>0"></i>
                            <div class="ico">
                                <img src="/static/logo.png">
                            </div>
                        </div>
                        <div class="desc">
                            <div class="desc-time"
                                 v-text="item.msg&&item.msg.length>0&&item.msg[item.msg.length-1].sendtime | fmtDate 'hh:mm'"></div>
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
</template>
<script>
    import pageHeader from 'components/h5/page-header'

    import users from '_vuex/modules/users'
    import base from '_vuex/modules/base'
    import * as actions from '_vuex/actions'

    import io from 'socket.io-client'
    import common from 'utils/common'

    export default{
        name: '',
        components: {
            pageHeader
        },
        vuex: {
            getters: {
                me: ({users})=>users.me,
                online: ({users})=>users.online,
                allMsgRemind: ({users})=>users.allMsgRemind,
                socket: ({base})=>base.socket
            },
            actions: {
                login: actions.login,
                updateUsers: actions.updateUsers,
                addUsers: actions.addUsers,
                removeUser: actions.removeUser,
                logout: actions.logout,
                addReceiveMsg: actions.addReceiveMsg,
                addRemind: actions.addRemind,
                removeRemind: actions.removeRemind
            }
        },
        created(){
            if (!this.me.userName) {
                router.go({path: '/h5/login'})
            }
            this.listenLogin()
            this.listenLogout()
            this.listenMsg()
        },
        methods: {
            doLogout(){
                this.socket.disconnect()
                this.logout()
                router.go({path: '/h5/login'})
            },
            //监听新用户登录
            listenLogin(){
                const _self = this
                if (_self.socket) {
                    console.log('[Leo]new user login => ',)
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
                router.go({
                    name: 'h5Chat',
                    params: {
                        "id": user.userId,
                        "name": user.userName
                    }
                })
            }
        }
    }
</script>
<style lang="scss" scoped src="assets/css/h5index.scss"></style>
