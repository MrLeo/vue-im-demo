<template>
    <div id="app" :style="{'height': wHeight,'width':wWidth}">
        <router-view></router-view>
        <!--keep-alive-->
    </div>
</template>
<script>
    import store from './vuex/store'
    export default {
        name: "App",
        store,
        data() {
            return {
                wHeight: "100%",
                wWidth: "100%"
            }
        },
        components: {},
        ready(){
            !(function (doc, win) {
                var docEle = doc.documentElement,
                        evt = "onorientationchange" in window ? "orientationchange" : "resize",
                        fn = function () {
                            var width = docEle.clientWidth;
                            if (width <= 768) {
                                if (router.app.$route.name != 'h5login')
                                    router.go({name: 'h5login'})
                                width && (docEle.style.fontSize = 20 * (width / 375) + "px");
                            } else {
                                if (router.app.$route.name != 'pclogin')
                                    router.go({name: 'pclogin'})
                            }
                        };
                win.addEventListener(evt, fn, false);
                doc.addEventListener("DOMContentLoaded", fn, false);
            }(document, window));
        },
        events: {
            'change-window-size': function (obj) {
                const _self = this
                console.log('[Leo]窗口改变 => ', obj)
                _self.wHeight = obj.height + 'px'
                _self.wWidth = obj.width + 'px'
            }
        }
    }
</script>
<style lang="scss">
    @import "assets/css/common";
</style>
