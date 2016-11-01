<template>
    <div id="app" :style="{'height': wHeight,'width':wWidth}">
        <transition :name="transitionName">
            <router-view class="view"></router-view>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'app',
        components: {},
        data () {
            return {
                transitionName: 'slide-left',
                wHeight: "100%",
                wWidth: "100%"
            }
        },
        watch: {
            '$route' (to, from) {
                const toDepth = to.path.split('/').length
                const fromDepth = from.path.split('/').length
                this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
            }
        },
        created(){
            const _self = this
            _self.$store.state.base.$vm.$on('change-window-size', function (obj) {
                _self.wHeight = obj.height + 'px'
                _self.wWidth = obj.width + 'px'
            })
            /**
             * 动态计算 rem 基准大小
             */
            !(function (doc, win) {
                var docEle = doc.documentElement,
                        evt = "onorientationchange" in window ? "orientationchange" : "resize",
                        fn = function () {
                            var width = docEle.clientWidth
                            if (width <= 768) {
                                /*if (router.app.$route.name != 'h5login')
                                    router.push({name: 'h5login'})*/

                                width && (docEle.style.fontSize = 20 * (width / 320) + "px")
                            } else {
                                /*if (router.app.$route.name != 'pclogin')
                                    router.push({name: 'pclogin'})*/
                            }
                        };
                win.addEventListener(evt, fn, false);
                doc.addEventListener("DOMContentLoaded", fn, false);
            }(document, window));
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "assets/css/common";

    .view {
        position: absolute;
        width: 100%;
        height: 100%;
        transition: all .5s cubic-bezier(.55, 0, .1, 1);
    }

    ._full {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 1;
        overflow: auto;
        background-color: #f4f4f4;
        color: #666;
    }

    .page-content {
        position: absolute;
        top: rem(50px);
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
    }

    /*fade动画 begin*/
    /*fade 进入后 ＆ 离开后 状态*/
    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s ease;

    }

    /*fade 进入前 ＆ 离开后*/
    .fade-enter, .fade-leave-active {
        opacity: 0

    }

    /*slide动画 begin*/
    /*slide-left 进入前 状态*/
    /*slide-right 离开后 状态*/
    .slide-left-enter, .slide-right-leave-active {
        opacity: 0;
        -webkit-transform: translate(30px, 0);
        transform: translate(30px, 0);

    }

    /*slide-left 离开后 状态*/
    /*slide-right 进入前 状态*/
    .slide-left-leave-active, .slide-right-enter {
        opacity: 0;
        -webkit-transform: translate(-30px, 0);
        transform: translate(-30px, 0);

    }

    /*slide-down 进入的开始状态 ＆ 离开的结束状态*/
    .slide-down-enter, .slide-down-leave-active {
        opacity: 0;
        -webkit-transform: translate(0, -30px);
        transform: translate(0, -30px);

    }

    /*slide-down 进入的结束状态 ＆ 离开的开始状态*/
    .slide-down-enter-active, .slide-down-leave {
        transition: all .5s ease;

    }
</style>
