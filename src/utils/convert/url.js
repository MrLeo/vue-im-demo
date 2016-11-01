/**
 * @Date: 2016/10/27  0027  13:06
 * @Author: lxbin
 *
 * Created with JetBrains WebStorm.
 */

/**
 * 将 JSON 或 字符串 转换成URL参数
 * @param {json} param 待转换的JSON
 * @param {string} key url参数前缀
 * @returns {string} "name=tom&class.className=class1&classMates[0].name=lily"
 * @example
 *      var obj={name:'tom','class':{className:'class1'},classMates:[{name:'lily'}]}
 *      parseParam(obj) => "name=tom&class.className=class1&classMates[0].name=lily"
 *      parseParam(obj,'stu') => "stu.name=tom&stu.class.className=class1&stu.classMates[0].name=lily"
 */
export function parseParam(param, key) {
    var paramStr = ""
    if (param instanceof String
        || param instanceof Number
        || param instanceof Boolean) {
        paramStr += "&" + key + "=" + encodeURIComponent(param)
    }
    else {
        for (let i in param) {
            vark = key == null ? i : key + (param instanceof Array ? "[" + i + "]" : "." + i)
            paramStr += '&' + parseParam(this, k)
        }
    }
    console.log('[Leo]parseParam => ', paramStr)
    return paramStr.substr(1)
}