$(function () {
    $(".visibli").click(function () {
        $(this).hide();
        $(".project-prover-content").css({
            "overflow": 'visible',
            "max-height": "1000px",
            "margin-bottom": "15px"
        });
        $(".shouqi").show();
    });
    $(".shouqi").click(function () {
        $(this).hide();
        $(".visibli").show();
        $(".project-prover-content").css({
            "overflow": 'hidden',
            "max-height": "150px",
            "margin-bottom": 0
        });

    });

    $(".project-prover .item").LightBox({
        controls: true
    })
    $(".shows_content .content .item").kobe({
        controls: true
    })
    //   证实
    $(".helps_box ul li").click(function () {
        $(this).children().children('img').addClass('active').parent().parent().siblings().children().children('img').removeClass('active');
        $(this).children().children('.sanjiao').addClass('active_sanjiao').parent().parent().siblings().children().children('.sanjiao').removeClass('active_sanjiao');
        var idx = $(this).index();
        $(".tabs").eq(idx).addClass('active_tab').siblings().removeClass('active_tab');
    });
    //公示
    $(".shows_head span").click(function () {
        $(this).children("a").addClass("shows_active").parent().siblings().children('a').removeClass("shows_active");
        var idx = $(this).index();
        console.log(idx)
        $(".shows_tab").eq(idx).addClass('shows_tab_box').siblings().removeClass('shows_tab_box');
    });

    //点击更多评论
    $(".foot_hide").click(function () {
        $(this).hide();
        $(".content_foot_box").css({
            "overflow": 'visible',
            "max-height": '1000px'
        });
    })
    function player(text, title) {
        $(".player .head").html(text);
        $('.player .content .control-input').attr('placeholder', title)
    }
    function attention(text) {
        $(".attention span").html(text);
    }
    $(".btn_player").click(function (event) {
        $('.player').show();
        player("发表评论", "填写评论内容");
        event.stopPropagation();
        return false;
    })
    $(".btn").click(function () {
        $(this).parents('.player').hide();
    })
    //点击回复
    $(".content_box-item").click(function () {
        $('.player').show();
        player("回复留言", '回复留言');
    })

    $(".praise").click(function () {
        $(".attention").show().delay(500).fadeOut();
        $(this).children('.not').toggleClass('yest');
        var nums = parseInt($(this).children('.num').text());
        if ($(this).children('#not').attr('class') == "not yest") {
            nums += 1;
            $(this).children('.num').text(nums);
            attention('关注成功');
        } else if ($(this).children('#not').attr('class') == "not") {
            nums -= 1;
            $(this).children('.num').text(nums);
            attention('取消关注成功');
        }
    })
});