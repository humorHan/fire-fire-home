var express = require('express');
var router = express.Router();
var EventProxy = require('eventproxy');
var connect = require('./base.js');
var SQL = require('../sql/article.js');

// 获取文章类型 -- test API
router.get('/getArticlesType', function (req, res, next) {
    var ep = new EventProxy();
    connect({
        sql: SQL.getArticlesType,
        cb: function (result) {
            ep.emit('getArticlesType', result);
        }
    });
    ep.on("getArticlesType", function (data) {
        res.json(data);
    });
});

module.exports = router;
