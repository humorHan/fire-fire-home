require('drag.scss');
var dragUtil = require("util/drag-util.js");

var main = {
    init: function(){
        dragUtil({
            clickDom: '#test .pop-title',
            moveDom: '#test'
        });
        dragUtil({
            clickDom: '#test2 .pop-title',
            moveDom: '#test2'
        });
    }
};

$(function(){
    main.init();
});