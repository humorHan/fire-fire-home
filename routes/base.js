let EventProxy = require('eventproxy');

const HOST = '127.0.0.1';
const USER = 'root';
const PWD = '';
var mysql = require('mysql');
//var logger = require('../toolLogConfig/logger');
//logger.setLevel('INFO');

var pool = mysql.createPool({
    connectionLimit: 30,
    host: HOST,
    user: USER,
    password: PWD
});

function connect(opt) {
    pool.getConnection(function (err, connection) {
        var ep = new EventProxy();
        connection.query(opt.sql, opt.param || null, function (err, result) {
            connection.release(); //释放链接
            var resultArray = {
                status: 1,
                message: '获取数据成功',
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