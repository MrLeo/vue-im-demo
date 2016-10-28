/**
 * @Date: 2016/10/24  0024  21:30
 * @Author: lxbin
 *
 * Created with JetBrains WebStorm.
 */

/**
 * 获取当前坐标
 * @returns {Promise} 返回promise.then(position=>{})
 */
export default function getLocation() {
    return new Promise(function (resolve, reject) {
        var options = {
            enableHighAccuracy: true,
            maximumAge: 1000
        }
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    let longitude = position.coords.longitude//经度
                    let latitude = position.coords.latitude//纬度
                    //console.log('[Leo]当前坐标 => ', position)
                    resolve([longitude, latitude])
                },
                function (error) {
                    switch (error.code) {
                        case 1:
                            console.error('[Leo] => 位置服务被拒绝')
                            reject(new Error('位置服务被拒绝'))
                            break
                        case 2:
                            console.error('[Leo] => 暂时获取不到位置信息')
                            reject(new Error('暂时获取不到位置信息'))
                            break
                        case 3:
                            console.error('[Leo] => 获取信息超时')
                            reject(new Error('获取信息超时'))
                            break
                        case 4:
                            console.error('[Leo] => 未知错误')
                            reject(new Error('未知错误'))
                            break
                    }
                },
                options
            )
        } else {
            console.error('[Leo] => 浏览器不支持geolocation')
            reject(new Error('浏览器不支持geolocation'))
        }
    })
}
