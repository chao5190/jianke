$(function () {
    let UserNameRep = /^[a-zA-Z]{6,8}$/;
    let phoneRep = /^[1][3-9][0-9]{9}$/;
    let passwordRep = /^.{6,16}$/;
    let imageCodeVal = "";
    let num = 1234;
    //生成验证码
    (new Captcha({
        lineNum: 10,
        dotNum: 20,
        length: 4,
        fontSize: 30
    })).draw(document.querySelector('#captcha'), r => {
        console.log(r);
        imageCodeVal = r;
    });
    $(".tab-login-item").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
        $(".login-main-content").children().eq($(this).index()).addClass("loginViewCurrent").siblings().removeClass("loginViewCurrent");
    })
    $(".login-main-content input").blur(function () {
        let index = $(this).parent().parent();
        let val = $(this).val().trim();
        let id = $(this)[0].id;
        if ($(this)[0].name == "phoneNum") {
            Rep(index, $(this), val, phoneRep, "手机号码不能为空", "请输入正确的手机号码")
        } else if (index.hasClass("image-code")) {
            codeRep(index, $(this).next().next(), val, imageCodeVal)
        } else if (index.children().hasClass("phone-code-content")) {
            codeRep(index, $(this).parent().next(), val, num)
        } else if (id == "username-ID") {
            hasorNull(val, index, $(this).next(), "用户名不能为空")
        } else if (id == "password-ID") {
            hasorNull(val, index, $(this).next(), "密码不能为空")
        }
    });
    $(".code-sms").click(function () {
        $(".phone input").trigger("blur"); /* 自动触发失去焦点的事件 */
        let flag = $(".phone input").parents(".form-item .phone").hasClass("form-group-error");
        if (flag) {
            alert("手机号码不正确！请检查");
            return;
        } else {
            /* 开启倒计时 */
            let timeCount = 60;
            let timer = setInterval(function () {
                timeCount--;
                $("#msgCodeBtn").text(`${timeCount} 秒`);
                if (timeCount == 0) {
                    clearInterval(timer);
                    $("#msgCodeBtn").text(`发送短信验证码`);
                }
            }, 1000);

            function getRandom(min, max) {
                return parseInt(Math.random() * (max - min + 1)) + min
            }

            function formatterDateTime() {
                var date = new Date()
                var month = date.getMonth() + 1
                var datetime = date.getFullYear() +
                    "" // "年"
                    +
                    (month >= 10 ? month : "0" + month) +
                    "" // "月"
                    +
                    (date.getDate() < 10 ? "0" + date.getDate() : date
                        .getDate()) +
                    "" +
                    (date.getHours() < 10 ? "0" + date.getHours() : date
                        .getHours()) +
                    "" +
                    (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
                        .getMinutes()) +
                    "" +
                    (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
                        .getSeconds());
                return datetime;
            }

            num = getRandom(1000, 9999);
            // console.log(num);


            $.ajax({
                type: 'post',
                url: 'http://route.showapi.com/28-1',
                dataType: 'json',
                data: {
                    "showapi_timestamp": formatterDateTime(),
                    "showapi_appid": '105009', //这里需要改成自己的appid
                    "showapi_sign": '51084e3ee1f34d5c86af6e0e3506a8fa', //这里需要改成自己的应用的密钥secret
                    "mobile": $(".phone input").val().trim(),
                    "content": `{\"name\":\"牛二\",\"code\":\"${num}\",\"minute\":\"3\",\"comName\":\"15K公司\"}`,
                    "tNum": "T150606060601",
                    "big_msg": ""
                },
                error: function (XmlHttpRequest, textStatus, errorThrown) {
                    alert("操作失败!");
                },
                success: function (result) {
                    console.log(result) //console变量在ie低版本下不能用

                }
            });
        }
    });

    function hasorNull(val, index, jqobj, str1) {
        if (val <= 0) {
            index.addClass("form-group-error");
            jqobj.text(str1)
        }
    }

    function codeRep(index, jqobj, val, CodeVal) {
        if (val <= 0) {
            index.addClass("form-group-error");
            jqobj.text("验证码不能为空")
        } else {
            if (!(CodeVal == val)) {
                index.addClass("form-group-error");
                jqobj.text("请输入正确的验证码")
            } else {
                index.removeClass("form-group-error");
            }
        }
    }

    function Rep(index, that, val, exp, str1, str2) {
        if (val <= 0) {
            index.addClass("form-group-error");
            that.siblings().text(str1)
        } else {
            if (!exp.test(val)) {
                index.addClass("form-group-error");
                that.siblings().text(str2)
            } else {
                index.removeClass("form-group-error");
            }
        }
    }
    $("#loginBtn").click(function () {
        $(".loginViewCurrent input").trigger("blur")
        let username = $("#username-ID").val();
        let phone = $("#phoneNum").val();
        let password = $("#password-ID").val();
        console.log(username, phone, password);
        if ($(".loginView").hasClass("form-group-error")) {
            alert("请正确填写相应信息");
        } else {
            if (phone.length > 0) {
                alert("登录成功")
            } else {
                $.ajax({
                    type: "post",
                    url: "../server/login.php",
                    data: `username=${username}&password=${password}`,
                    dataType: "json",
                    success: function (data) {
                        if (data.status == "success") {
                            alert(data.data.msg);
                            window.location.href = "../index.html";
                        } else {
                            alert(data.data.msg);
                        }
                    },
                    error: function (data) {
                        if (data.status == "success") {
                            alert(data.data.msg);
                        } else {
                            alert(data.data.msg);
                        }
                    }
                });
            }
        }
    })
})