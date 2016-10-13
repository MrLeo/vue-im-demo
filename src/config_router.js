import pcLogin from 'views/pc/login'

import h5Login from 'views/h5/login'

export function configRouter(router) {
    router.map({
            '/pc/login': {
                name: 'pclogin',
                title: 'PC端登录',
                component: pcLogin
            },
            '/pc/index': {
                name: 'pcindex',
                title: 'PC端首页',
                component: (resolve) => require(['views/pc/index'], resolve),
                subRoutes: {
                    '/chat/:id/:name': {
                        name: 'pcChat',
                        title: 'PC端对话框',
                        component: (resolve) => require(['views/pc/chat'], resolve)
                    }
                }
            },
            '/h5/login': {
                name: 'h5login',
                title: '移动端登录',
                component: h5Login
            },
            '/h5/index': {
                name: 'h5index',
                title: '移动端首页',
                component: (resolve) => require(['views/h5/index'], resolve),
                subRoutes: {
                    '/chat/:id/:name': {
                        name: 'h5Chat',
                        title: '移动端对话框',
                        component: (resolve) => require(['views/h5/chat'], resolve)
                    }
                }
            }
        }
    )

    router.redirect({
        '/': '/pc/login'
    })

    router.beforeEach(function () {
        window.scrollTo(0, window.height)
    })

    /**
     * document title change
     */
    // router.afterEach((transition) => {
    //     document.title = transition.to.title || '直播分享'
    //     if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
    //         let src = '/static/fixrouter.html?' + Math.random()
    //         iframeLoad(src)
    //     }
    // })

    /**
     * fix ios title刷新不了的bug
     * @iframeLoad
     * @author hiluluke
     */
    // const iframeLoad = function (src) {
    //     let iframe = document.createElement('iframe')
    //     iframe.style.display = 'none'
    //     iframe.src = src
    //     document.body.appendChild(iframe)
    //     iframe.addEventListener('load', function () {
    //         setTimeout(function () {
    //             iframe.remove()
    //         }, 0)
    //     })
    // }

}
