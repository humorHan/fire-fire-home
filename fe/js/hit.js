/**
 * Created by humorHan on 2017/5/24.
 */
let hit = {
    c: document.getElementById("hit"),
    cxt: null,
    x: 230,
    y: 220,
    mx: 3,
    my: -2,
    init() {
        this.cxt = this.c.getContext("2d");
        this.cxt.drawImage(this.circleSprite(), this.x, this.y);
        this.cxt.fillStyle = "gray";
        this.cxt.fillRect(100, 100, 100, 10);
        //this.cxt.drawImage(this.circleSprite(), 100, 100);
        this.run();
    },
    run(){
        this.cxt.clearRect(this.x, this.y, 40, 40);
        this.x += this.mx;
        this.y += this.my;
        this.x >= 460 || this.x <= 0 ? this.mx *= -1: '';
        this.y >= 260 || this.y <= 0 ? this.my *= -1 : '';
        if (this.x <= 200 && this.x >= 60 && this.y >= 60  && this.y <= 110) {
            this.my *= -1;
        }
        this.cxt.drawImage(this.circleSprite(), this.x, this.y);
        this.timer = requestAnimationFrame(() => {
            this.run();
        })
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
        cxt.arc(20, 20, 20, 0, Math.PI * 2, true);
        cxt.fill();
        return canvas;
    }
};
window.onload = function () {
    hit.init();
};
