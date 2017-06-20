/**
 * Created by humorHan on 2017/6/14.
 */
let addPosition = require('./addPosition.js');
let throttle = require('./throttle.js');
let sourceCode = require('./sourceCode.js');

let main = {
    top: null,
    timer: null,
    startTime: new Date(),  //给节流防抖用
    init(){
        addPosition();
        throttle(20, 2000);
        sourceCode();
    }
};

(function () {
    main.init();
})();