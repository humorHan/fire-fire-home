/**
 * Created by humorHan on 2017/6/20.
 */
let ajax = require("util/ajax.js");

module.exports = function () {
    $("body").append('<link rel="stylesheet" href="http://cache.amap.com/lbs/static/main1119.css"/> <script type="text/javascript" src="http://webapi.amap.com/maps?v=1.3&key=e06989660981774208611ddebde4fa88"></script>');
    $("body").append("<div style='display:none' id='map'></div>");
    let timer = setInterval(() => {
        if (typeof(AMap) === 'undefined') {
            return false;
        } else {
            clearInterval(timer);
            timer = null;
            let map,
                geolocation;
            //加载地图，调用浏览器定位服务
            map = new AMap.Map('map', {
                resizeEnable: true
            });
            map.plugin('AMap.Geolocation', function () {
                geolocation = new AMap.Geolocation({
                    enableHighAccuracy: true,//是否使用高精度定位，默认:true
                    timeout: 15000,          //超过10秒后停止定位，默认：无穷大
                    buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                    zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                    buttonPosition: 'RB'
                });
                map.addControl(geolocation);
                geolocation.getCurrentPosition();
                AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
                AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
            });
        }
    }, 1000);
};
//解析定位结果
function onComplete(data) {
    //console.log(data);
    ajax({
        type: 'POST',
        url: '/position/addPosition',
        data: {
            locationType: data['location_type'],
            position: JSON.stringify(data.position),
            formattedAddress: data.formattedAddress,
            addressComponent: JSON.stringify(data.addressComponent),
            isConverted: data.isConverted,
            visitTime: +new Date()
        },
        success: function (data) {
            if (data.status === 1) {
                console.log(data);
            }
        }
    });
}

//解析定位错误信息
function onError(data) {
    throw Error('定位失败');
}