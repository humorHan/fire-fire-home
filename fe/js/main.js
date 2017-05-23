/**
 * Created by humorHan on 2017/5/23.
 */
let ajax = require("util/ajax.js");

let main = {
    init(){
        this.requestArticles();
    },
    requestArticles(){
        ajax({
            url: '/getArticles',
            success(data) {
                console.log(data);
            }
        });
    }
};
$(function(){
    main.init();
});