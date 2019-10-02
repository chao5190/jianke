$(function () {
    new Promise(
        function (resolve) {
            let id = decodeURI(window.location.search.slice(4));

            $.ajax({
                type: "post",
                url: "../server/getcart.php",
                data: `id=${id}`,
                dataType: "json",
                success: function (response) {
                    let data = response.data[0];
                    let minsrc = data.src;
                    let maxsrc = minsrc.substring(0, minsrc.length - 12) + ".jpg";
                    let p = data.p;
                    let title;
                    p.split(" ")[0].length < 4 ? title = (p.split(" ")[0] + p.split(" ")[1]) : title = p.split(" ")[0];
                    console.log(title);

                    price = "￥" + data.span;
                    $(".widet h1").text(title);
                    $(".tongyong dd a").text(title);
                    $(".effect_p .text").text(p);
                    $(".bigPrice dd em").text(price);
                    $(".min-img img").attr("src", minsrc);
                    $(".max-img img").attr("src", maxsrc);
                    // $(".tongyong dd a").text()
                    resolve();
                },
                error: function (response) {
                    console.log("--");

                }
            });

        }
    ).then(function () {
        let Pad = $('.magnify-box');
        let minBox = $(".min-img");
        let maxBox = $('.max-img');
        let maxImg = $('.max-img img');
        let mask = $(".mask");
        // 第一步 绑定鼠标移入事件
        minBox.mouseenter(function () {
            mask.css("display", "block");
            maxBox.css("display", "block");
        })
        // 第二步 当鼠标在图片上移动的时候绑定移动事件
        minBox.mousemove(function (e) {
            // 为什么没有用 minBox.offsetLeft
            var x = e.pageX - Pad.offset().left - mask.width() / 2;
            var y = e.pageY - Pad.offset().top - mask.height() / 2;
            // 为了不让遮罩出去，需要限制范围
            // 遮罩可以运动的最大范围
            let maxX = minBox.width() - mask.width(); // 100px
            let maxY = minBox.height() - mask.height();
            if (x <= 0) {
                x = 0;
            }
            if (y <= 0) {
                y = 0;
            }
            if (x >= maxX) {
                x = maxX;
            }
            if (y >= maxY) {
                y = maxY;
            }
            let maskleft = x + "px";
            let masktop = y + "px"
            mask.css("left", maskleft);
            mask.css("top", masktop);

            // 大图片可以运动的最大X方向的距离
            let maxImgX = maxImg.width() - maxBox.width(); // 200px
            let maxImgY = maxImg.height() - maxBox.height();
            let biliX = maxImgX / maxX; // 2;
            let biliY = maxImgY / maxY; // 2
            // 大盒子运动的距离 = 遮罩每像素移动的距离 * 遮罩运动的距离
            maxImg.css("left", `-${x * biliX}px`);
            maxImg.css("top", `-${y * biliY}px`);
        })

        // 第三部 绑定鼠标移出事件

        minBox.mouseleave(function () {
            mask.css("display", "none");
            maxBox.css("display", "none");
        })


        let index = 1;
        $("#QuantityText").blur(function () {
            index = $("#QuantityText").val() * 1;
        })


        $(".btntop").click(function () {
            index++;
            $("#QuantityText").val(index);
        })
        $(".btnbottom").click(function () {
            index--;
            if (index < 0) {
                index = 0;
            }
            $("#QuantityText").val(index);
        })
        $(".require").click(function () {
            let count = $("#QuantityText").val();
            let id = decodeURI(window.location.search.slice(4));
            $.ajax({
                type: "post",
                url: "../server/updateData.php",
                data: `count=${count}&id=${id}`,
                dataType: "json",
                success: function (response) {
                    console.log(response);

                }
            });

        })


    })

})