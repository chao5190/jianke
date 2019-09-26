$(function () {
    $(".jkn_wrap_b").after(`<div class="jkn_link"><ul class="jk_ul"><li>健康资讯</li><li>合作链接</li><li>友情链接</li></ul><div class="jk_con_links"></div></div>`);
    $.ajax({
        type: "post",
        url: "./server/getdata.php",
        data: "table=\"link\"",
        dataType: "json",
        success: function (response) {
            data = response.data;
            let j = 0;
            for (var i = 0; i < $(".jkn_link ul li").length; i++) {
                console.log($(".jk_tcon_links").eq(i));
                html = "";
                if (i == 0) {
                    $(".jk_con_links").append(`<div class="jk_tcon_links" id="jk_div_1" style="display:block;"></div>`)
                } else {
                    $(".jk_con_links").append(`<div class="jk_tcon_links" id="jk_div_1" style="display:none;"></div>`)
                }
                for (j; j < data.length; j++) {
                    if (data[j].boundary != 1) {
                        html += `<a titil${data[j].title} target="_blank" href=${data[j].href}}>${data[j].title}</a>`;

                    } else {
                        html += `<a titil${data[j].title} target="_blank" href=${data[j].href}}>${data[j].title}</a>`;
                        $(".jk_tcon_links").eq(i).append(html);
                        break;
                    }
                }
                j++;
            }
        }
    });
    $(".jkn_link ul li").mousemove(function () {
        index = $(this).index();
        $(this).addClass("active").siblings().removeClass("active");
        $(".jk_tcon_links").eq(index).css("display", "block").siblings().css("display", "none")
    })

})