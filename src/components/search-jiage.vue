/**
* @Date: 2016/10/22  0022  12:14
* @Author: lxbin
* Created with JetBrains WebStorm.
*/
<template>
    <div class="mianlayer1">
        <div class="box">
            <div class="navlist2 no">
                <ul>
                    <li @click="selectJiage('')" :class="{hover:indexSearch.jiage==''}">不限</li>
                    <li @click="selectJiage('15000')" :class="{hover:indexSearch.jiage=='15000'}">1-1.5万</li>
                    <li @click="selectJiage('25000')" :class="{hover:indexSearch.jiage=='25000'}">1.5-2.5万</li>
                    <li @click="selectJiage('35000')" :class="{hover:indexSearch.jiage=='35000'}">2.5-3.5万</li>
                    <li @click="selectJiage('50000')" :class="{hover:indexSearch.jiage=='50000'}">3.5-5万</li>
                    <li @click="selectJiage('65000')" :class="{hover:indexSearch.jiage=='65000'}">5-6.5万</li>
                    <li @click="selectJiage('80000')" :class="{hover:indexSearch.jiage=='80000'}">6.5-8万</li>
                    <li @click="selectJiage('80001')" :class="{hover:indexSearch.jiage=='80001'}">8万以上</li>
                    <h6>自定义价格（元/平）
                        <input type="text" placeholder="最小" v-model="min">
                        <input type="text" placeholder="最大" v-model="max">
                        <button @click="inputJiage">确定</button>
                    </h6>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapState, mapGetters, mapActions} from 'vuex'
    import * as types from '../store/mutation-types'
    export default{
        name: 'search-jiage',
        data(){
            return {
                selected: {
                    jiage: ''
                },
                min: '',
                max: ''
            }
        },
        computed: {
            ...mapState({
                indexSearch: state=>state.base.indexSearch
            }),
            ...mapGetters({
                baseInfo: 'baseInfo'
            })
        },
        methods: {
            ...mapActions([

                'setMapList'
            ]),
            selectJiage(type){
                this.selected.jiage = type
                this.$store.commit(types.SET_INDEX_SEARCH_INFO, this.selected)
            },
            inputJiage(){
                this.selected.jiage = this.max
                this.$store.commit(types.SET_INDEX_SEARCH_INFO, this.selected)
            }
        },
        created(){
            this.selected.jiage = this.indexSearch.jiage
        }
    }
</script>
<style scoped>
    .navlist2 li.hover {
        background: #e2e2e2;
    }
</style>
