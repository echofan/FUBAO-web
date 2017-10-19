
$(function () {
    var map = { 'item1': 'id1', 'item2': 'id2', 'item3': 'id3', 'item4': 'id4' }
    $("#sid").bind('change', function () {
        var divId = map[this.value];
        $('#' + divId).show().siblings('.items').hide();
        $(".demo").show();
    })
    $(".material .item").LightBox({
        controls: true
    })
    $('#distpicker').distpicker({
        autoSelect: false
    });
    function fns(url) {
        $('img').attr('src', url);
    }
    $(".hide_box .item1").click(function () {
        fns('../res/img/xiaode.jpg');
        $(".player").show();
    })
    $(".hide_box .item2").click(function () {
        fns('../res/img/02.jpg');
        $(".player").show();
    })
    $(".hide_box .item3").click(function () {
        fns('../res/img/03.jpg');
        $(".player").show();
    })
    $(".hide_box .item4").click(function () {
        fns('../res/img/a.png');
        $(".player").show();
    })
    $(".player").click(function () {
        var e = e || window.event;
        var elem = e.target || e.srcElement;
        while (elem) {
            if (elem.id && elem.id === "player_box") {
                return
            }
            elem = elem.parentNode;
        }
        $(".player").hide();
    });
    $(".right").click(function () {
        $(".hospital").show();
    });
    $(".delete").click(function () {
        $(".hospital").hide();
    })
    $(".makeinp").on('input propertychange', function () {
        $('.clear-cut').html($(this).val());
    })
    $('.clear-cut').click(function () {
        $("._title").html($(this).html());
        $("._title").css('color', '#000');
        $(".hospital").hide();
    })
});
//模拟数据库中的一组数据（会使用用户输入的值在这些数据中进行模糊匹配）
var arr = ['李时珍医院', '赤东卫生院', '蕲春县医院', '红十字会一眼', '武汉同济医院', '武汉协和医院', '青岛大学第一附属医院', 'ssddddd', '233a', 'sdfsadf', 'rfgsedr', 'rtgea', 'adfasdf', 'erfgerg', 'qwefa', 'sedfrg', 'dsd3', 'adfv', 'sd', 'ssdd', 'ssddddd', '233a', 'sdfsadf', 'rfgsedr', 'rtgea', 'adfasdf', 'erfgerg', 'qwefa', 'sedfrg', 'dsd3', 'adfv', 'sd', 'ssdd', 'ssddddd', '233a', 'sdfsadf', 'rfgsedr', 'rtgea', 'adfasdf', 'erfgerg', 'qwefa', 'sedfrg', 'dsd3', 'adfv', 'sd', 'ssdd', 'ssddddd', '233a', 'sdfsadf', 'rfgsedr', 'rtgea', 'adfasdf', 'erfgerg', 'qwefa', 'sedfrg', 'dsd3', 'adfv'];
function change(obj) {
    var parent = document.getElementById("parent");//用于显示提示值的div对象
    //每一次修改了文本框值触发该事件后 都先将 “提示div” 中的所有值清空
    while (parent.hasChildNodes()) {//当div下还存在子节点时 循环继续
        parent.removeChild(parent.firstChild);
    }
    var value = obj.value;//用户输入的值
    if (value == '') {//如果是将文本框中的值删除完了，那么不再提醒 因此“提示div” 直接返回
        parent.style.display = 'none';
        return;
    }
    var myarr = new Array();//用于模拟存储根据用户输入的值匹配到的数据
    //模拟获取用户输入的值在后台可以模糊查询出一些数据
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].indexOf(value) != -1) {
            myarr[myarr.length] = arr[i];
        }
    }
    //如果用户输入的值可以匹配到数据，则将“提示div” 设为显示，并为所有匹配到的数据创建一个div加入到“提示div”中
    if (myarr.length > 0) {
        parent.style.display = '';
        var d;//创建新的div
        for (var i = 0; i < myarr.length; i++) {
            d = document.createElement("div");
            d.innerHTML = myarr[i];
            d.onmouseover = function () { this.style.backgroundColor = "gray"; };//鼠标移到上边变颜色
            d.onmouseout = function () { this.style.backgroundColor = "white"; };
            //鼠标点击某个提示值后将值赋给文本框，并因此“提示div”
            d.onclick = function () {
                obj.value = this.innerHTML;
                parent.style.display = "none";
                $("._title").html(obj.value);
                $("._title").css('color', '#000');
                $(".clear-cut").html(obj.value);
                $(".hospital").hide();
            };
            parent.appendChild(d);//将创建的div加入到“提示div”中
        }
    } else {//否则，不显示“提示div”
        document.getElementById("parent").style.display = 'none';
    }
}
