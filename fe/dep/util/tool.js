/**
 * Created by humorHan on 2017/7/13.
 */
module.exports = {
    /**
     * 获取地址栏参数
     * @param name     参数名称
     * @returns {null} 参数值
     */
    getParams: function(name){
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
};