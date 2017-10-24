/**
 * Created by humorHan on 2017/9/25.
 */
(function (root, factory) {
    if (typeof exports === 'object' && typeof module === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else {
        root.mobileSwiper = factory();
    }
})(window, function () {
    return {
        version: '1.0.0',

        /**
         * 初始化插件
         * @param selector    插件最外层dom
         * @param opts        自定义参数
         */
        init: function (selector, opts) {
            this.opts = {
                autoPlay: opts.autoPlay || '3000',     //是否自动轮播，数值为自动轮播的时间--手动滑动一次后会停止自动轮播
                slideCb: opts.slideCb,                 //滑动回调
                leftSlideCb: opts.leftSlideCb,         //左滑回调
                rightSlideCb: opts.rightSlideCb,       //右滑回调
                pre: opts.pre,                         //用户自定义的左滑按钮的选择器
                next: opts.next                        //用户自定义的右滑按钮的选择器
            };
            this.container = document.querySelector(selector);
            this.handleError(!this.container, '未找到与之对应的dom，请核查！');
            this.initLogic();
            this.initBtns();
        },
        initBtns: function () {
            var _this = this;
            //滑动操作
            this.container.addEventListener('touchstart', this.touchStart.bind(this));
            this.container.addEventListener('touchmove', this.touchMove.bind(this));
            //绑定可以左滑的按钮
            if (_this.opts.pre) {
                _this.handleError(!document.querySelector(_this.opts.pre), '未找到' + _this.opts.pre + '选择器对应的节点，请核查');
                for (var m = 0, dom1 = document.querySelectorAll(_this.opts.pre), len1 = dom1.length; m < len1; m++) {
                    dom1[m].addEventListener("click", function () {
                        _this.swap('left');
                    });
                }
            }
            //绑定可以右滑的按钮
            if (_this.opts.next) {
                _this.handleError(!document.querySelector(_this.opts.next), '未找到' + _this.opts.next + '选择器对应的节点，请核查');
                for (var n = 0, dom2 = document.querySelectorAll(_this.opts.next), len2 = dom2.length; n < len2; n++) {
                    dom2[n].addEventListener("click", function () {
                        _this.swap('right');
                    });
                }
            }
        },
        initLogic: function () {
            this.container.style["-webkit-transform-style"] = "preserve-3d";
            this.items = this.container.querySelectorAll(".slide-item");
            this.length = this.items.length;
            this.queue = [];
            // 动画队列，根据queue队列而来--根据旋转swiper时队列的变化而来
            this.animationQueue = [];
            for (var i = 0; i < this.length; i++) {
                this.queue[i] = i;
            }
            this.handleError(this.length <= 1, '子项目小于两个就不要用滑动了吧？');
            this.css = [
                "-webkit-transition: -webkit-transform .3s ease; z-index: 3; -webkit-backface-visibility: hidden; -webkit-transform: translate3d(0, 0, 0) scale3d(1, 1, 1);",
                "-webkit-transition: -webkit-transform .3s ease; z-index: 2; -webkit-backface-visibility: hidden; -webkit-transform: translate3d(40%, 0, 0) scale3d(.8, .8, 1); -webkit-filter: blur(1px);filter: blur(1px);",
                "-webkit-transition: -webkit-transform .3s ease; z-index: 2; -webkit-backface-visibility: hidden; -webkit-transform: translate3d(-40%, 0, 0) scale3d(.8, .8, 1); -webkit-filter: blur(1px);filter: blur(1px);",
                "-webkit-transition: -webkit-transform .3s ease; z-index: 1; -webkit-backface-visibility: hidden; -webkit-transform: translate3d(80%, 0, 0) scale3d(.6, .6, 1); -webkit-filter: blur(2px);filter: blur(2px);",
                "-webkit-transition: -webkit-transform .3s ease; z-index: 1; -webkit-backface-visibility: hidden; -webkit-transform: translate3d(-80%, 0, 0) scale3d(.6, .6, 1); -webkit-filter: blur(2px);filter: blur(2px);"
            ];

            this.swap();
            this.customConfig();
        },
        /**
         * 自定义配置项
         */
        customConfig: function () {
            var _this = this;
            //自动轮播
            if (_this.opts.autoPlay) {
                _this.autoPlayTimer = setInterval(function () {
                    _this.swap("right");
                }, _this.opts.autoPlay);
            }
        },
        swap: function (direction) {
            var _this = this;
            this.autoPlayTimer && clearTimeout(this.autoPlayTimer);
            if (direction === 'left') {
                console.log("向左");
                _this.queue.push(_this.queue.shift());
                _this.lock = 0;
                _this.opts.slideCb && _this.opts.slideCb();
                _this.opts.leftSlideCb && _this.opts.leftSlideCb();
            } else if (direction === 'right') {
                console.log("向右");
                _this.lock = 0;
                _this.queue.unshift(_this.queue.pop());
                _this.opts.slideCb && _this.opts.slideCb();
                _this.opts.rightSlideCb && _this.opts.rightSlideCb();
            }
            //声明临时队列 用于得到滑动后队列的辅助变量
            var queue = [].concat(_this.queue);
            _this.animationQueue = [];
            var flag = false; //从队列 首 尾 取值的标志
            for (var jj = 0; jj < _this.length; jj++) {
                _this.animationQueue.push(flag ? queue.shift() : queue.pop());
                flag = !flag; // 取反
            }
            for (var j = 0; j < _this.animationQueue.length; j++) {
                _this.items[_this.animationQueue[j]].style.cssText = _this.css[j];
            }
        },
        touchStart: function (e) {
            var touch = e.targetTouches[0];
            this.x0 = touch.pageX;
            this.y0 = touch.pageY;
            this.hasmoved = 0;
            this.lock = 1;
        },
        touchMove: function (e) {
            if (!this.lock) return;
            var touch = e.targetTouches[0], x = touch.pageX, y = touch.pageY, offsetX = this.x0 - x,
                offsetY = this.y0 - y;
            // 阻止滚动
            this.hasmoved || (this.hasmoved = 1, Math.abs(offsetX) > Math.abs(offsetY) && e.preventDefault());
            if (offsetX <= -50) {
                // 向右
                this.swap("right");
            } else if (offsetX >= 50) {
                // 向左
                this.swap("left");
            }
        },
        /********************** 以下是辅助功能性函数，和插件逻辑无关 ************************/
        /**
         * 抛出错误
         * @param condition 当...条件下
         * @param msg       抛出错误的显示文字
         */
        handleError: function (condition, msg) {
            if (condition) {
                throw new Error(msg);
            }
        }
    }
});