$(function () {
    $(".tab-login-item").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
        $(".login-main-content").children().eq($(this).index()).addClass("loginViewCurrent").siblings().removeClass("loginViewCurrent");
    })
})