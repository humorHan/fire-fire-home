/**
 * Created by humorHan on 2017/7/13.
 */
let ajax = require("util/ajax.js");
let tool = require("util/tool.js");

let main = {
    visitAnalysis: function () {
        let articleId = tool.getParams('articleId');
        if (articleId) {
            ajax({
                type: 'post',
                url: '/addArticleVisitNum',
                data: {
                    articleId: articleId
                },
                success: function (data) {
                    if (data.status === 1) {
                        console.log(data);
                    }
                }
            });
        }
    }
};

module.exports = {
    init: function () {
        setTimeout(() => {
            main.visitAnalysis();
        }, 500)
    }
};