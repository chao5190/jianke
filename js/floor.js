$(function () {
    console.log("floor");

    $(".jkn_wrap_b").before(`<div lazy-src=\"special/special-columnTS201611201206509838.html\"><dl class="jk_tszl clearfix jk_mode"><dt>热卖专场</dt><dd></dd><dd></dd><dd></dd><dd></dd></dl></div>`)
    // 延迟加载
    // $(window).scroll(function () {
    //     loadImg();
    // })

    // function loadImg() {
    //     $("img").each(function () {
    //         if ($(this).offset().top < $(window).height() * 2 + $(window).scrollTop()) {
    //             $(this).attr("src", $(this).attr("lazy-src")).removeAttr("lazy-src");
    //         }
    //     });
    // }


    $.ajaxSetup({
        type: "post",
        global: false,
        dataType: "json",
    });
    $.ajax({
        url: "./server/getdata.php",
        data: "table=\"wrap\"",
        success: function (response) {
            data = response.data;
            let j = 0;
            for (let i = 0; i < $(".jk_tszl dd").length; i++) {
                let dd = $(".jk_tszl dd").eq(i);
                let html = "";
                let n = 2;
                for (j; j < data.length; j++) {
                    if (j % 4 == 0) {
                        html += `<div class=\"tszl_img;\"><a href=${data[j].href} target="_blank" style="position:relative;"><img src=${data[j].src} height="360" width="295"><div class="img_box"><h3>${data[j].title}</h3><p>${data[j].title2}</p></div></a></div>`
                    } else {
                        if (n == 2) {
                            html += `<ul class="tszl_ul"><li class="clearfix"><a href=${data[j].href} target="_blank" style="position:relative;"><img src=${data[j].src} height="83" width="83" class="fl"><div class="tszl_ul_box"><h4>${data[j].title}</h4><h5>${data[j].title2}</h5></div></a></li>`
                            n--;
                        } else if (n > 0) {
                            html += `<li class="clearfix"><a href=${data[j].href} target="_blank" style="position:relative;"><img src=${data[j].src} height="83" width="83" class="fl"><div class="tszl_ul_box"><h4>${data[j].title}</h4><h5>${data[j].title2}</h5></div></a></li>`
                            n--;
                        } else if (n == 0) {
                            html += `<li class="clearfix"><a href=${data[j].href} target="_blank" style="position:relative;"><img src=${data[j].src} height="83" width="83" class="fl"><div class="tszl_ul_box"><h4>${data[j].title}</h4><h5>${data[j].title2}</h5></div></a></li></ul>`;
                            dd.append(html)
                            break;
                        }
                    }

                }
                j++;
            }
        }
    });
    $(".jkn_wrap_b").before(`<div class="wrap_middle"></div>`);
    // 楼层渲染
    $.ajax({
        url: "./server/getdata.php",
        data: "table=\"wrap_middle\"",
        success: function (response) {
            floorMiddle = response.data;
            console.log(floorMiddle);

            function Floor() {}
            Floor.prototype = {
                init: function (items) {
                    this.html = this.addElement(items);
                    this.inSetView(this.html);
                },
                addElement(items) {
                    if (items == 3) {
                        html = `
                        <dl class="jk_mode" lazy-src=${floorMiddle[items].lazy_src}>
                       <a class="jkn_add" href=${floorMiddle[items].title} target="_blank" style="position:relative;">
                       <img style="display: block;" src=${floorMiddle[items].src} height="90" width="1210">
                       <span class="floor_adSign">
		<img alt="" src="https://static.jianke.com/home/front/images/ad_tag.png"> 
	</span>
                       </a> 
                       </dl>
                        `;
                    } else {
                        html = `
                        <dl class="jk_mode" lazy-src=${floorMiddle[items].lazy_src}>
                        <dt style=${floorMiddle[items].src}>${floorMiddle[items].title}</dt>
                        <dd class="clearfix">
                        <div class="floor_left" style="position:relative;">
		<a href="#" target="_blank">
			<img src=${floorMiddle[items].bigimg} height="450" width="200"></a>
			<div class="floor_left_box">
			<ul class="left_box_top clearfix">
				<li><a href="#" target="_blank">
                ${floorMiddle[items].title1}
                </a></li>
				<li class="mar_left"><a href="#" target="_blank">
						${floorMiddle[items].title2}</a></li>
				<li class="mar_top"><a href="#" target="_blank">
						${floorMiddle[items].title3}</a></li>
				<li class="mar_top mar_left"><a href="#" target="_blank">
						${floorMiddle[items].title4}</a></li>
			</ul>
			<ul class="left_box_bot clearfix">
				<li>
					<a href="#" target="_blank" style="position:relative;">
						<img src=${floorMiddle[items].img1} height="62" width="89" alt="">
					</a>
				</li>
				<li class="bor_left">
					<a href="#" target="_blank" style="position:relative;">
						<img src=${floorMiddle[items].img2} height="62" width="89" alt="">
					</a>
				</li>
				<li class="bor_top">
					<a href="" target="_blank" style="position:relative;">
						<img src=${floorMiddle[items].img3} height="62" width="89" alt="">
					</a>
				</li>
				<li class="bor_top bor_left">
					<a href="" target="_blank" style="position:relative;">
						<img src=${floorMiddle[items].img4} height="62" width="89" alt="">
					</a>
				</li>
			</ul>
		</div>
    </div>
</dd>
</dl>`;
                    }
                    return html;
                },
                inSetView(ele) {
                    $(".wrap_middle").append(ele)
                },
            }
            new Floor().init(0)
            new Floor().init(1)
            new Floor().init(2)
            new Floor().init(3)
            new Floor().init(4)
            new Floor().init(5)
            new Floor().init(6)
        }
    })
})