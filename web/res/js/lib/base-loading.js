
// //在页面未加载完毕之前显示的loading Html自定义内容
var _LoadingHtml = 
// '<div id="loadingDiv" style="position:absolute;left:0;width:100%;height:100%;top:0;background:#F2F4F6;opacity:1;filter:alpha(opacity=80);z-index:10000;"><div style="position: absolute; cursor1: wait; left:50%; top:50%; width: 50px; height: 50px; background-size:100% 100%; margin-left: -25px; margin-right: -25px; background: url(http://img.lanrentuku.com/img/allimg/1212/5-121204193935-51.gif) no-repeat;  font-family:\'Microsoft YaHei\';"></div></div>';
'<div id="loadingDiv" style="position:absolute;left:0;width:100%;height:100%;top:0;background:#F2F4F6;opacity:1;filter:alpha(opacity=80);z-index:10000;"><div style="position: absolute; cursor1: wait; left:50%; top:50%; width: 50px; height: 50px; background-size:100% 100%; margin-left: -25px; margin-right: -25px; background: url(../res/img/loading.gif) no-repeat;  font-family:\'Microsoft YaHei\';"></div></div>';
//呈现loading效果
document.write(_LoadingHtml);

//监听加载状态改变
document.onreadystatechange = completeLoading;

//加载状态为complete时移除loading效果
     var loadingMask = document.getElementById('loadingDiv');
    function init(){
        loadingMask.parentNode.removeChild(loadingMask); 
        // console.log(123)
    }
function completeLoading() {
    if (document.readyState == "complete") {
         setTimeout("init()",500)
    }
}
$(function(){
    $('body').animate({'opacity':1},300); 
 });
