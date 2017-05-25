/**
 * Created by humorHan on 2017/5/25.
 */
require("gould.scss");

let main = {
    map: null,
    marker: null,
    init: function () {
        let _this = this;
        // 初始化地图
        _this.map = new AMap.Map('container', {
            resizeEnable: true,
            zoom: 10,
            center: [116.480983, 40.0958]
        });
        // 添加标记
        _this.marker = new AMap.Marker({
            position: [116.480983, 39.989628],//marker所在的位置
            map: _this.map//创建时直接赋予map属性
        }).setMap(_this.map);
        // 添加工具栏
        _this.map.plugin(["AMap.ToolBar", 'AMap.Scale', 'AMap.MapType', "AMap.AdvancedInfoWindow"], function () {
            _this.map.addControl(new AMap.ToolBar());
            _this.map.addControl(new AMap.Scale());
            _this.map.addControl(new AMap.MapType());
            let infowindow = new AMap.AdvancedInfoWindow({
                content: '<div class="info-title">高德地图</div><div class="info-content">' +
                '<img src="http://webapi.amap.com/images/amap.jpg">' +
                '高德是中国领先的数字地图内容、导航和位置服务解决方案提供商。<br>' +
                '</div>',
                offset: new AMap.Pixel(0, -30)
            });
            infowindow.open(_this.map, [116.480983, 39.989628]);
        });
        // 驾车
        _this.map.plugin(["AMap.Driving"], function () {
            let drivingOption = {
                policy: AMap.DrivingPolicy.LEAST_TIME,
                map: _this.map
            };
            let driving = new AMap.Driving(drivingOption); //构造驾车导航类
            driving.search(
                [{keyword: '北京站'}, {keyword: '北京大学'}],
                function (status, result) {

                });
        });
    }
};
window.onload = function () {
    main.init();
};
