/**
 * Created by humorHan on 2017/5/24.
 */
require('hit');
let hit = {
    c: document.getElementById("hit"),
    cxt: null,
    x: 230,
    y: 220,
    mx: 2,
    my: -2,
    init() {
        this.cxt = this.c.getContext("2d");
        this.cxt.drawImage(this.circleSprite(), this.x, this.y);
        this.cxt.fillStyle = "yellow";
        this.cxt.fillRect(100, 100, 100, 10);
        //this.cxt.drawImage(this.circleSprite(), 100, 100);
        this.run();
    },
    run(){
        this.cxt.clearRect(this.x, this.y, 40, 40);
        //监测边界
        this.x >= 460 || this.x <= 0 ? this.mx *= -1 : '';
        this.y >= 260 || this.y <= 0 ? this.my *= -1 : '';
        //碰撞检测
        if (this.x === 200 && this.y > 100 - 40 && this.y < 110) {              //在被撞物体右
            this.mx *= -1;
        } else if (this.y > 100 - 40 && this.y < 110 && this.x === 100 - 40) {  //在被撞物体左
            this.mx *= -1;
        } else if (this.y === 100 - 40 && this.x > 60 && this.x < 200) {        //在被撞物体上
            this.my *= -1;
        } else if (this.x > 60 && this.x < 200 && this.y === 110) {             //在被撞物体下
            this.my *= -1;
        }
        // 撞右上角
        if (this.x === 200 && this.y === 60) {
            if (this.mx > 0) {        //从上边撞过去的--y方向反弹
                this.my *= -1;
            } else if (this.my < 0) { //从右边撞过去的--x方向反弹
                this.mx *= -1;
            } else {                  //从右上角撞过去的--反弹 以下判断同理，不赘述
                this.mx *= -1;
                this.my *= -1;
            }
        } else if (this.x === 60 && this.y === 60) {
            if (this.mx < 0) {
                this.my *= -1;
            } else if (this.my < 0) {
                this.mx *= -1;
            } else {
                this.mx *= -1;
                this.my *= -1;
            }
        } else if (this.x === 60 && this.y === 110) {
            if (this.mx < 0) {
                this.my *= -1;
            } else if (this.my > 0) {
                this.mx *= -1;
            } else {
                this.mx *= -1;
                this.my *= -1;
            }
        } else if (this.x === 200 && this.y === 110) {
            if (this.mx > 0) {
                this.my *= -1;
            } else if (this.my > 0) {
                this.mx *= -1;
            } else {
                this.mx *= -1;
                this.my *= -1;
            }
        }
        this.x += this.mx;
        this.y += this.my;
        this.cxt.drawImage(this.circleSprite(), this.x, this.y);
        this.timer = requestAnimationFrame(() => {
            this.run();
        });
    },
    circleSprite(){
        let _this = this;
        let canvas = document.createElement("canvas"),
            cxt = canvas.getContext("2d");
        //canvas.width = _this.width;
        //canvas.height = _this.height;
        canvas.width = 40;
        canvas.height = 40;
        cxt.fillStyle = '#FF0000'/*_this.colors[Math.floor(Math.random() * _this.colors.length)]*/;
        //cxt.arc(20, 20, 20, 0, Math.PI * 2, true);
        cxt.fillRect(0, 0, 40, 40);
        cxt.fill();
        return canvas;
    }
};
window.onload = function () {
    hit.init();
};
