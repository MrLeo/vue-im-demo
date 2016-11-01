/**
 * @Date: 2016/10/31  0031  12:19
 * @Author: lxbin
 *
 * Created with JetBrains WebStorm.
 */
import Vue from 'vue'

const Indicator = Vue.extend(require('./indicator.vue'))
let instance
let timer

module.exports = {
    open(options = {}) {
        if (!instance) {
            instance = new Indicator().$mount(document.createElement('div'))
        }
        if (instance.visible) return
        instance.text = typeof options === 'string' ? options : options.text || ''
        instance.spinnerType = options.spinnerType || 'snake'
        document.body.appendChild(instance.$el)
        if (timer) {
            clearTimeout(timer)
        }
        Vue.nextTick(() => {
            instance.visible = true
        })
    },

    close() {
        if (instance) {
            Vue.nextTick(() => {
                instance.visible = false
                timer = setTimeout(() => {
                    if (instance.$el) {
                        instance.$el.style.display = 'none'
                    }
                }, 400)
            })
        }
    }
}