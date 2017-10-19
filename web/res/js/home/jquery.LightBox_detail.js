/*
 *LightBox 1.0
 *Copyright (c) 2017/04/07  李帆
 *dependence jquery-1.7.1.js
 */
;
(function () {
	$.fn.kobe = function (options, className) {
		var defaults = {
			controls: true //上一张、下一张是否显示，默认是显示true
		}
		var opts = $.extend(defaults, options);
		var $lis = $(".shows_tab_box").children('li');
		console.log($lis)
		for (var i = 0; i < $lis.length; i++) {
			console.log($lis[i]);
			(function (index) {
				$lis[i].addEventListener('touchstart', function () {
					var lis = $(this).find("li").length;
					$(this).find('.lis').html(lis);
					//controls
					if (opts.controls) {
						// $(this).find('.lightbox').append('<p class="prev"></p><p class="next"></p>');
					}

					function imgobj(obj1, obj2) {
						//imgObj.height是通过img对象获取的图片的实际高度
						var imgObj = new Image();
						imgObj.src = obj1.attr("src");
						var margintop = 0 - (imgObj.height) / 2;
						obj2.css("margin-top", margintop);
					}
					$(this).find('.item').each(function () {
						console.log($(this))
						var numpic = $(this).find('li').length;
						console.log(numpic)
						var num = 0;
						$(this).find("img").live('click', function () {
							// alert($(this))
							// alert(123)
							var src = $(this).attr("src");
							$(this).parents('.item').siblings('.lb_wrap').find('.lg_img').attr("src", src);
							imgobj($(this).parents('.item').siblings('.lb_wrap').find('.lg_img'), $(this).parents('.item').siblings('.lb_wrap').find('.lightbox'));
							$(this).parents('.item').siblings('.lb_wrap').find('.lightbox_bg').show();
							$(this).parents('.item').siblings('.lb_wrap').show();
							$(this).parents('.item').siblings('.lb_wrap').find('.lg_img').show();
							$(".prev").fadeIn().siblings(".next").fadeIn();
							num = $(this).parent().parent().index();
							//获取当前图片的父元素的索引并赋给num为后边点击上一张、下一张服务	
							$(this).parents('.item').siblings('.lb_wrap').find(".tits").html(num + 1);
						});
						//上一张
						$(this).siblings('.lb_wrap').find(".prev").live("tap", function () {	
							if (num == 0) {
								num = numpic;
							}
							var src = $(this).parents('.lb_wrap').siblings('.item').find("li").eq(num - 1).find("img").attr("src");
							console.log(src)
							$(this).siblings('.imgs').children('.lg_img').attr('src',src);
							imgobj($(this).parent('.lb_wrap').find('.lg_img'), $(this).parents('.lb_wrap').find(".lightbox"));
							// console.log(num);
							$(".tits").html(num);
							// console.log(num);
							num--;
							return false;
						});

						//下一张
						$(this).siblings('.lb_wrap').find(".next").live("tap", function () {
							if (num == numpic - 1) {
								num = -1;
							}
							var src = $(this).parents('.lb_wrap').siblings('.item').find("li").eq(num + 1).find("img").attr("src");
							$(this).parents('.lb_wrap').find('.lg_img').attr("src", src);
							imgobj($(this).parents('.lb_wrap').find('.lg_img'), $(this).parents('.lb_wrap').find(".lightbox"));
							num++;
							console.log(num);
							$(".tits").html(num + 1);

						});
						// 点击除了上一张、下一张之外的其他地方隐藏
						$(this).siblings('.lb_wrap').live("tap", function (e) {
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
							$(this).hide();
						});
					})
				}, false)
			})(i)
		}
	}
})();