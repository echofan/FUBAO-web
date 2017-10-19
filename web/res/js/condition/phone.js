
function inits() {
    var $fn = {
        codes: function () {
            $(".code_btn").click(function () {
                var phone = $('#phone').val();
                phone = phone.replace(/(^\s+)|(\s+$)/g, '');
                var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
                if (phone == '') {
                    $fn.players('请输入手机号')
                } else if (!myreg.test(phone)) {
                    $fn.players('你输入的手机号有误！')
                } else {
                    $fn.times();
                }
                console.log(phone)
            });
        },
        yzm: function () {
            $('.ipt').click(function () {
                var phone = $('#phone').val();
                var codes=$('#code').val();
                console.log(codes);
                phone = phone.replace(/(^\s+)|(\s+$)/g, '');
                var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
                if (phone == '') {
                    $fn.players('请输入手机号')
                } else if (!myreg.test(phone)) {
                    $fn.players('你输入的手机号有误！')
                } else if (myreg.test(phone)&&codes== '') {
                    $fn.players('请输入验证码')
                }  else {
                    // $fn.players('验证成功')
                    location.href="./material.html";
                }
                console.log(phone)
            });
            $fn.hides();
        },
        hides: function () {
            $(".player").on('click', function (e) {
                var e = e || window.event;
                var elem = e.target || e.srcElement;
                while (elem) {
                    if (elem.id && elem.id === "player_box") {
                        return
                    }
                    elem = elem.parentNode;
                }
                $(".player").hide();
            })
        },
        times: function () {
           $(".code_btn").addClass('disabled');
            $(".code_btn").attr("disabled", true)
            var seconds = 60;
            var ids = setInterval(function () {
                seconds--;
                $(".code_btn").html(seconds + '秒后获取');
                if (seconds < 0) {
                    $(".code_btn").removeClass('disabled');
                    $(".code_btn").html('获取验证码');
                    $(".code_btn").attr("disabled", false);
                    clearInterval(ids);
                }
            }, 1000);
        },
        players: function (text) {
            $(".player").show();
            $('#title').html(text);
        }
    }
    $fn.yzm();
    $fn.codes();
};

