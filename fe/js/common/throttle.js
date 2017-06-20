/**
 * Created by humorHan on 2017/6/20.
 */
let main = {
    top: null,
    timer: null,
    startTime: new Date(), // 给节流防抖用
    navShow(dom){
        let _this = this,
            $nav = $(".nav");
        if (!_this.top) {
            _this.top = $(window).scrollTop();
        }
        if (_this.top > $(window).scrollTop()) {
            $nav.fadeIn('fast');
        } else {
            $nav.fadeOut('fast');
        }
        _this.top = $(window).scrollTop();
    },
    throttle(time, mustTime){
        let _this = this,
            curTime = new Date();
        _this.timer && clearTimeout(_this.timer);

        if (curTime - _this.startTime >= mustTime) {
            _this.navShow();
            _this.startTime = curTime;
        } else {
            _this.timer = setTimeout(function () {
                _this.navShow();
            }, time);
        }
    },
    initBtns(time, mustTime){
        let _this = this;
        $(window).on("scroll", function () {
            _this.throttle(time, mustTime);
        });
    }
};

/**
 * 节流 + 防抖
 * @param time     防抖中定时器的时长
 * @param mustTime 节流中必须执行的时间间隔
 */
module.exports = function (time, mustTime) {
    main.initBtns(time, mustTime);
};