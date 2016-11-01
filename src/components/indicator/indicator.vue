/**
* @Date: 2016/10/31  0031  12:18
* @Author: lxbin
* Created with JetBrains WebStorm.
*/
<template>
    <transition name="indicator">
        <div>
            <!--<component :is="currentView"></component>-->
        </div>
    </transition>
</template>
<script>
    import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
    import * as types from '../store/mutation-types'
    export default{
        name: '',
        components: {},
        props: {
            text: String,
            spinnerType: {
                type: String,
                default: 'snake'
            }
        },
        data(){
            return {
                //currentView:''
            }
        },
        watch: {},
        computed: {
            ...mapState({}),
            ...mapGetters({
                //baseInfo: 'baseInfo'
            })
        },
        methods: mapActions([
            //'addToBaseInfo'
        ]),
        created(){
        },
        mounted(){
        }
    }
</script>
<style scoped lang="scss" rel="stylesheet/scss">
    .mint-indicator-enter,
    .mint-indicator-leave-active {
        opacity: 0;
    }
</style>
