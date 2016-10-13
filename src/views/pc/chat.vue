<script>
    import base from '_vuex/modules/base'
    import users from '_vuex/modules/users'
    import * as actions from '_vuex/actions'
    import msgItem from 'components/msg-item'

    import jx_common from 'utils/jx/common'
    import io from 'socket.io-client'

    //    let dx = (document.compatMode == 'CSS1Compat') ? document.documentElement : document.body
    //    let screenheight = window.innerHeight ? window.innerHeight : dx.clientHeight

    export default{
        name: 'pcchat',
        components: {msgItem},
        vuex: {
            getters: {
                me: ({users})=>users.me,
                users: ({users})=>users.online.users,
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
            const _self=this
            _self.scrollToBottom()
            _self.$nextTick(()=>{
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
                console.log('[Leo]getMsgs => ', msgs)
                return msgs
            }
        },
        methods: {
            //让浏览器滚动条保持在最低部
            scrollToBottom: function () {
                //window.scrollTo(0, document.querySelectorAll('.list ul')[0].clientHeight)
                window.document.querySelectorAll('.list')[0].scrollTop = document.querySelectorAll('.list ul')[0].clientHeight
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
                setTimeout(_self.scrollToBottom,0)
                return false
            }
        }
    }
</script>
<template>
    <div class="chat">
        <div class="list">
            <ul>
                <li v-for="msg in getMsgs">
                    <msg-item :type="msg.from.userId==me.userId?'me':'other'" :msg="msg"></msg-item>
                </li>
            </ul>
        </div>
        <div class="send-msg">
            <textarea class="msg-input" placeholder="请输入聊天内容" v-model="content" @keyup.13="submit" autofocus v-el:msg-input></textarea>
            <a href="javascript:void(0)" class="msg-btn" @click="submit">发送</a>
        </div>
    </div>
</template>
<style scoped>
    input, button, select, textarea {
        outline: none
    }

    ul, li {
        list-style: none;
    }

    .chat {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        box-sizing: border-box;
        overflow: scroll;
    }

    .list {
        padding: 10px;
        height: -moz-calc(100% - 100px - 10px * 2);
        height: -webkit-calc(100% - 100px - 10px * 2);
        height: calc(100% - 100px - 10px * 2);
        overflow-y: auto;
        overflow-x: hidden;
    }

    .send-msg {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 100px;
        overflow: hidden;
        /*padding: 5px;*/
        box-shadow: 0 -1px 2px #efefef;
        background-color: #fff;
    }

    .msg-input {
        width: 100%;
        height: 100%;
        padding: 0 10px;
        box-sizing: border-box;
        border: none;
        line-height: 30px;
        resize: none;
    }

    .msg-btn {
        position: absolute;
        right: 0;
        top: 0;
        display: inline-block;
        width: 100px;
        height: 100%;
        line-height: 100px;
        background-color: dodgerblue;
        text-align: center;
        text-decoration: none;
        color: #fff;
    }
</style>
