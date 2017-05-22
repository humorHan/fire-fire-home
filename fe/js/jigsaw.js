/**
 * Created by humorHan on 2017/5/8.
 */
require("jigsaw.scss");
var dragUtil = require("util/drag-util.js");

var main = {
    $items: $(".item"),
    direction: false,  // 拖动方向
    init: function () {
        var _this = this;
        _this.$items.map((index) => {
            dragUtil({
                clickDom: ".item" + (index + 1),
                cb: _this.drag,
                asd: ".item" + (index)
            });
        });
    },
    /**
     * 拖动
     * @param x    点击点的绝对位置横坐标
     * @param y    点击点的绝对位置纵坐标
     * @param cx   滑动点的绝对位置横坐标
     * @param cy   滑动点的绝对位置纵坐标
     */
    drag: function (x, y, cx, cy) {
        main.judgeDirection(x, y, cx, cy);
    },
    /* 判断滑动方向--判断角度 */
    judgeDirection: function(x, y, cx, cy){
        let _this = this;
        let xDeviation = cx - x,
            yDeviation = cy - y;
        //console.log(x, y, cx, cy);
        let dif = Math.abs(xDeviation) - Math.abs(yDeviation);
        if (dif >= 0) {
            _this.direction = xDeviation > 0 ? 'right' : 'left';
        } else {
            _this.direction = yDeviation > 0 ? 'bottom' : 'top';
        }
        console.log(_this.direction);
        //debugger
    }
};
$(function () {
    main.init();
});