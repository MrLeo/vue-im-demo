/**
 * @Date: 2016/10/27  0027  9:43
 * @Author: lxbin
 *
 * Created with JetBrains WebStorm.
 */

/**
 * 跳转到详情页
 * @param id url参数
 * @param storageData 需要存storage的参数
 * {
 *      "detailTitle":p_name,
 *      "detailTel":tel,
 *      "detailXY":zuobiao
 * }
 */
export function goToDetail(id, storageData) {
    window.localStorage.setItem('detailTitle', storageData['p_name'])
    window.localStorage.setItem('detailTel', storageData['tel'])
    window.localStorage.setItem('detailXY', storageData['zuobiao'])
    window.location.href = 'detail_product.html?id=' + id
}