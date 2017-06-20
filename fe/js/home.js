/**
 * Created by humorHan on 2017/5/23.
 */
require("home.scss");
let ajax = require("util/ajax.js");
let articleTpl = require('articles.tpl');
require('util/template-helper.js');

let main = {
    init(){
        this.requestArticles();
    },
    requestArticles(){
        ajax({
            url: '/getArticles',
            success(data) {
                $(".wrapper").html(articleTpl(data));
            }
        });
    }
};
$(function () {
    main.init();
});