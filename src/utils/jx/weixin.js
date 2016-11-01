/**
 * @Date: 2016/10/27  0027  14:25
 * @Author: lxbin
 *
 * Created with JetBrains WebStorm.
 */

import $ from 'jquery'
import jx_common from './common'

//let ajaxUrlData = 'http://wxapi.jiuxiulvxing.com/jssdk/getconfig/46'
//let linkData = 'http://m.jiuxiulvxing.com/view/activity/couponw.html'
//let imgUrlData = 'http://m.jiuxiulvxing.com/img/coupona/share.jpg'
//let _linkUrl = window.location.href
////微信分享预发链接
//if (_linkUrl.indexOf("inpre.jiuxiulvxing.com") != -1
//    || _linkUrl.indexOf("m.pre.jiuxiulvxing.com") != -1
//    || _linkUrl.indexOf("mpre.jiuxiulvxing.com") != -1) {
//    ajaxUrlData = 'http://wxapi.pre.jiuxiulvxing.com/jssdk/getconfig/47'
//    linkData = 'http://m.pre.jiuxiulvxing.com/view/activity/couponw.html'
//    imgUrlData = 'http://m.pre.jiuxiulvxing.com/img/coupona/share.jpg'
//}

/**
 * [getWxsdk description]
 * @param  {[type]} ajax_url 请求的url
 * @param  {[type]} title    分享标题
 * @param  {[type]} desc     分享描述
 * @param  {[type]} link     分享地址
 * @param  {[type]} imgUrl   分享图片地址
 * @example
 * getWxsdk({
 *     ajaxUrl: 'http://wxapi.pre.jiuxiulvxing.com/jssdk/getconfig/47',//正式环境最后是46，预发环境最后是47
 *     title: '把花从礼物变成日子，也只需要你点我一下',
 *     desc: '花耶！万亩花田，每周惊喜',
 *     link: 'http://m.pre.jiuxiulvxing.com/index.html',
 *     imgUrl: 'http://s0.test.jiuxiulvxing.com/Test/flower/static/weixin-share.jpg'
 * })
 */
export default function getWxsdk(opt) {
    //微信JSSDK初始化接口
    $.ajax({
        type: 'post',
        url: opt.ajaxUrl,
        data: {
            url: window.location.href
        },
        success: function (res) {
            if (res.success) {
                var value = res.value;
                wx.config({
                    debug: false,
                    appId: value.appId,
                    timestamp: value.timestamp,
                    nonceStr: value.nonceStr,
                    signature: value.signature,
                    jsApiList: [
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuShareQQ',
                        'onMenuShareQZone',
                        'onMenuShareWeibo'
                    ]
                });
                wx.ready(function () {
                    if (value.appId) {
                        var shareData = {
                            title: opt.title,
                            desc: opt.desc,
                            link: opt.link,
                            imgUrl: opt.imgUrl
                        };
                        wx.onMenuShareAppMessage(shareData);
                        wx.onMenuShareTimeline(shareData);
                        wx.onMenuShareQQ(shareData);
                        wx.onMenuShareQZone(shareData);
                        wx.onMenuShareWeibo(shareData);
                    }
                });
            }
        },
        error: function () {
            jx_common.tip("网络未连接!");
        }
    });
}