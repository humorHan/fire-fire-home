/**
 * Created by humorHan on 2017/6/20.
 */
let art = require('art-template/lib/runtime');

//知识标签
art.labelFormat = function (label) {
    let html = '',
        labelArr = label.split('&');
    labelArr.forEach((item, index) => {
        if (index === labelArr.length - 1) {
            html += item;
        } else {
            html += item + '、';
        }
    });
    return html;
};

//时间戳转化方法
art.dateFormat = function (date, format) {
    date = new Date(parseInt(date.replace("/Date(", "").replace(")/", ""), 10));
    date = new Date(date);
    let map = {
        "Y": date.getYear(),
        "M": date.getMonth() + 1, //月份
        "d": date.getDate(), //日
        "h": date.getHours(), //小时
        "m": date.getMinutes(), //分
        "s": date.getSeconds(), //秒
        "q": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
        let v = map[t];
        if (v !== undefined) {
            if (all.length > 1) {
                v = '0' + v;
                v = v.substr(v.length - 2);
            }
            return v;
        } else if (t === 'y') {
            return (date.getFullYear() + '').substr(4 - all.length);
        }
        return all;
    });
    return format;
};