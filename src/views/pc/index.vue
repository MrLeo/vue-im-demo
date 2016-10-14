<template>
    <div class="main">
        <div class="top-menu clearfix">
            <span>IM</span>
            <span>
                <span v-text="me.userName"></span>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="javascript:;"
                                                                              @click="doLogout">退出</a>
            </span>
        </div>
        <ul class="user-list">
            <li v-for="item in online.users" track-by="$index" @click='chat(item)'
                :class="{'v-link-active':item.userId==currentActive}">
                {{item.userName}} <span class="noread" v-if="item.noRead">{{item.noRead}}</span>
            </li>
        </ul>
        <div class="doc">
            <router-view keep-alive></router-view>
        </div>
    </div>
</template>
<script>
    import users from '_vuex/modules/users'
    import base from '_vuex/modules/base'
    import * as actions from '_vuex/actions'

    import io from 'socket.io-client'
    import common from 'utils/common'

    export default{
        name: 'index',
        vuex: {
            getters: {
                me: ({users})=>users.me,
                online: ({users})=>users.online,
                socket: ({base})=>base.socket
            },
            actions: {
                login: actions.login,
                updateUsers: actions.updateUsers,
                addUsers: actions.addUsers,
                removeUser: actions.removeUser,
                logout: actions.logout,
                addReceiveMsg: actions.addReceiveMsg
            }
        },
        data(){
            return {
                currentActive: '-1'
            }
        },
        created(){
            if (!this.me.userName) {
                router.go({name: 'pclogin'})
            }
            this.listenLogin()
            this.listenLogout()
            this.listenMsg()
        },
        ready(){
        },
        methods: {
            doLogout(){
                this.socket.disconnect();
                this.logout()
                router.go({path: '/pc/login'})
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
            //监听消息发送
            listenMsg(){
                const _self = this
                if (_self.socket) {
                    _self.socket.on(_self.me.userId, function (obj) {
                        console.log('[Leo]有人对我说话 => ', obj.from.userName + " 对 " + obj.to.userName + " 说 " + obj.content)
                        _self.addReceiveMsg(obj)
                    })
                }
            },
            chat(user){
                this.currentActive = user.userId
                router.go({
                    name: 'pcChat',
                    params: {
                        id: user.userId,
                        name: user.userName
                    }
                })
            }
        }
    }
</script>
<style lang="less" scoped>
    .main {
        position: relative;
        top: 50%;
        left: 50%;
        width: 800px;
        height: 600px;
        border: 1px solid #efefef;
        box-shadow: 1px 1px 15px #ccc;
        background-color: #efeff4;
        -moz-transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        overflow: hidden;
    }

    .top-menu {
        background-color: #3d3d3d;
        color: #fff;
        height: 45px;
        width: 100%;
        font-size: 12px;
        line-height: 45px;
        font-size: larger;
        font-family: "Microsoft YaHei UI", "微软雅黑", "Helvetica Neue", Helvetica, STHeiTi, sans-serif;

    span:first-child {
        text-align: left;
        margin-left: 10px;

    &
    +
    span {
        float: right;
        margin-right: 10px;
    }

    }

    a {
        color: #ffffff;
        text-decoration: none;
    }

    }

    ul, li {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .user-list {
        position: absolute;
        top: 45px;
        bottom: 0;
        left: 0;
        z-index: 9999999;
        width: 300px;
        overflow-y: auto;
        background-color: #fff;
        box-shadow: 3px 2px 5px #CCC;
    @height: 30 px;

    li {
        padding: 10px;
        line-height: @height;
        cursor: pointer;
        border-bottom: 1px dashed #efefef;

    img {
        float: left;
        width: @height;
        border-radius: 50%;
    }

    &
    :hover,

    &
    :active {
        background: #efefef;
    }

    .noread {
        float: right;
        display: inline-block;
        background-color: #f00;
        color: #fff;
        min-width: 20px;
        height: 20px;
        border-radius: 50%;
        font-size: 12px;
        line-height: 20px;
        text-align: center;
    }

    }
    }

    .doc {
        position: absolute;
        top: 45px;
        bottom: 0;
        left: 300px;
        right: 0;
    }

    .v-link-active {
        background-color: #efefef;
    }
</style>
