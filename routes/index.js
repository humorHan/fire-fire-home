let express = require('express');
let router = express.Router();
let EventProxy = require('eventproxy');
let connect = require('./base.js');
let SQL = {
    'getArticles': 'select * from fireFireHome.articles',
    'addArticles': 'insert into fireFireHome.articles(title, type, original, label, createTime, summary, articleURL, readNum, star) values(?, ?, ?, ?, ?, ?, ?, ?, ?)'
};

// 获取文章
router.get('/getArticles', function (req, res, next) {
    let ep = new EventProxy();
    connect({
        sql: SQL.getArticles,
        cb: function (result) {
            ep.emit('getArticles', result);
        }
    });
    ep.on("getArticles", function (data) {
        res.json(data);
    });
});

// 添加新文章
router.post('/addArticle', function (req, res, next) {
    let ep = new EventProxy();
    let body = req.body;
    //校验参数
    if (checkParamNull(ep, res, [
        {
            param: body.title,
            tip: '标题不可为空'
        }, {
            param: body.articleURL,
            tip: '文章名称(地址)不能为空'
        }
    ])){
        return false;
    }

    connect({
        sql: SQL.addArticles,
        param: [body.title, body.type, body.original, body.label, body.createTime, body.summary, body.articleURL, body.readNum || 0, body.star || 0],
        cb: function (result) {
            return ep.emit('addArticle', result);
        }
    });
    ep.on("addArticle", function (data) {
        return res.json(data);
    });
});

module.exports = router;

/**
 * 校验参数是否为空函数
 * @param ep    ep
 * @param res   响应
 * @param arr   需要校验的参数数组以及对应的提示
 * @returns {boolean} 是否为空
 */
function checkParamNull(ep, res, arr) {
    // 校验数据
    ep.fail(function (err) {
        console.error('********************停下来吧小伙子，出错啦***************************');
        console.error(err);
        console.error('********************停下来吧小伙子，出错啦***************************');
        res.json({
            status: -1,
            message: err,
            data: null
        });
    });

    for (let i = 0,len = arr.length; i++ < len;){
        if (!arr[i].param) {
            ep.emit('error', arr[i].tip);
            return true;
        }
    }
}
