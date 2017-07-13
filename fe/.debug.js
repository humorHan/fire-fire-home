/*! <DEBUG:undefined> */
function anonymous($data,$filename) {'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data=$data.data,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,$out='';$each(data,function($value,$index){
$out+=' <a class="article" href="';
$out+=$escape($value.articleURL);
$out+='.html?articleId=';
$out+=$escape($value.id);
$out+='" target="_blank"> <span class="right font12">';
$out+=$escape($helpers. dateFormat($value.createTime ,  'yyyy-MM-dd hh:mm:ss'));
$out+='</span> <h3 class="article-title">';
$out+=$escape($value.title);
$out+='</h3> <div class="right font12">';
$out+=$escape($value.);
$out+='</div> <div class="article-label">';
$out+=$escape($helpers. labelFormat($value.label ));
$out+='</div> <div>';
$out+=$escape($value.summary);
$out+='</div> </a> ';
});
return new String($out);}