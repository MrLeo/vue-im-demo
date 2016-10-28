/**
* @Date: 2016/10/21  0021  16:05
* @Author: lxbin
* Created with JetBrains WebStorm.
*/
<template>
    <div class="indexlist">
        <dl v-for="item in typeJianSuo" :key="item.id" @click="goToDetail(item)">
            <!--:style="{backgroundImage:'url('+convertPUrl(item.p_url)+')'}"-->
            <dt v-lazy:background-image="convertPUrl(item.p_url)">
                <!--<img :src="'http://www.loushijie.cn/'+item.p_url">--></dt>
            <dd>
                <h3>{{item.p_name}}</h3>
                <h6>{{item.t_name}}</h6>
                <h4>{{item.adds}}</h4>
                <h5><span v-if="item.n_name">{{item.n_name}}</span></h5>
                <em>{{item.jiage}}</em>
            </dd>
        </dl>
    </div>
</template>
<script>
    import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
    import * as types from '../store/mutation-types'
    export default{
        name: 'list',
        data(){
            return {
                busy: false,
                page: 1
            }
        },
        computed: {
            ...mapState({
                typeJianSuo: state=>state.base.typeJianSuo
            }),
            ...mapGetters({})
        },
        watch: {},
        methods: {
            ...mapMutations({}),
            ...mapActions([
                'setTypeJianSuo'
            ]),
            convertPUrl(url){
                if (url) {
                    return 'http://www.loushijie.cn/' + url
                } else {
                    return './static/images/icon_default.png'
                }
            },
            goToDetail(item){
                window.localStorage.setItem('detailTitle', item['p_name'])
                window.localStorage.setItem('detailTel', item['tel'])
                window.localStorage.setItem('detailXY', item['zuobiao'])
                //window.location.href = 'h5/view/product_info.php?id=' + item['id']
                window.location.href = 'detail_product.html?id=' + item['id']
            }
        },
        created(){
            const _vm = this
            _vm.setTypeJianSuo()
        },
        mounted(){
        }
    }
</script>
<style scoped>
    .indexlist dt {
        background-position: center;
        background-size: cover;
    }
</style>
