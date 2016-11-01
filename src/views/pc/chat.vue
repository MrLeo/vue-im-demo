<template>
    <div class="chat">
        <div class="list">
            <ul>
                <li v-for="msg in getMsgs">
                    <msg-item :type="msg.from.userId==me.userId?'me':'other'" :msg="msg"></msg-item>
                </li>
            </ul>
        </div>
        <div class="send">
            <div class="send-bar">
                <input type="file" id="fileImg" name="fileImg" style="display: none;"
                       accept="image/*"
                       ref="fileImg"
                       @change="sendImg">
                <label for="fileImg" class="fa fa-picture-o" aria-hidden="true"></label>
            </div>
            <div class="send-msg">
                <textarea class="send-msg-input" placeholder="请输入聊天内容" autofocus
                          v-model="content"
                          @keyup.13="sendText"
                          ref="msgInput"></textarea>
                <a href="javascript:void(0)" class="send-msg-btn" @click="sendText">发送</a>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
    import * as types from '../../store/mutation-types'

    import msgItem from 'components/msg-item'

    import io from 'socket.io-client'
    import jx_common from '../../utils/jx/common'

    export default{
        name: 'pcchat',
        components: {msgItem},
        data(){
            return {
                content: '',
                fileImg: null
            }
        },
        computed: {
            ...mapState({
                me: ({users})=>users.me,
                users: ({users})=>users.online.users,
                socket: ({base})=>base.socket
            }),
            getMsgs(){
                const _self = this
                let msgs = []
                for (let user of _self.users) {
                    if (user.userId != _self.$route.params.id)continue
                    if (user.msg)msgs = user.msg
                    user.noRead = 0
                    break
                }
                setTimeout(_self.scrollToBottom, 0)
                console.log('[Leo]getMsgs => ', msgs)
                return msgs
            }
        },
        methods: {
            ...mapMutations({
                addSendMsg: types.ADD_SEND_MSG
            }),
            //让浏览器滚动条保持在最低部
            scrollToBottom: function () {
                //window.scrollTo(0, document.querySelectorAll('.list ul')[0].clientHeight)
                window.document.querySelectorAll('.list')[0].scrollTop = document.querySelectorAll('.list ul')[0].clientHeight
            },
            //上传图片 <https://segmentfault.com/a/1190000004924160>
            sendImg(event){
                let _vm = this
                let file = event.target.files[0] //获取图片资源
                //只选择图片文件
                if (!file.type.match('image.*'))
                    return false
                let reader = new FileReader()
                reader.readAsDataURL(file)//读取文件
                // 渲染文件
                reader.onload = function (arg) {
                    _vm.submit('img', arg.target.result)

                    _vm.$refs.fileImg.files[0] = null
                    _vm.$refs.msgInput.focus()
                }

                //TODO:上传图片
                _vm.uploadFile(file).then(res => {
                    console.log('[Leo]图片上传成功 => ', res)
                }).catch(error => {
                    console.error('[Leo]图片上传出错 => ', error)
                })
            },
            //提交聊天消息内容
            sendText () {
                const _vm = this
                if (_vm.content != '') {
                    _vm.submit('text', _vm.content)
                } else {
                    jx_common.tip("请输入聊天内容")
                }
                _vm.$nextTick(function () {
                    _vm.scrollToBottom()
                    _vm.content = ''
                    _vm.$refs.msgInput.focus()
                })
                return false
            },
            //提交聊天消息内容
            submit (type, content) {
                const _vm = this
                let obj = {
                    "from": {
                        "userId": _vm.me.userId,
                        "userName": _vm.me.userName
                    },
                    "to": {
                        "userId": _vm.$route.params.id,
                        "userName": _vm.$route.params.name
                    },
                    "msgType": type,
                    "content": content,
                    "sendtime": (new Date()).getTime()
                }
                _vm.addSendMsg(obj)
                _vm.socket.emit('message', obj)
            },
            /**
             * 上传文件
             * @param file
             */
            uploadFile(file){
                let form_data = new FormData()
                // 把上传的数据放入form_data
                form_data.append("img", file)
                //异步提交数据
                return fetch('url', {
                    method: 'POST',
                    body: form_data
                })
            }
        },
        mounted(){
            const _self = this
            _self.$nextTick(function () {
                _self.scrollToBottom()
                _self.$refs.msgInput.focus()
            })
        }
    }
</script>
<style scoped lang="scss" rel="stylesheet/scss">
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
        overflow: hidden;
    }

    .list {
        padding: 10px;
        height: calc(100% - 100px - 40px);
        overflow-y: auto;
        overflow-x: hidden;
    }

    .send {
        position: relative;
        display: flex;
        flex-direction: column;

        &-bar {
            flex: 1;
            height: 40px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            background-color: #ffffff;

            .fa {
                padding: 10px 15px;
                cursor: pointer;
            }
        }

        &-msg {
            display: flex;
            flex: 1;
            height: 100px;
            overflow: hidden;
            box-shadow: 0 -1px 2px #efefef;
            background-color: #fff;

            &-input {
                flex: 1;
                padding: 0 10px;
                box-sizing: border-box;
                border: none;
                line-height: 30px;
                resize: none;
            }

            &-btn {
                display: inline-block;
                width: 100px;
                height: 100%;
                line-height: 100px;
                background-color: dodgerblue;
                text-align: center;
                text-decoration: none;
                color: #fff;
            }
        }
    }
</style>
