let EventProxy = require('eventproxy');
let mysql = require('mysql');
let mysqlConfig = require('./dep/mysqlConfig.js');

//var logger = require('../toolLogConfig/logger');
//logger.setLevel('INFO');

let pool = mysql.createPool({
    connectionLimit: 30,
    host: mysqlConfig.HOST,
    user: mysqlConfig.USER,
    password: mysqlConfig.PWD
});

function connect(opt) {
    pool.getConnection(function (err, connection) {
        let ep = new EventProxy();
        connection.query(opt.sql, opt.param || null, function (err, result) {
            connection.release(); //释放链接
            let resultArray = {
                status: 1,
                //message: '获取数据成功',
                message: '操作数据成功',
                data: null
            };
            if (err) {
                resultArray.status = -1;
                resultArray.message = err.message;
                ep.emit('error', resultArray.message);
                console.info('sqlErr', err);
            } else if (resultArray.status === 1) {
                //返回结果
                resultArray.data = result;
                opt.cb(resultArray);
            }
        });
    });
}

module.exports = connect;