<template>
    <transition :name="transitionName">
        <router-view class="view"></router-view>
    </transition>
</template>

<script>
    export default {
        name: 'app',
        components: {},
        data () {
            return {
                transitionName: 'slide-left'
            }
        },
        watch: {
            '$route' (to, from) {
                const toDepth = to.path.split('/').length
                const fromDepth = from.path.split('/').length
                this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
            }
        }
    }
</script>

<style>
    .view {
        position: absolute;
        width: 100%;
        height: 100%;
        transition: all .3s cubic-bezier(.55, 0, .1, 1);
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
        transition: all .3s ease;
    }
</style>
