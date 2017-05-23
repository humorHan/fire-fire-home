let express = require('express');
let router = express.Router();
let EventProxy = require('eventproxy');
let connect = require('./base.js');
let SQL = {
    'getArticles': 'select * from fireFireHome.articles'
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

module.exports = router;
