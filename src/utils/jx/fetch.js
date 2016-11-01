/**
 * @Date: 2016/10/28  0028  9:15
 * @Author: lxbin
 *
 * Created with JetBrains WebStorm.
 */

import md5 from 'blueimp-md5'
import _wap_config from './config'
import jx_common from './common'

function encryptRequestParam(option) {
    let params = {}
    try {
        params._sm = _wap_config.sm
        params._aid = _self.getAid();
        params._domid = _wap_config.domid;
        params._ft = _wap_config.ft;
        params._ch = _self.getCh();
        params._tk = jx_common.getTk();
        params._uid = jx_common.getUid();
        params._did = jx_common.getDid();
        params._dsig = jx_common.getDsig();
        Object.assign(params, option)
        let keys = Object.keys(params).sort()
        for (let key of keys) {
            s = s + key + '=' + params[key];
        }
        s += _wap_config.domainUrl;
        params._sig = md5(s);
        return params;
    } catch (e) {
        jx_common.tip("本地加签错误")
        return params
    }
}

function getCh() {
    let ch = jx_common.getCookie("jx_ch");
    if (!jx_common.isNull(ch)) {
        return ch;
    }
    if (jx_common.isInJXApp()) {
        return _wap_config.ch.jxapp;
    }
    if (jx_common.isWxbrowser()) {
        return _wap_config.ch.weixin;
    }
    return _wap_config.ch.jxwap;
}

function getAid() {
    if (jx_common.isInJXApp()) {
        return _wap_config.aid.jxapp;
    }
    if (jx_common.isWxbrowser()) {
        return _wap_config.aid.weixin;
    }
    return _wap_config.aid.wap;
}

function checkStatus(response) {
    if (response.status == 'timeout') {
        jx_common.tip("系统超时")
        const error = new Error("系统超时")
        error.response = response
        throw error
    } else if (response.status <= 200 && response.status >= 300) {
        jx_common.tip("系统繁忙")
        const error = new Error("系统繁忙")
        error.response = response
        throw error
    }
    return response;
}

function parseJSON(response) {
    if (!response) {
        jx_common.tip("api无数据返回")
        const error = new Error("api无数据返回")
        error.response = response
        throw error
        return
    }
    if (response["stat"]["code"] == "-160"
        || response["stat"]["code"] == "-360") {
        //if (jx_common.isInJXApp()) {
        //    jx_common.cleanCookie("_wtk");
        //    jx_common.cleanCookie("_uid");
        //} else {
        //    jx_common.cleanCookie("jx_token");
        //    jx_common.cleanCookie("jx_uid");
        //    jx_common.cleanCookie("jx_u_phone");
        //}
        //if (noLoginCallback && typeof noLoginCallback == "function") {
        //    noLoginCallback();
        //    return false;
        //}
        //if (jx_common.isInJXApp()) {
        //    jx_common_app.openAppLogin();
        //} else {
        jx_common.tip("token失效重新登录")
        const error = new Error("token失效重新登录")
        error.response = response
        throw error
        //    window.setTimeout(function () {
        //        jx_common.openUrl("../../view/login/login.html?returnUrl=" + encodeURIComponent(window.location.href));
        //    }, 1000);
        //}
        return
    }
    if (response["stat"]["code"] == "-260") {
        jx_common.tip("请输入正确验证码");
        const error = new Error("请输入正确验证码")
        error.response = response
        throw error
        return
    }
    if (response["stat"]["code"] != 0) {
        jx_common.tip("api错误(" + response["stat"]["code"] + ")")
        const error = new Error("api错误(" + response["stat"]["code"] + ")")
        error.response = response
        throw error
        return
    }
    if (jx_common.isNull(response["content"])) {
        jx_common.tip("无结果数据");
        return
    }
    if (response["stat"]["stateList"][0]["code"] == "-100") {
        jx_common.tip("服务器开小差!");
        return
    }
    return response.json()
}

export function fetch(url, options) {
    return fetch(url, options)
        .then(checkStatus)
        .then(parseJSON)
        //.then((data) => ({data}))
        .catch((err) => ({err}))
}