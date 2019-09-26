$(function () {
    for (var i = 0; i < 18; i++) {
        $(".mc").append(`<div class=\"item\"><dl class=\"jnk_a_dl  jk_first \"></dl><div class=\"item_mc fore${i}\">
        <div class=\"category\"><dl class=\"jk_detailed\"></dl><dl class=\"recommended\"></di></div>
        </div>`)
    }
    $.ajaxSetup({
        type: "post",
        global: false,
        dataType: "json",
    });
    $.ajax({
        url: "./server/getdata.php",
        data: "table=\"mc_left\"",
        success: function (response) {
            data = response.data;
            let j = 0;
            for (var i = 0; i < $(".item").length; i++) {
                let dt = $(".item").eq(i).children().eq(0);
                let html = "";
                let n = 0;
                for (j; j < data.length; j++) {
                    if (data[j].boundary != 1) {
                        if (n == 0) {
                            html += `<dt style=\"margin-left: 0px;\"><a title=${data[j].title} href=${data[j].href}>${data[j].title}</a></dt>`
                            n++;
                        } else {
                            html += `<dd><a title=${data[j].title} href=${data[j].href}>${data[j].title}</a></dd>`
                        }

                    } else {
                        html += `<dd><a title=${data[j].title} href=${data[j].href}>${data[j].title}</a></dd>`
                        dt.append(html);
                        n = 0;
                        break;
                    }
                }
                j += 1;
            }
        }
    });
    $(".item").mouseenter(function () {
        $(this).addClass("hover").siblings().removeClass("hover");
        $(this).eq(0).children(".jk_first").children("dt").css("marginLeft", "10px");
        $(this).siblings().children(".jk_first").children("dt").css("marginLeft", "0px");
    });
    $(".item_mc").mouseleave(function () {
        $(this).parent().removeClass("hover");
        $(this).parent().children(".jk_first").children("dt").css("marginLeft", "0px");
    })
    // 请求nav-right
    $.ajax({
        url: "./server/getdata.php",
        data: "table=\"mc_right\"",
        success: function (response) {
            data = response.data;
            let j = 0;
            for (var i = 0; i < $(".category dl").length; i++) {
                let dl = $(".category dl").eq(i);
                let html = "";
                let n = 0;
                for (j; j < data.length; j++) {

                    if (data[j].boundary != 1) {
                        if (i % 2 == 0) {
                            if (n == 0) {
                                html += `<dt target=\"_blank\"><a title=${data[j].title} href=${data[j].href}>${data[j].title}</a></dt>`
                                n++;
                            } else {
                                html += `<dd target=\"_blank\"><a title=${data[j].title} href=${data[j].href}>${data[j].title}</a></dd>`
                            }
                        } else {
                            if (n == 0) {
                                html += `<dt>推荐产品</dt>`
                                n++;
                            } else {
                                html += `<dd target=\"_blank\"><a title=${data[j].title} href=${data[j].href}>${data[j].title}</a></dd>`
                            }
                        }
                    } else {
                        html += `<dd><a title=${data[j].title} href=${data[j].href}>${data[j].title}</a></dd>`
                        dl.append(html);
                        n = 0;
                        break;
                    }
                }
                j += 1;
            }
        }
    });
    $.ajax({
        url: "./server/getdata.php",
        data: "table=\"mc_right_img\"",
        success: function (response) {
            data = response.data;
            let j = 0;
            for (var i = 0; i < $(".item_mc").length; i++) {
                let html = `<dl class=\"r_brand\"><dt>推荐品牌</dt></dl><a href=${data[i].href} target="_blank"><img class="larger_version" src="${data[i].src}" alt="null"></a>`;
                $(".item_mc").eq(i).append(html)
            }
        }
    });
    // nav-right结束
    // 轮播图
    let index = 0;

    function btnclick(index) {
        $(".banner-pic ul li").eq(index).css("display", "list-item");
        $(".banner-pic ul").eq(index).siblings().children().css("display", "none");
        $(".banner-ctrl li").eq(index).addClass("current");
        $(".banner-ctrl li").eq(index).siblings().removeClass("current");

    }

    function next() {
        index++;
        if (index >= 5) index = 0;
        btnclick(index);
    }

    function prev() {
        index--
        if (index <= -1) index = 4;
        btnclick(index);
    }
    $(".banner-next").click(function () {
        next();
    })
    $(".banner-prev").click(function () {
        prev();
    })
    let autobanner = setInterval(function () {
        next();
    }, 2000);
    $(".banner-pic ul li img").mouseenter(function () {
        clearInterval(autobanner);
    })
})