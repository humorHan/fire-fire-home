/**
 * Created by humorHan on 2017/7/4.
 */
let main = {
    $welcomeWrap: null,
    init(){
        $("body").append('<div class="welcome-wrap animated"><img class="welcome animated infinite fly" src="../img/welcome.png"></div>');
        this.$welcomeWrap = $(".welcome-wrap");
        this.welcomePosition();
    },
    welcomePosition(){
        let _this = this;
        _this.$welcomeWrap.css({
            'left': _this.ceilNum(80, 10) + '%',
            'top': _this.ceilNum(30, 20)  + '%'
        }).addClass("fadeIn");
    },
    ceilNum(num1 = 1, num2 = 0){
        return Math.ceil(Math.random() * num1) + num2;
    },
    run(){
        let _this = this;
        _this.$welcomeWrap.animate({
            left: _this.ceilNum(80, 10) + '%',
            top:  _this.ceilNum(30, 20) + '%'
        }, 1000, 'swing');
    },
    initBtns(){
        let _this = this;
        _this.$welcomeWrap.on("click", function(){
            _this.run();
        });
    }
};

module.exports = function(time){
    setTimeout(function(){
        main.init();
        main.initBtns();
    }, time)
};