/**
 * Created by humorHan on 2017/10/24.
 */
var mobileSwiper = require('util/new-swiper.js');
window.onload = function () {
    mobileSwiper.init('.wrapper', {
        autoPlay: '5000',
        slideCb: function () {
            console.log('触发了滑动应该执行的函数');
        },
        pre: '.pre'
    });
};