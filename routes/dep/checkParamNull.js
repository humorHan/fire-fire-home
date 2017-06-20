/**
 * Created by humorHan on 2017/6/20.
 */
/**
 * 校验参数是否为空函数
 * @param ep    ep
 * @param res   响应
 * @param arr   需要校验的参数数组以及对应的提示
 * @returns {boolean} 是否为空
 */
module.exports = function (ep, res, arr) {
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

    for (let i = 0,len = arr.length; i < len; i++){
        if (!arr[i].param) {
            ep.emit('error', arr[i].tip);
            return true;
        }
    }
};
