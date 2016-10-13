/**
 * 自定义过滤器
 */
let _filters = {}

_filters.install = function (Vue) {
    /**
     * 时间格式化
     *   对Date的扩展，将 Date 转化为指定格式的String
     *   月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
     *   年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
     *   例子：
     *   (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
     *   (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
     */
    Vue.filter('fmtDate', (_date, fmt)=> {
        var date = new Date(_date)
        var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    })

    /**
     * 完整日期时间格式化
     */
    Vue.filter('fullDate', val => {
        let date = new Date(val)
        return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
    })

    /**
     * 字符串倒序
     * 单向过滤器
     */
    Vue.filter('reverse', function (value) {
        return value.split('').reverse().join('')
    })

    /**
     * 价格格式化
     * 双向过滤器
     */
    Vue.filter('currencyDisplay', {
        // model -> view
        // 在更新 `<input>` 元素之前格式化值
        read: function (val) {
            return '$' + val.toFixed(2)
        },
        // view -> model
        // 在写回数据之前格式化值
        write: function (val, oldVal) {
            var number = +val.replace(/[^\d.]/g, '')
            return isNaN(number) ? 0 : parseFloat(number.toFixed(2))
        }
    })

    Vue.filter('canvertUrl', function (val) {
        if (!val) {
            return '/static/img/logo_default_s.jpg'
        }
        /*else if (/^http/.test(val)) {*/
        return val
        /*}
         return "//" + val*/
    })
}
export default _filters

///**
// * 时间格式化
// *   对Date的扩展，将 Date 转化为指定格式的String
// *   月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// *   年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// *   例子：
// *   (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// *   (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
// *  //author: meizz
// */
//_filters.fmtDate = function (_date, fmt) {
//    var date = new Date(_date)
//    var o = {
//        "M+": date.getMonth() + 1, //月份
//        "d+": date.getDate(), //日
//        "h+": date.getHours(), //小时
//        "m+": date.getMinutes(), //分
//        "s+": date.getSeconds(), //秒
//        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
//        "S": date.getMilliseconds() //毫秒
//    };
//    if (/(y+)/.test(fmt))
//        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
//    for (var k in o)
//        if (new RegExp("(" + k + ")").test(fmt))
//            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
//    return fmt;
//}
//export default (Vue) => {
//    Object.keys(_filters).forEach(key => {
//        Vue.filter(key, _filters[key])
//    })
//}