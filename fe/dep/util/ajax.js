/**
 * Created by humorHan on 2017/5/23.
 */
let url = 'http://localhost:3000';

module.exports = function (opt) {
    $.ajaxSetup({cache: false});
    return $.ajax({
        type: opt.type || 'GET',
        url: url + opt.url,
        data: opt.data,
        dataType: opt.dataType || 'JSON',
        success(data) {
            opt.success && opt.success(data);
        },
        error(data){
            console.log(data);
            opt.error && opt.error(data);
        }
    });
};