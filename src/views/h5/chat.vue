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
            <span slot="header-title">{{userName}}</span>
        </page-header>
        <div class="page-content">
            <div class="list">
                <ul>
                    <li v-for="msg in getMsgs">
                        <msg-item :type="msg.from.userId==me.userId?'me':'other'" :msg="msg"></msg-item>
                    </li>
                </ul>
            </div>
        </div>
        <footer>
            <input type="file" id="fileImg" name="fileImg" style="display: none;"
                   accept="image/*"
                   ref="fileImg"
                   @change="sendImg">
            <label for="fileImg" class="fa fa-picture-o" aria-hidden="true"></label>
            <input type="text" class="msg-input" placeholder="请输入聊天内容"
                   v-model="content"
                   @keyup.13="sendText"
                   @focus="inputFocus"
                   @blur="inputBlur"
                   ref="msgInput">
            <a class="btn submit" @click="sendText">发送</a>
        </footer>
    </div>
</template>
<script>
    import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
    import * as types from '../../store/mutation-types'

    import msgItem from 'components/msg-item'
    import pageHeader from 'components/h5/page-header'

    import io from 'socket.io-client'
    import jx_common from '../../utils/jx/common'

    export default{
        name: 'h5chat',
        components: {pageHeader, msgItem},
        data(){
            return {
                content: '',
                userName: '聊天',
                fileImg: null
            }
        },
        computed: {
            ...mapState({
                me: ({users})=>users.me,
                users: ({users})=>users.online.users,
                allMsgRemind: ({users})=>users.allMsgRemind,
                socket: ({base})=>base.socket
            }),
            ...mapGetters({}),
            getMsgs(){
                const _self = this
                let msgs = []
                for (let user of _self.users) {
                    if (user.userId != _self.$route.params.id)continue
                    if (user.msg)msgs = user.msg
                    user.noRead = 0
                    break
                }
                _self.$nextTick(function () {
                    _self.scrollToBottom()
                })
                return msgs
            }
        },
        methods: {
            ...mapActions([]),
            ...mapMutations({
                addSendMsg: types.ADD_SEND_MSG
            }),
            goBack(){
                router.push('/h5/index')
            },
            //让浏览器滚动条保持在最低部
            scrollToBottom: function () {
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
                _vm.uploadFile(file).then(res=> {
                    console.log('[Leo]图片上传成功 => ', res)
                }).catch(error=> {
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
            /**
             * 发送消息
             * @param {string} type 消息类型
             * @param {string} content 消息内容
             */
            submit(type, content) {
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
            },
            resetWindowSize(){
                const _self = this
                _self.$store.state.base.$vm.$emit('change-window-size', {
                    "height": window.innerHeight,
                    "width": window.innerWidth
                })
                _self.$nextTick(function () {
                    _self.scrollToBottom()
                })
            },
            inputFocus(){
                this.resetWindowSize()
            },
            inputBlur(){
                this.resetWindowSize()
            }
        },
        mounted(){
            const _self = this
            _self.$nextTick(()=> {
                _self.userName = _self.$route.params.name
                _self.scrollToBottom()
                _self.$refs.msgInput.focus()
            })
        }
    }
</script>
<style lang="scss" scoped src="assets/css/h5chat.scss"></style>
