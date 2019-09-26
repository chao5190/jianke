$(function () {
    $(".jkn_nav").after(`<div class="pro-list">
    <div class="pro-listop">
    <ul class="listop-left">
        <li class="pro-list-on"><a>默认</a></li>
        <li ><a>价格从高到低</a></li>
        <li ><a>价格从低到高</a></li>
    </ul>
</div>`);
    $(".pro-list").after(`<div class="pro-area"><ul class="pro-con"></ul></div>`)
    $(".pro-area").after(`<div class="pages"></div>`)

    let currentType = 0;
    new Promise(function (resolve, reject) {
        $.ajax({
            type: "get",
            url: "../server/getcountpage.php",
            dataType: "json",
            success: function (response) {
                console.log(response);
                let pageCount = response.data;
                for (let i = 0; i < pageCount; i++) {
                    let oPage = $(`<a href="javascript:;">${i+1}</a>`);
                    $(".pages").append(oPage);
                }
                $(".pages").children("a").first().addClass("active");
                resolve();
            }
        });
    }).then(function () {
        getDatWithPage(currentType, 0);
    })
    /* 002-当拿到数据后根据数据来渲染页面 */
    $(".pages").on("click", "a", function (e) {
        e.preventDefault();
        $(this).addClass("active").siblings().removeClass("active");
        /* 先获取当前是第几页 */
        let index = $(this).index();
        // console.log(index);
        getDatWithPage(currentType, index);
    })

    let getDatWithPage = (type, page) => {
        $.ajax({
            type: "get",
            url: "../server/getpageData.php",
            data: `type=${type}&page=${page}`,
            dataType: "json",
            success: function (response) {
                let data = response.data;
                let html = data.map((ele) => {
                    // console.log(item);
                    return `
                        <li>
                        <div class="lihover">
                            <div class="imgbig">
                                <img src=${ele.src} height="200" width="200"  style="display: block;">
                                    </div>
                            <div class="pro-botxt">
                                <span style="font-family: microsoft yahei">￥<i>${ele.span}</i></span>
                                <s style="color: #aeacac; font-family: microsoft yahei">${ele.s}</s>
                                <p>
                                    <a target="_blank" "=""> ${ele.p}</a>
                                </p>
                                <div class="btn_Add pro_box" title="加入购物车">
                                            <a href="javascript:void(0)" class="pro-check addCart">加入购物车</a>
                                        </div>
                                    </div>
                        </div>
                    </li>
              `
                }).join("");
                $(".pro-con").html(html);
            },
            error: function () {
                console.log("++");
            }
        });
    }

    $(".listop-left li").click(function () {
        let index = $(this).index();
        currentType = index;
        console.log(currentType);

        getDatWithPage(currentType, 0);
        $(this).addClass(".pro-list-on").siblings().removeClass(".pro-list-on");
    })
});
/* var img=$(".imgbig");
var arr=[];
for(var i=0;i<img.length;i++){
    var o={};
    o.src=$(".imgbig img").eq(i).attr("src")
    arr.push(o);
}
console.log(JSON.stringify(arr)) */