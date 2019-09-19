$(function () {
    let UserNameRep = /^[a-zA-Z]{6,8}$/;
    let phoneRep = /^[1][3-9][0-9]{9}$/;
    let passwordRep = /^.{6,16}$/;
    let imageCodeVal = "";
    let num = 0;
    (new Captcha({
        lineNum: 10,
        dotNum: 20,
        length: 4,
        fontSize: 30
    })).draw(document.querySelector('#captcha'), r => {
        console.log(r);
        imageCodeVal = r;
    });
    $("input").blur(function () {
        let inputid = $(this)[0].id;
        let val = $(this).val().trim();
        console.log(inputid);
        switch (inputid) {
            case "usernameID":
                Exp(inputid, val, UserNameRep, "用户名不能为空", "输入的用户名不符合规范")
                break;
            case "phoneID":
                Exp(inputid, val, phoneRep, "手机号码不能为空", "输入的手机号码不符合规范")
                break;
            case "passwordA":
                Exp(inputid, val, passwordRep, "密码不能为空", "输入的密码不符合规范")
                break;
            case "passwordB":
                if (!(val == $("#passwordA").val())) {
                    $("#" + inputid).parent().parent().addClass("form-group-error")
                    $("#" + inputid).siblings().text("两次输入的密码不一致")
                } else {
                    $("#" + inputid).parent().parent().removeClass("form-group-error")
                }
                break;
            case "imageCode":
                if (val.length <= 0) {
                    $("#" + inputid).parent().parent().addClass("form-group-error")
                }
                break
            case "msgCode": {
                if (val.length <= 0) {
                    $("#" + inputid).parent().parent().addClass("form-group-error")
                    $("#" + inputid).parent().siblings().text("请输入短信验证码")
                } else if (val == num) {
                    $("#" + inputid).parent().parent().removeClass("form-group-error")
                }
                break;
            }
            default:
                break;
        }
    })
    $("#msgCodeBtn").click(function () {
        $("#phoneID").trigger("blur"); /* 自动触发失去焦点的事件 */
        let flag = $("#phoneInput").parents(".form-item").hasClass("form-group-error");
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

            $.ajax({
                type: 'post',
                url: 'http://route.showapi.com/28-1',
                dataType: 'json',
                data: {
                    "showapi_timestamp": formatterDateTime(),
                    "showapi_appid": '105009', //这里需要改成自己的appid
                    "showapi_sign": '51084e3ee1f34d5c86af6e0e3506a8fa', //这里需要改成自己的应用的密钥secret
                    "mobile": $("#phoneID").val().trim(),
                    "content": `{\"name\":\"牛二\",\"code\":\"${num}\",\"minute\":\"3\",\"comName\":\"亚洲最大养猪场\"}`,
                    "tNum": "T150606060601",
                    "big_msg": ""
                },
                error: function (XmlHttpRequest, textStatus, errorThrown) {
                    alert("操作失败!");
                },
                success: function (result) {
                    console.log(result) //console变量在ie低版本下不能用
                    alert(result.showapi_res_code)
                }
            });
        }
    })


    function Exp(inputid, val, Rep, str1, str2) {

        if (val.length <= 0) {
            $("#" + inputid).parent().parent().addClass("form-group-error")
            $("#" + inputid).siblings().text(str1)
        } else {
            if (Rep.test(val)) {
                $("#" + inputid).parent().parent().removeClass("form-group-error")
            } else {
                $("#" + inputid).parent().parent().addClass("form-group-error")
                $("#" + inputid).siblings().text(str2)
            }
        };
    }
    $(".register-btn").click(function () {
        $(".form-item input").trigger("blur")

        console.log($(".register-form").find(".form-item"));

    })
})