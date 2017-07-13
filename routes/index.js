let express = require('express');
let router = express.Router();
let EventProxy = require('eventproxy');
let connect = require('./base.js');
let checkParamNull = require("./dep/checkParamNull.js");
let SQL = {
    'getArticles': 'select * from fireFireHome.articles',
    'addArticles': 'insert into fireFireHome.articles(title, type, original, label, createTime, summary, articleURL, readNum, star) values(?, ?, ?, ?, ?, ?, ?, ?, ?)',
    'addVisitNumById': 'update fireFireHome.articles set readNum = readNum + 1 where id = ?'
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

// 通过文章id添加文章的访问量
router.post('/addArticleVisitNum', function (req, res, next) {
    let ep = new EventProxy();
    let body = req.body;
    console.log(body);
    if (checkParamNull(ep, res, [
            {
                param: body.articleId,
                tip: '文章id不能为空'
            }
        ])) {
        return false;
    }
    connect({
        sql: SQL.addVisitNumById,
        param: body.articleId,
        cb: function (result) {
            ep.emit('addArticleVisitNum', result);
        }
    });
    ep.on("addArticleVisitNum", function (data) {
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
        ])) {
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