/**
 * @Date: 2016/10/18  0018  11:29
 * @Author: lxbin
 *
 * Created with JetBrains WebStorm.
 */

/**
 * 注册一个全局自定义指令 v-focus
 * @example <input v-focus>
 */
Vue.directive('focus', {
    bind(el, binding, vnode, oldVnode){
    },//只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个在绑定时执行一次的初始化动作。
    // 当绑定元素插入到 DOM 中。
    inserted (el) {
        // 聚焦元素
        el.focus()
    },//被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于 document 中）。
    update(el){
    },//被绑定元素所在的模板更新时调用，而不论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新。
    componentUpdated(el){
    },//被绑定元素所在模板完成一次更新周期时调用。
    unbind(el){
    }// 只调用一次， 指令与元素解绑时调用。
})
