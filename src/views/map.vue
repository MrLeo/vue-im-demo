/**
* @Date: 2016/10/21  0021  16:02
* @Author: lxbin
* Created with JetBrains WebStorm.
*/
<template>
    <div id="map"></div>
</template>
<script>
    import {mapState, mapGetters, mapActions} from 'vuex'
    import * as types from '../store/mutation-types'
    export default{
        name: 'map',
        data(){
            return {
                map: null,
                markers: [],
                markderLevel: 1
            }
        },
        computed: {
            ...mapState({
                indexSearch: state=>state.base.indexSearch
                //mapList: state => state.base.mapList,
            }),
            ...mapGetters({
                baseInfo: 'baseInfo'
            })
        },
        watch: {
            "indexSearch": {
                deep: true,
                handler: function (val, oldVal) {
                    const _vm = this
                    console.log('[Leo]indexSearch has be change => ', JSON.stringify(val))
                    if (!val.empty) {
                        _vm.setSecondLevelMarker().then(res=> {
                            //_vm.map.setZoomAndCenter(14, e.target.data.dqzuobiao.split(','))
                            //_vm.map.setFitView(_vm.markers)//地图调整到合适的范围来显示我们需要展示的markers。
                        })
                    }
                }
            }
        },
        methods: {
            ...mapActions([
                'setRoadList',
                'setMapList'
            ]),
            init(){
                const _vm = this
                _vm.map = new AMap.Map('map', {
                    center: [116.398075, 39.908149],//[39.911940136336277, 116.40602523623816],
                    zoom: 8
                })
                _vm.map.plugin(["AMap.ToolBar"], function () {
                    _vm.map.addControl(new AMap.ToolBar())
                })
                let maps = _vm.setRoadList()//获取初始一级覆盖物
                maps.then(res=> {
                    _vm.setFirstLevelMarker()
                })

                _vm.$store.state.base.tempVm.$on('resetSearchInfo', function () {
                    console.log('[Leo]resetSearchInfo => ')
                    _vm.setFirstLevelMarker()
                    _vm.map.setFitView(_vm.markers)//地图调整到合适的范围来显示我们需要展示的markers。
                })

                //为地图绑定一个zoomend事件，当地图缩放结束后停留的级别小于8的时候将溢出所有市一级的标记
                var _onZoomEnd = function (e) {
                    console.log('[Leo]缩放级别 => ', _vm.map.getZoom())
                    if (_vm.map.getZoom() >= 13) {
                        console.log('[Leo]缩放级别大于13 => 中心点坐标 => ', JSON.stringify(_vm.map.getCenter()))
                        let curCenter = _vm.map.getCenter()
                        _vm.$store.commit(types.SET_INDEX_SEARCH_INFO, {dqzuobiao: [curCenter.lat, curCenter.lng].join(",")})
                        _vm.setSecondLevelMarker().then(res=> {
                            //_vm.map.setZoomAndCenter(14, e.target.data.dqzuobiao.split(','))
                            //_vm.map.setFitView(_vm.markers)//地图调整到合适的范围来显示我们需要展示的markers。
                        })
                    }
                }
                AMap.event.addListener(_vm.map, 'zoomend', _onZoomEnd);

                //使用监听，因为后面查询条件改变后需要重新渲染
                /* _vm.$store.watch(function (state) {
                 return state.base.mapList
                 }, function (val) {
                 })*/
            },
            createMarker(data, className = "map-marker", hide = false){
                const _vm = this
                //http://lbs.amap.com/api/javascript-api/guide/draw-on-map/marker-point/Marker多级展示的交互实现 + 绑定事件完成交互
                // 自定义点标记内容
                var markerContent = document.createElement("div")
                // 点标记中的文本
                markerContent.className = className
                markerContent.innerHTML = data.info || "<img src='http://webapi.amap.com/theme/v1.3/markers/n/mark_r.png'>"
                // 点标记中的图标
                //var markerImg = document.createElement("img")
                //markerImg.className = "markerlnglat"
                //markerImg.src = "http://webapi.amap.com/theme/v1.3/markers/n/mark_r.png"
                //markerContent.appendChild(markerImg)
                //定义marker
                let marker = new AMap.Marker({
                    //icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
                    content: markerContent,
                    //title:data.name,
                    //offset: new AMap.Pixel(-30, 5),
                    //zIndex: data.count
                    position: data.position || [116.398075, 39.908149]//[39.911940136336277, 116.40602523623816]
                });
                marker.subMarkers = []
                marker.data = {}
                if (!hide) {
                    marker.setMap(_vm.map)
                }
                // //设置子marker
                // if (data.subMarkers && data.subMarkers.length) {
                //     for (var i = 0; i < data.subMarkers.length; i += 1) {
                //         marker.subMarkers.push(createMarker('',data.subMarkers[i], true))
                //     }
                // }
                return marker
            },
            setFirstLevelMarker(){
                const _vm = this
                //移除旧的marker
                _vm.markers && _vm.map.remove(_vm.markers) || _vm.map.clearMap()
                _vm.markers = []
                _vm.$store.state.base.roadList.filter(function (item) {
                    if (item.zuobiao && item.zuobiao.length > 1) {
                        let marker = _vm.createMarker({
                            position: item.zuobiao.split(','),
                            info: `<p>${item.t_name}</p><p>${item.count}</p>`
                        }, 'map-marker')
                        marker.data['id'] = item.id
                        marker.data['dqzuobiao'] = item.zuobiao
                        _vm.markers.push(marker)
                        //_vm.map.setFitView(_vm.markers)//地图调整到合适的范围来显示我们需要展示的markers。
                        AMap.event.addListener(marker, 'click', function (e) {
                            _vm.$store.commit(types.SET_INDEX_SEARCH_INFO, {quyu: e.target.data.id})
                            _vm.setSecondLevelMarker().then(res=> {
                                //_vm.map.setZoomAndCenter(14, e.target.data.dqzuobiao.split(','))
                                _vm.map.setFitView(_vm.markers)//地图调整到合适的范围来显示我们需要展示的markers。
                            })
                        });
                    }
                })
            },
            setSecondLevelMarker(){
                const _vm = this
                //移除旧的marker
                _vm.markers && _vm.map.remove(_vm.markers) || _vm.map.clearMap()
                _vm.markers = []

                return _vm.setMapList().then(function (res) {
                    for (let item of res) {
                        if (item.zuobiao && item.zuobiao.length > 1) {
                            let marker = _vm.createMarker({
                                position: item.zuobiao.split(','),
                                info: `<p>${item.p_name}</p><p>${item['jiage']}</p>`
                            }, 'map-marker__2')

                            //详情页面需要的参数
                            marker.data['id'] = item.id
                            marker.data['zuobian'] = item.zuobiao
                            marker.data['tel'] = item.tel
                            marker.data['jiage'] = item.jiage
                            marker.data['name'] = item.p_name

                            _vm.markers.push(marker)
                            //_vm.map.setFitView(_vm.markers)//地图调整到合适的范围来显示我们需要展示的markers。
                            AMap.event.addListener(marker, 'click', _vm.clicksecondLevelMarker);
                        }
                    }
                    return res
                })
            },
            clicksecondLevelMarker(e){
                let data = e.target.data
                console.log('[Leo]点击二级覆盖物 => 进入详情页 => ', data)
                window.localStorage.setItem('detailTitle', data['name'])
                window.localStorage.setItem('detailTel', data['tel'])
                window.localStorage.setItem('detailXY', data['zuobian'])
                //window.location.href = 'h5/view/product_info.php?id=' + data['id']
                window.location.href = 'detail_product.html?id=' + data['id']
            }
        },
        created(){
        },
        mounted(){
            const _vm = this
            _vm.$nextTick(function () {
                _vm.init()
            })
        }
    }
</script>
<style>
    #map {
        width: 100%;
        height: 100%;
    }

    .map-marker,
    .map-marker__2 {
        width: 50px;
        height: 50px;
        border: 1px solid #fff;
        background-color: red;
        text-align: center;
        color: #fff;
        font-family: "Microsoft YaHei UI", "微软雅黑", Verdana, sans-serif;
        overflow: hidden;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -webkit-align-items: center;
        align-items: center;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -webkit-flex-direction: column;
        flex-direction: column;
    }

    .map-marker {
        border-radius: 50%;
    }

    .map-marker__2 {
        border-radius: 10px;
        width: auto;
        white-space: nowrap;
        line-height: 20px;
        height: 40px;
        padding: 0 5px;
    }

    .amap-marker {
        -moz-transform: rotate(0deg) translate(-50%, -50%) !important;
        -webkit-transform: rotate(0deg) translate(-50%, -50%) !important;
        transform: rotate(0deg) translate(-50%, -50%) !important;
    }
</style>
