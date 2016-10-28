<template>
    <div id="index">
        <header>
            <div class="left">北京</div>
            <h1><input type="text" placeholder="搜索楼盘" v-model="selected.keyword"></h1>
            <div></div>
            <div class="right" @click="changeList">{{indexListType}}</div>
            <div class="clear"></div>
            <div class="mainnav">
                <em @click="resetSearchInfo"></em>
                <dl @click="showSearchInfo('searchQuyu')">
                    <dt>区域/地铁
                    <div class="fr"></div>
                    </dt>
                    <dd></dd>
                </dl>
                <dl @click="showSearchInfo('searchType')">
                    <dt>类型
                    <div class="fr"></div>
                    </dt>
                    <dd></dd>
                </dl>
                <dl @click="showSearchInfo('searchJiage')">
                    <dt>价格
                    <div class="fr"></div>
                    </dt>
                    <dd></dd>
                </dl>
                <router-link tag="b" to="/search/more">更多</router-link>
            </div>
        </header>
        <div style=" height:92px;"></div>
        <div class="content">
            <transition name="fade" mode="out-in">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </transition>
        </div>
        <div style="height:60px;"></div>
        <v-footer></v-footer>
        <transition name="slide-down">
            <component :is="currentSearchInfo" class="serch-info"></component>
        </transition>
    </div>
</template>

<script>
    import $ from 'jquery'
    import {mapState, mapGetters, mapActions} from 'vuex'
    import * as types from '../store/mutation-types'
    import vFooter from 'components/footer'
    import searchQuyu from 'components/search-quyu'
    import searchJiage from 'components/search-jiage'
    import searchType from 'components/search-type'
    export default {
        name: 'index',
        components: {vFooter, searchQuyu, searchJiage, searchType},
        data () {
            return {
                currentSearchInfo: '',
                selected: {
                    keyword: ''
                }
            }
        },
        computed: {
            ...mapState({
                //quYuList: state => state.base.quYuList
                indexSearch: state=>state.base.indexSearch
            }),
            ...mapGetters({
                //baseInfo: 'baseInfo'
            }),
            indexListType(){
                if (this.$route.name == 'map') {
                    return '列表'
                } else {
                    return '地图'
                }
            }
        },
        watch: {
            '$route' (to, from) {
                console.debug('[Leo]$route \nfrom => ', from, ' \nto => ', to)
                if (to.name == "index") {
                    router.push({path: 'map'}) //默认展示地图
                }
            },
            'selected.keyword'(){
                this.$store.commit(types.SET_INDEX_SEARCH_INFO, this.selected)
            }
        },
        methods: {
            ...mapActions([
                'initIndexSearchCriteria',
                'setRoadList',
                'setMapList'
            ]),
            changeList(){
                const _vm = this
                _vm.currentSearchInfo = ''
                switch (_vm.$route.name) {
                    case 'map':
                        router.push({path: 'list'})
                        break
                    case 'list':
                        router.push({path: 'map'})
                }
            },
            showSearchInfo(type){
                if (this.currentSearchInfo == '')
                    this.currentSearchInfo = type
                else if (this.currentSearchInfo != '' && this.currentSearchInfo != type)
                    this.currentSearchInfo = type
                else
                    this.currentSearchInfo = ''
            },
            resetSearchInfo(){
                //this.selected.keyword = ''
                this.$store.commit(types.SET_INDEX_SEARCH_INFO, {'empty': true})
                this.$store.state.base.tempVm.$emit('resetSearchInfo')
            }
        },
        created(){
            const _vm = this

            //初始化判断本地 是否为空
            var subjectColor = window.localStorage.getItem('subjectColor');
            subjectColor && $('header').addClass(subjectColor)

            _vm.selected.keyword = _vm.$store.state.base.indexSearch.keyword

            //初始化检索信息的数据
            _vm.initIndexSearchCriteria()
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .content {
        position: absolute;
        top: 92px;
        bottom: 60px;
        left: 0;
        right: 0;
    }

    .serch-info {
        position: absolute;
        transition: all .5s cubic-bezier(.55, 0, .1, 1);
    }

    .mainnav > em {
        float: left;
        width: 30px;
        height: 100%;
        background: url('../../static/images/index2.jpg') center / 50% no-repeat;
    }
</style>
