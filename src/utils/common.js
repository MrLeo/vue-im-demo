/**
 * @Date: 2016/10/8  0008  11:40
 * @Author: lxbin
 *
 * Created with JetBrains WebStorm.
 */

export default {
    /*
     客户端根据时间和随机数生成uid,这样使得聊天室用户名称可以重复。
     实际项目中，如果是需要用户登录，那么直接采用用户的uid来做标识就可以
     */
    genUid: function () {
        return (new Date()).getTime() + "" + Math.floor(Math.random() * 899 + 100);
    },
}