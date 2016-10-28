/**
 * @Date: 2016/10/22  0022  0:27
 * @Author: lxbin
 *
 * Created with JetBrains WebStorm.
 */

import $ from 'jquery'
import Fetch from '../utils/Fetch'
import getLocation from '../utils/getLocation'

const host = 'http://loushijie.cn/api/'

export default {
    /**
     * 1.区域
     * @param sub
     */
    getQuYuList(sub){
        return new Promise(function (resolve, reject) {
            $.post(host + 'quyu_listapi.php', {sub}, res=> resolve(JSON.parse(res)))
        })
        //return Fetch(host + 'quyu_listapi.php?sub=' + sub)
    },
    /**
     * 2.地铁
     * @param sub
     */
    getDiTieList(sub){
        return new Promise(function (resolve, reject) {
            $.post(host + 'ditie_listapi.php', {sub}, res=>resolve(JSON.parse(res)))
        })
        //return Fetch(host + 'ditie_listapi.php?sub=' + sub)
    },
    /**
     * 3.特色
     * @param sub
     */
    getTeSeList(sub){
        return new Promise(function (resolve, reject) {
            $.post(host + 'tese_listapi.php', {sub}, res=>resolve(JSON.parse(res)))
        })
        //return Fetch(host + 'tese_listapi.php?sub=' + sub)
    },
    /**
     * 4.户型
     * @param sub
     */
    getHuXingList(sub){
        return new Promise(function (resolve, reject) {
            $.post(host + 'huxing_listapi.php', {sub}, res=>resolve(JSON.parse(res)))
        })
        //return Fetch(host + 'huxing_listapi.php?sub=' + sub)
    },
    /**
     * 5，环线
     * @param sub
     */
    getHuanXianList(sub){
        return new Promise(function (resolve, reject) {
            $.post(host + 'huanxian_listapi.php', {sub}, res=>resolve(JSON.parse(res)))
        })
        //return Fetch(host + 'huanxian_listapi.php?sub=' + sub)
    },
    /**
     * 6.类型
     * @param sub
     */
    getTypeList(sub){
        return new Promise(function (resolve, reject) {
            $.post(host + 'type_listapi.php', {sub}, res=>resolve(JSON.parse(res)))
        })
        //return Fetch(host + 'type_listapi.php?sub=' + sub)
    },
    /**
     * 7.更多列表
     * @param info
     * <必选>: sub page（分页）
     * <可选>: quyu（区域的id） ditie（地铁的id） huanxian（环线的id） p_type（类型的id） jiage（价格是传最大值 1万-1.5万 是传最大值 15000 8万以上是80001） tese（特色的id） jushi （户型的id）keyword（关键字） fujin（5千米 传1 10千米传2） dqzuobiao(当前坐标 传当前的地理位置 119.11111,35.1111)
     */
    getTypeJianSuo(info){
        info.sub ? '' : info.sub = ''
        info.page ? '' : info.page

        //let position = getLocation().then(position => {
        //    return position
        //}).catch(error => {
        //    console.error('[Leo]获取当前坐标出错 => ', error)
        //    return []
        //})
        //
        //return position.then(res=> {
        //    info.dqzuobiao = res.join(",")
        return new Promise(function (resolve, reject) {
            $.post(host + 'type_jiansuoapi.php', info, res=>resolve(JSON.parse(res)))
        })
        //})

        //return Fetch(host + 'type_jiansuoapi.php',{
        //    method:'PSOT',
        //    body:JSON.stringify(info)
        //})
    },
    /**
     * 8.首页区域数据（区域）
     * @param info
     * <必选>: sub
     * <可选>: quyu（区域的id） ditie（地铁的id） huanxian（环线的id） p_type（类型的id） jiage（价格是传最大值 1万-1.5万 是传最大值 15000 8万以上是80001） tese（特色的id） jushi （户型的id）keyword（关键字） fujin（5千米 传1 10千米传2） dqzuobiao(当前坐标 传当前的地理位置 119.11111,35.1111)
     * 地图一级覆盖物
     */
    getRoad(info){
        info.sub ? '' : info.sub = ''

        //let position = getLocation().then(position => {
        //    return position
        //}).catch(error => {
        //    console.error('[Leo]获取当前坐标出错 => ', error)
        //    return []
        //})
        //
        //return position.then(res=> {
        //    info.dqzuobiao = res.join(",")
        return new Promise(function (resolve, reject) {
            $.post(host + 'roadapi.php', info, res=>resolve(JSON.parse(res)))
        })
        //})

        //return Fetch(host + 'roadapi.php',{
        //    method:'POST',
        //    body:JSON.stringify(info)
        //})
    },
    /**
     * 9.首页地图+分类检索
     * @param info
     * <必选>: sub
     * <可选>: quyu（区域的id） ditie（地铁的id） huanxian（环线的id） p_type（类型的id） jiage（价格是传最大值 1万-1.5万 是传最大值 15000 8万以上是80001） tese（特色的id） jushi （户型的id）keyword（关键字） fujin（5千米 传1 10千米传2） dqzuobiao(当前坐标 传当前的地理位置 119.11111,35.1111)
     * 筛选时、点击地图一级覆盖物时、地图缩放级别到14左右的时候调用
     */
    getMap(info){
        info.sub ? '' : info.sub = ''

        //if (!info.dqzuobiao) {
        //    let position = getLocation().then(position => {
        //        return position
        //    }).catch(error => {
        //        console.error('[Leo]获取当前坐标出错 => ', error)
        //        return []
        //    })
        //
        //    return position.then(res=> {
        //        info.dqzuobiao = res.join(",")
        //        return new Promise(function (resolve, reject) {
        //            $.post(host + 'mapapi.php', info, res=>resolve(JSON.parse(res)))
        //        })
        //    })
        //} else {
        return new Promise(function (resolve, reject) {
            $.post(host + 'mapapi.php', info, res=>resolve(JSON.parse(res)))
        })
        //}
    },
    /**
     * 10.详情页-户型
     * @param sub
     * @param upd 项目id
     */
    getHuXing(sub, upd){
        return new Promise(function (resolve, reject) {
            $.post(host + 'huxing_api.php', {sub, upd}, res=>resolve(JSON.parse(res)))
        })
    },
    /**
     * 11.详情页-项目存储
     * @param sub
     * @param sid 项目id
     * @param uid 用户id
     */
    getUserBrowsingHistory(sub, sid, uid){
        return new Promise(function (resolve, reject) {
            $.post(host + 'user/browsinghistoryapi.php', {sub, sid, uid}, res=>resolve(JSON.parse(res)))
        })
    },
    /**
     * 12.详情页-立即预约
     * @param sub
     * @param suser 姓名
     * @param sphone 电话
     * @param sid 项目id
     * @param g_uid 用户id
     * @param time 预约时间
     */
    getSeeorder(sub, suser, sphone, sid, g_uid, time){
        return new Promise(function (resolve, reject) {
            $.post(host + 'user/seeorderapi.php', {sub, suser, sphone, sid, g_uid, time}, res=>resolve(JSON.parse(res)))
        })
    },
    /**
     * 13.详情页-点赞
     * @param sub
     * @param product_id 项目id
     * @param user_id 用户id
     * @param p_type 默认传3
     */
    clickLick(sub, product_id, user_id, p_type = 3){
        return new Promise(function (resolve, reject) {
            $.post(host + 'user/click_like.php', {sub, product_id, user_id, p_type}, res=>resolve(JSON.parse(res)))
        })
    },
    /**
     * 14.详情页-分享
     * @param sub
     * @param product_id 项目id
     * @param user_id 用户id
     * @param p_type {4:楼盘,5:咨询}
     */
    share(sub, product_id, user_id, p_type){
        return new Promise(function (resolve, reject) {
            $.post(host + 'user/share.php', {sub, product_id, user_id, p_type}, res=>resolve(JSON.parse(res)))
        })
    },
    /**
     * 15.详情页-收藏
     * @param sub
     * @param product_id 项目id
     * @param user_id 用户id
     * @param p_type {2:资讯,1:楼盘}
     */
    collectionInsert(sub, product_id, user_id, p_type){
        return new Promise(function (resolve, reject) {
            $.post(host + 'user/collection_insert.php', {
                sub, product_id, user_id, p_type
            }, res=>resolve(JSON.parse(res)))
        })
    },
    /**
     * 16.详情页-社会化属性
     * @param sub
     * @param p_id 项目id
     * @param user_id 用户id
     * @param p_type 默认传3
     */
    productUserAttr(sub, p_id, user_id, p_type = 3){
        return new Promise(function (resolve, reject) {
            $.post(host + 'user/product_user_attr.php', {sub, p_id, user_id, p_type}, res=>resolve(JSON.parse(res)))
        })
    },
    /**
     * 详情页-周边推荐
     * @param sub
     * @param id
     */
    getZhouBianTuiJian(sub, id){
        return new Promise(function (resolve, reject) {
            $.post(host + 'zhoubiantj.php', {sub, id}, res=>resolve(JSON.parse(res)))
        })
    }
}