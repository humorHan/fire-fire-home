/**
 * Created by humorHan on 2017/6/20.
 */
let express = require('express');
let router = express.Router();
let EventProxy = require('eventproxy');
let connect = require('./base.js');
let checkParamNull = require("./dep/checkParamNull.js");
let SQL = {
    'getPosition': 'select * from fireFireHome.user_position',
    'addPosition': 'insert into fireFireHome.user_position(locationType, position, formattedAddress, addressComponent, isConverted, visitTime) values(?, ?, ?, ?, ?, ?)'
};

//获取用户位置数据
router.get('/getPosition', function (req, res, next) {
    let ep = new EventProxy();
    //let body = req.body;
    connect({
        sql: SQL.getPosition,
        cb: function (result) {
            return ep.emit('getPosition', result);
        }
    });
    ep.on("getPosition", function (data) {
        return res.json(data);
    });
});

// 增加用户位置数据
router.post('/addPosition', function (req, res, next) {
    let ep = new EventProxy();
    let body = req.body;
    connect({
        sql: SQL.addPosition,
        param: [body.locationType, body.position, body.formattedAddress, body.addressComponent, body.isConverted, body.visitTime],
        cb: function (result) {
            return ep.emit('addPosition', result);
        }
    });
    ep.on("addPosition", function (data) {
        return res.json(data);
    });
});

module.exports = router;