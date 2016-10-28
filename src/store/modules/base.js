import Vue from "vue";
import * as types from "../mutation-types";

//状态数据源
const state = {
    tempVm: new Vue(),
    indexSearch: {
        empty: true,
        sub: '',
        page: '',//分页
        quyu: '',//区域的id
        ditie: '',//地铁的id
        huanxian: '',//环线的id
        type: '',//类型的id
        jiage: '',//价格是传最大值 1万-1.5万 是传最大值 15000 8万以上是80001
        tese: '',//特色的id
        huxing: '',//户型的id
        keyword: '',//关键字
        fujin: '',//5千米传1 10千米传2
        dqzuobiao: ''//当前坐标 传当前的地理位置 119.11111,35.1111
    },
    quYuList: [],
    diTieList: [],
    typeList: [],
    teseList: [],
    huxingList: [],
    huanxianList: [],
    roadList: [],
    mapList: [],
    typeJianSuo: []
}

//注册事件，提交(commit)状态改变
//必须是《同步》事务
const mutations = {
    [types.SET_INDEX_SEARCH_INFO](state, info){
        if (info.empty) {
            state.indexSearch.empty = !!info.empty
            //必选查询条件
            state.indexSearch.sub = ''
            //分页
            state.indexSearch.page = ''
            //基础查询条件
            state.indexSearch.keyword = ''
            state.indexSearch.quyu = ''
            state.indexSearch.ditie = ''
            state.indexSearch.type = ''
            state.indexSearch.jiage = ''
            //更多查询条件
            state.indexSearch.tese = ''
            state.indexSearch.huxing = ''
            state.indexSearch.huanxian = ''
            state.indexSearch.fujin = ''
            state.indexSearch.dqzuobiao = ''
        }
        else {
            state.indexSearch.empty = !!info.empty
            //必选查询条件
            info.sub || info.sub == '' ? state.indexSearch.sub = info.sub : ''
            //分页
            info.page || info.page == '' ? state.indexSearch.page = info.page : ''
            //基础查询条件
            info.keyword || info.keyword == '' ? state.indexSearch.keyword = info.keyword : ''
            info.quyu || info.quyu == '' ? state.indexSearch.quyu = info.quyu : ''
            info.ditie || info.ditie == '' ? state.indexSearch.ditie = info.ditie : ''
            info.type || info.type == '' ? state.indexSearch.type = info.type : ''
            info.jiage || info.jiage == '' ? state.indexSearch.jiage = info.jiage : ''
            //更多查询条件
            info.tese || info.tese == '' ? state.indexSearch.tese = info.tese : ''
            info.huxing || info.huxing == '' ? state.indexSearch.huxing = info.huxing : ''
            info.huanxian || info.huanxian == '' ? state.indexSearch.huanxian = info.huanxian : ''
            info.fujin || info.fujin == '' ? state.indexSearch.fujin = info.fujin : ''
            info.dqzuobiao || info.dqzuobiao == '' ? state.indexSearch.dqzuobiao = info.dqzuobiao : ''
        }
    },
    [types.SET_QUYU_LIST](state, list){
        Vue.set(state, 'quYuList', list)
    },
    [types.SET_DITIE_LIST](state, list){
        Vue.set(state, 'diTieList', list)
    },
    [types.SET_TYPE_LIST](state, list){
        Vue.set(state, 'typeList', list)
    },
    [types.SET_ROAD_LIST](state, list){
        Vue.set(state, 'roadList', list)
    },
    [types.SET_MAP_LIST](state, list){
        Vue.set(state, 'mapList', list)
    },
    [types.SET_TYPE_JIAN_SUO](state, list){
        if (!state.typeJianSuo.length) {//空数组直接复制
            Vue.set(state, 'typeJianSuo', list)
        } else {//有数据的数组去重复添加
            for (let item of list) {
                if (state.online.users.hasOwnProperty(user)) {
                    console.log('[Leo]hasOwnProperty => ')
                    continue
                }
                let isHas = false
                for (let stateItem of state.typeJianSuo.typeJianSuo) {
                    if (item.id == stateItem.id) {
                        console.log('[Leo]重复id被过滤 => ', item.id)
                        isHas = true
                        break
                    }
                }
                if (!isHas) {
                    state.typeJianSuo.typeJianSuo.push(item)
                }
            }
        }
    },
    [types.SET_TESE_LIST](state, list){
        Vue.set(state, 'teseList', list)
    },
    [types.SET_HUXING_LIST](state, list){
        Vue.set(state, 'huxingList', list)
    },
    [types.SET_HUANXIAN_LIST](state, list){
        Vue.set(state, 'huanxianList', list)
    }
}

export default {
    state,
    mutations
}
