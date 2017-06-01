/**
 * Created by humorHan on 2017/6/1.
 */
require("backstage.scss");
var ajax = require("util/ajax.js");

var main = {
    initBtns(){
        let _this = this;
        // submit
        $(".submit").on("click", function () {
            _this.submit();
        });
    },
    submit(){
        let data = {
            type: $(".type").val(),
            original: $("input[name='original']:checked").index() === 0 ? '1' : '0',
            articleURL: $(".articleURL").val(),
            title: $(".articleTitle").val(),
            label: $(".article-label").val(),
            summary: $(".summary").val(),
            createTime: +new Date()
        };
       /* if (!($.trim(data.title) && $.trim(data.articleURL))){
            alert ('文章标题都不可为空');
            return false;
        }*/
        ajax({
            type: 'POST',
            url: '/addArticle',
            data: data,
            success: function (data) {
                if (data.status === 1) {

                }
            }
        });
    }
};

$(function () {
    main.initBtns();
});