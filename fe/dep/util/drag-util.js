/**
 * Created by humorHan on 2017/5/8.
 */
function Drag(opts){
    if (typeof($) == 'undefined') {
        throw new Error('亲，请先引入jquery');
    }
    this.$clickDom = $(opts.clickDom);
    this.$moveDom = $(opts.moveDom || opts.clickDom);
    this.cb = opts.cb;
    this.isDragable = false;
    // 点击位置xy坐标和点击时候moveDom的xy
    this.x = '';
    this.y = '';
    this.mx = '';
    this.my = '';
    this.init();
}
Drag.prototype = {
    init: function(){
        this.initBtns();
    },
    initBtns: function(){
        let _this = this;
        _this.$clickDom.on("mousedown", function(event){
            let e = event || window.event;
            //e.stopPropagation();
            _this.x = e.pageX;
            _this.y = e.pageY;
            _this.mx = _this.$moveDom.position().left;
            _this.my = _this.$moveDom.position().top;
            _this.isDragable = true;
        });
        $(document).on("mousemove", function(event){
            //TODO 初始化多次的话会绑定多次 优化：1. 可以存在data里边虽然绑定多次但是可以只执行一次回调 2. 也可以再封装一个方法，初次调用初始化该方法以后不再初始化 两种方案各有利弊~
            if (_this.isDragable) {
                let e =  event || window.event;
                _this.$moveDom.css("left", e.pageX - _this.x + _this.mx);
                _this.$moveDom.css("top", e.pageY - _this.y + _this.my);
                //console.log(_this.x);
            }
        });
        $(document).on("mouseup", function(event){
            let e = event || window.event;
            _this.isDragable = false;
            _this.cb && _this.cb(_this.x, _this.y, e.pageX, e.pageY);
        });
    }
};

/*
 * 拖动
 * opts = {
 *    clickDom: clickDom,  // 拖动dom的可点击区域
 *    moveDom: moveDom,    // 拖动的dom -- 如果不传则是clickDom
 *    cb: cb               // 滑动触发的回调--是单纯地滑动改变位置还是有其他的操作
 * }
 */
module.exports = function(opts){
    return new Drag(opts);
};