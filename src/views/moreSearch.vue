/**
* @Date: 2016/10/22  0022  12:54
* @Author: lxbin
* Created with JetBrains WebStorm.
*/
<template>
    <div id="search">
        <header>
            <router-link class="left" to="/map">&nbsp;〈&nbsp;</router-link>
            <h1>更多</h1>
            <div class="right"></div>
            <div class="clear"></div>
        </header>
        <div style=" height:52px;"></div>
        <div class="navlist1" style=" position:fixed; top:52px; bottom:60px; left:0; right:0; height:auto">
            <div class="left" style="position:absolute; top:0; bottom:0; z-index: 1;height:auto">
                <ul>
                    <li @click="currentSearch='tese'" :class="{hover:currentSearch=='tese'}">特色</li>
                    <li @click="currentSearch='huxing'" :class="{hover:currentSearch=='huxing'}">户型</li>
                    <li @click="currentSearch='huanxian'" :class="{hover:currentSearch=='huanxian'}">环线</li>
                    <li @click="currentSearch='fujin'" :class="{hover:currentSearch=='fujin'}">附近</li>
                </ul>
            </div>
            <div class="right" style="position:absolute; top:0; bottom:0; height:auto; width:50%;">
                <ol ref="tese" v-show="currentSearch=='tese'">
                    <li @click="selected.tese=''"
                        :class="{hover:selected.tese==''}">
                        不限
                    </li>
                    <li v-for="item in teseList"
                        @click="selected.tese=item.id"
                        :class="{hover:selected.tese==item.id}">
                        {{item.t_name}}
                    </li>
                </ol>
                <ol ref="huxing" v-show="currentSearch=='huxing'">
                    <li @click="selected.huxing=''"
                        :class="{hover:selected.huxing==''}">
                        不限
                    </li>
                    <li v-for="item in huxingList"
                        @click="selected.huxing=item.id"
                        :class="{hover:selected.huxing==item.id}">
                        {{item.t_name}}
                    </li>
                </ol>
                <ol ref="huanxian" v-show="currentSearch=='huanxian'">
                    <li @click="selected.huanxian=''"
                        :class="{hover:selected.huanxian==''}">
                        不限
                    </li>
                    <li v-for="item in huanxianList"
                        @click="selected.huanxian=item.id"
                        :class="{hover:selected.huanxian==item.id}">
                        {{item.t_name}}
                    </li>
                </ol>
                <ol ref="fujin" v-show="currentSearch=='fujin'">
                    <li @click="selected.fujin=1"
                        :class="{hover:selected.fujin==1}">
                        5km
                    </li>
                    <li @click="selected.fujin=2"
                        :class="{hover:selected.fujin==2}">
                        10km
                    </li>
                </ol>
            </div>
        </div>
        <div style="height:60px;"></div>
        <div class="mainmenu">
            <a class="submit" @click="submit">确定</a>
        </div>
    </div>
</template>
<script>
    import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
    import * as types from '../store/mutation-types'
    export default{
        name: 'more-search',
        components: {},
        props: [],
        data(){
            return {
                currentSearch: 'tese',
                selected: {
                    tese: '',
                    huxing: '',
                    huanxian: '',
                    fujin: ''
                }
            }
        },
        computed: {
            ...mapState({
                teseList: state=>state.base.teseList,
                huxingList: state=>state.base.huxingList,
                huanxianList: state=>state.base.huanxianList,
                indexSearch: state=>state.base.indexSearch
            }),
            ...mapGetters({})
        },
        watch: {
            '$route' (to, from) {
                console.log('[Leo]route change from=> ', from)
                console.log('[Leo]route change to => ', to)
            }
        },
        methods: {
            ...mapMutations({
                setIndexSearchInfo: types.SET_INDEX_SEARCH_INFO
            }),
            ...mapActions([
                'initMoreSearchCriteria',
                'setMapList'
            ]),
            clickLeftMenu(type){
                this.currentSearch = type
            },
            submit(){
                console.log('[Leo]选好了 => ', JSON.stringify(this.selected))
                this.setIndexSearchInfo(this.selected)
                router.go(-1)
            }
        },
        created(){
            const _vm = this
            _vm.initMoreSearchCriteria()
            _vm.selected.tese = _vm.indexSearch.tese
            _vm.selected.huxing = _vm.indexSearch.huxing
            _vm.selected.huanxian = _vm.indexSearch.huanxian
            _vm.selected.fujin = _vm.indexSearch.fujin
        },
        mounted(){
        }
    }
</script>
<style scoped>
    header .left {
        color: #fff;
    }

    .navlist1 .right li.hover {
        color: #fc6561;
        background: url(/static/images/aa.png) no-repeat right;
        background-size: 20px;
    }

    .mainmenu {
        height: 60px;
    }

    .submit {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -75px;
        margin-top: -15px;
        display: block;
        width: 150px;
        height: 30px;
        line-height: 30px;
        color: #ffffff;
        background-color: red;
        text-align: center;
    }
</style>
