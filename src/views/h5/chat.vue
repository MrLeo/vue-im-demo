/**
* @Date: 2016/10/11  0011  17:51
* @Author: lxbin
* Created with JetBrains WebStorm.
*/
<template>
    <div class="_full full-chat push-in">
        <page-header>
            <i slot="left-btn" class="fa fa-chevron-left" aria-hidden="true" @click="goBack"
               v-text="allMsgRemind.length>0?'('+allMsgRemind.length+')':''"></i>
            <span slot="header-title">聊天</span>
        </page-header>
        <div class="page-content">
            <ul>
                <li v-for="msg in getMsgs">
                    <msg-item :type="msg.from.userId==me.userId?'me':'other'" :msg="msg"></msg-item>
                </li>
            </ul>
        </div>
        <footer>
            <input type="text" class="msg-input" placeholder="请输入聊天内容" v-model="content" @keyup.13="submit" autofocus
                   v-el:msg-input>
        </footer>
    </div>
</template>
<script>
    import base from '_vuex/modules/base'
    import users from '_vuex/modules/users'
    import * as actions from '_vuex/actions'
    import msgItem from 'components/msg-item'
    import pageHeader from 'components/h5/page-header'

    import jx_common from 'utils/jx/common'
    import io from 'socket.io-client'
    export default{
        name: 'h5chat',
        components: {pageHeader, msgItem},
        vuex: {
            getters: {
                me: ({users})=>users.me,
                users: ({users})=>users.online.users,
                allMsgRemind: ({users})=>users.allMsgRemind,
                socket: ({base})=>base.socket
            },
            actions: {
                addSendMsg: actions.addSendMsg
            }
        },
        data(){
            return {
                content: ''
            }
        },
        ready(){
            const _self = this
            _self.scrollToBottom()
            _self.$nextTick(()=> {
                _self.$els.msgInput.focus()
            })
        },
        computed: {
            getMsgs(){
                const _self = this
                let msgs = []
                for (let user of _self.users) {
                    if (user.userId != _self.$route.params.id)continue
                    if (user.msg)msgs = user.msg
                    user.noRead = 0
                    break
                }
                return msgs
            }
        },
        methods: {
            goBack(){
                router.go('/h5/index')
            },
            //让浏览器滚动条保持在最低部
            scrollToBottom: function () {
                //window.scrollTo(0, document.querySelectorAll('.list ul')[0].clientHeight)
                window.document.querySelectorAll('.page-content')[0].scrollTop = document.querySelectorAll('.page-content ul')[0].clientHeight
            },
            //提交聊天消息内容
            submit () {
                const _self = this
                const toUserId = _self.$route.params.id
                console.log('[Leo]消息内容 => ', _self.content)
                if (_self.content != '') {
                    var obj = {
                        "from": {
                            "userId": _self.me.userId,
                            "userName": _self.me.userName
                        },
                        "to": {
                            "userId": toUserId,
                            "userName": _self.$route.params.name
                        },
                        "content": _self.content,
                        "sendtime": (new Date()).getTime()
                    }
                    _self.addSendMsg(obj)
                    _self.socket.emit('message', obj)
                    _self.content = ''
                } else {
                    jx_common.tip("请输入聊天内容")
                }
                setTimeout(_self.scrollToBottom, 0)
                return false
            }
        }
    }
</script>
<style lang="scss" scoped src="assets/css/chat.scss"></style>
