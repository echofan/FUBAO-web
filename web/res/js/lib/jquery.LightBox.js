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
		$(".item li:last").live("click",function () {
			location.href = "./class.html";
		});
		var lis = $(".material .item ul li").length;
		if(lis>6){
			$(".material").css('height','500px');
		}
		if(lis>9){
			$(".material").css('height','650px');
		}
		console.log(lis);
		var lb_wrap = '<div class="lb_wrap"><div class="lightbox_bg"><div class="lightbox"><div class="nums"><span class="tit"></span>/<span class="lis"></span></div><span class="imgs"><img src="../res/img/loading.gif" class="lg_img"></span></div></div></div>';
		$(".material").append(lb_wrap);
		$(".lis").html(lis-1);

		//controls
		if (opts.controls) {
			$(".lightbox").append('<p class="prev"></p><p class="next"></p>');
		}

		function imgobj(obj1, obj2) {
			//imgObj.height是通过img对象获取的图片的实际高度
			var imgObj = new Image();
			imgObj.src = obj1.attr("src");
			var margintop = 0 - (imgObj.height) / 2;
			obj2.css("margin-top", margintop);
		}

		this.each(function () {
			var obj = $(this);
			var numpic = obj.find("li").length - 1;
			var num = 0;

			//点击赋值并显示    :not(:last)  选择除了最后一项
			obj.find("img:not(:last)").live('click',function(){
				var src = $(this).attr("src");
				$(".lg_img").attr("src", src);
				imgobj($(".lg_img"), $(".lightbox"));
				$(".lb_wrap").fadeIn();
				$(".lg_img").fadeIn();
				$(".prev").fadeIn().siblings(".next").fadeIn();
				num = $(this).parent().parent().index();
				//获取当前图片的父元素的索引并赋给num为后边点击上一张、下一张服务	
				console.log(num + 1);
				console.log(lis);
				$(".tit").html(num + 1);
			});
			//上一张
			$(".prev").live("click",function () {
				if (num == 0) {
					num = numpic;
				}
				var src = obj.find("li").eq(num - 1).find("img").attr("src");
				$(".lg_img").attr("src", src);
				imgobj($(".lg_img"), $(".lightbox"));
				// console.log(num);
				$(".tit").html(num);
				console.log(num);
				num--;
			});

			//下一张
			$(".next").live("click",function () {
				if (num == numpic - 1) {
					num = -1;
				}
				var src = obj.find("li").eq(num + 1).find("img").attr("src");
				$(".lg_img").attr("src", src);
				imgobj($(".lg_img"), $(".lightbox"));
				num++;
				console.log(num);
				$(".tit").html(num + 1);

			});
			//点击除了上一张、下一张之外的其他地方隐藏
			$(".lb_wrap").live("click",function (e) {
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