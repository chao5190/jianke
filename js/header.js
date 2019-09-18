$(function() {
    $(".my_jianke").mouseenter(function() {
        $(this).addClass("myjk_hover");
    });
    $(".my_jianke").mouseleave(function() {
        $(this).removeClass("myjk_hover");
    });
    $(".site_nav").mouseenter(function() {
        $(this).addClass("mysite_nav");
    });
    $(".mysite_nav").mouseleave(function() {
        $(".site_nav").removeClass("mysite_nav");
    })
})