/**
 * 相当于 vuex 的计算属性
 * @param state
 */

export const baseInfo = state=>state.base

//export const cartProducts = state => {
//    return state.cart.added.map(({id, quantity}) => {
//        const product = state.products.all.find(p => p.id === id)
//        return {
//            title: product.title,
//            price: product.price,
//            quantity
//        }
//    })
//}