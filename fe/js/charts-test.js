/**
 * Created by humorHan on 2017/5/23.
 */
var charts = require("util/charts.js");
var data = [
    {xAxis:'2012',value:2141},
    {xAxis:'2013',value:1499},
    {xAxis:'2014',value:3260},
    {xAxis:'2015',value:1170},
    {xAxis:'2016',value:970},
    {xAxis:'2017',value:2350}
]
var chart = charts('canvas',data,{
    title: 'xxx公司年度盈利',
    bgColor: '#829dba',
    titleColor: '#ffffff',      // 标题颜色
    titlePosition: 'top',       // 标题位置
    fillColor: '#72f6ff',       // 柱状填充色
    axisColor: '#eeeeee',       // 坐标轴颜色
    contentColor: '#bbbbbb'     // 内容横线颜色
});