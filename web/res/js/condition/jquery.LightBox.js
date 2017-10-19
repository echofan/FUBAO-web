/*
 *LightBox 1.0
 *Copyright (c) 2017/04/07  李帆
 *dependence jquery-1.7.1.js
 */
;
(function () {
	$.fn.LightBox = function (options) {
		var defaults = {
			controls: true //上一张、下一张是否显示，默认是显示true
		}
		var opts = $.extend(defaults, options);
		var lis = $(".material .item").find('li').length;
		console.log(lis);
		var lb_wrap = '<div class="lb_wrap"><div class="lightbox_bg"><div class="lightbox"><div class="nums"><span class="tit"></span>/<span class="lis"></span></div><span class="imgs"><img src="../res/img/loading.gif" class="lg_img"></span></div></div></div>';
		// var lb_wrap = '<div class="lb_wrap"><div class="lightbox_bg"><div class="lightbox"><span class="imgs"><img src="../res/img/loading.gif" class="lg_img"></span></div></div></div>';
		$(".material").append(lb_wrap);
		$(".material .lis").html(lis);
		//controls
		if (opts.controls) {
			$(".material .lightbox").append('<p class="prev"></p><p class="next"></p>');
		}
		function imgobj(obj1, obj2) {
			//imgObj.height是通过img对象获取的图片的实际高度
			var imgObj = new Image();
			imgObj.src = obj1.attr("src");
			var margintop = 0 - (imgObj.height) / 2;
			obj2.css("margin-top", margintop);
		}
		this.each(function () {
			var obj = $(".material .item");
			var num = 0;
			//点击赋值并显示    :not(:last)  选择除了最后一项
			obj.find("img").live('tap',function(){
				var src = $(this).attr("src");
				$(".material .lg_img").attr("src", src);
				imgobj($(".materialr .lg_img"), $(".material .lightbox"));
				$(".material .lightbox_bg").fadeIn();
				$(".material .lb_wrap").fadeIn();
				$(".material .lg_img").fadeIn();
				$(".material .prev").fadeIn().siblings(".next").fadeIn();
				num = $(this).parent().parent().parent().index();
				//获取当前图片的父元素的索引并赋给num为后边点击上一张、下一张服务	
				console.log(num + 1);
				var lis = $(".material .item").find('li').length;
				$(".material .lis").html(lis);
				console.log(lis);
				$(".tit").html(num + 1);
			});
			//上一张
			$(".prev").live("click",function () {
				var numpic = obj.find('li').length;
				console.log(numpic);
				if (num == 0) {
					num = numpic;
					console.log(num)
				}
				var src = obj.find("li").eq(num - 1).find("img").attr("src");
				// console.log(src)
				$(".material .lg_img").attr("src", src);
				imgobj($(".material .lg_img"), $(".material .lightbox"));
				// console.log(num);
				$(".tit").html(num);
				console.log(num);
				num--;
			});
			//下一张
			$(".next").live("click",function () {
				var numpic = obj.find('li').length;
				if (num == numpic - 1) {
					num = -1;
				}
				var src = obj.find("li").eq(num + 1).find("img").attr("src");
				$(".material .lg_img").attr("src", src);
				imgobj($(".material .lg_img"), $(".material .lightbox"));
				num++;
				console.log(num);
				$(".tit").html(num + 1);

			});
			//点击除了上一张、下一张之外的其他地方隐藏
			$(".material .lb_wrap").live("tap",function (e) {
				var e = e || window.event;
				var elem = e.target || e.srcElement;
				while (elem) {
					if (elem.className && elem.className.indexOf('prev') > -1) {
						return;
					}
					if (elem.className && elem.className.indexOf('next') > -1) {
						return;
					}
					elem = elem.parentNode;
				}
				$(this).find("img").attr("src", "../../img/loading.gif").hide(); //隐藏后，再将默认的图片赋给lightbox中图片的src
				$(this).find(".prev").hide().siblings(".next").hide();
				$(this).fadeOut();
			});
		})
	}
})();