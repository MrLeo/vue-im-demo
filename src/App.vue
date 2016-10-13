<template>
    <div id="app">
        <router-view keep-alive></router-view>
    </div>
</template>
<script>
    import store from './vuex/store'
    export default {
        name: "App",
        store,
        data() {
            return {}
        },
        components: {},
        ready(){
            !(function(doc, win) {
                var docEle = doc.documentElement,
                        evt = "onorientationchange" in window ? "orientationchange" : "resize",
                        fn = function() {
                            var width = docEle.clientWidth;
                            console.log('[Leo]浏览器宽度 => ', width)
                            if (width <= 768) {
                                router.go({name: 'h5login'})
                                width && (docEle.style.fontSize = 20 * (width / 375) + "px");
                            }else{
                                router.go({name: 'pclogin'})
                            }
                        };
                win.addEventListener(evt, fn, false);
                doc.addEventListener("DOMContentLoaded", fn, false);
            }(document, window));
        }
    }
</script>
<style lang="scss">
    @import "assets/css/common";
</style>
