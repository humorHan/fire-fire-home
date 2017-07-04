/**
 * Created by humorHan on 2017/7/4.
 */
let main = {
    $welcome: null,
    init(){
        $("body").append('<div class="welcome-wrap animated"><img class="welcome animated infinite fly" src="../img/welcome.png"></div>');
        this.$welcome = $(".welcome");
        this.welcomePosition();
    },
    welcomePosition(){
        let _this = this;
        _this.$welcome.css({
            'left': _this.ceilNum(80, 10) + '%',
            'top': _this.ceilNum(30, 20)  + '%'
        });
        $(".welcome-wrap").addClass("fadeIn");
    },
    ceilNum(num1 = 1, num2 = 0){
        return Math.ceil(Math.random() * num1) + num2;
    },
    run(){
        let _this = this;
        //TODO 语言提示  然后执行下面动画 几次之后换question图片然后跳转到github
        _this.$welcome.animate({
            left: _this.ceilNum(80, 10) + '%',
            top:  _this.ceilNum(30, 20)  + '%'
        }, 1000, 'swing');
    },
    initBtns(){
        let _this = this;
        _this.$welcome.on("click", function(){
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