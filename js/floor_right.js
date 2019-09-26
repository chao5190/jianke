$(function () {
    $.ajaxSetup({
        type: "post",
        global: false,
        dataType: "json",
    });
    // 楼层渲染
    $.ajax({
        url: "./server/getdata.php",
        data: "table=\"wrap_right_big\"",
        success: function (response) {
            rightBig = response.data;

            function Floor_right_l() {}
            Floor_right_l.prototype = {
                    init: function (items) {
                        this.html = this.addElement(items);
                        this.inSetView(this.html, items);
                        // this.ul = this.addElement2(items);
                        // this.inSetView2();
                        // this.li = this.ul.children;
                        // this.addEvent();
                    },
                    addElement(items) {
                        let html = `<div class="floor_right_l">
                        <a href="" target="_blank">
                            <img src=${rightBig[items].bigimg} height="430" width="340">
                                            <div class="floor_r_t">
                                <h3>${rightBig[items].h3}</h3>
                                <p>${rightBig[items].p}</p>
                            </div>
                        </a>
                    </div>`;
                        return html;
                    },
                    inSetView(ele, items) {
                        $(".floor_left").eq(items).after(ele)
                    }
                },
                new Floor_right_l().init(0)
            new Floor_right_l().init(1)
            new Floor_right_l().init(2)
            new Floor_right_l().init(3)
            new Floor_right_l().init(4)
            new Floor_right_l().init(5)
        }
    })

    $.ajax({
        url: "./server/getdata.php",
        data: "table=\"wrap_right_li\"",
        success: function (response) {
            rightLi = response.data;

            function RightLi() {}
            RightLi.prototype = {
                    init: function (items) {
                        this.html = this.addElement(items);
                        this.inSetView(this.html, items);
                    },
                    addElement(items) {
                        items == 0 ? index = 0 : index = 6 * items;
                        let html = ` 
                        <div class="floor_right_r">
                                <ul class="right_box_l clearfix">
                                    <li>
                                        <a href="#" target="_blank">
                                            <div><p>${rightLi[index].p}</p></div>
                                            <img src=${rightLi[index].src} height="160" width="160" alt=${rightLi[index].p} class="box_img">
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" target="_blank">
                                            <div><p>${rightLi[index+1].p}</p></div>
                                            <img src=${rightLi[index+1].src} height="160" width="160" alt=${rightLi[index+1].p} class="box_img">
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" target="_blank">
                                            <div><p>${rightLi[index+2].p}</p></div>
                                            <img src=${rightLi[index+2].src} height="160" width="160" alt=${rightLi[index+2].p} class="box_img">
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" target="_blank">
                                            <div><p>${rightLi[index+3].p}</p></div>
                                            <img src=${rightLi[index+3].src} height="160" width="160" alt=${rightLi[index+3].p} class="box_img">
                                        </a>
                                    </li>
                                </ul>
                                <ul class="right_box_r">
                                    <li>
                                        <a href="#" target="_blank">
                                            <div><p>${rightLi[index+4].p} </p></div>
                                            <img src=${rightLi[index+4].src} height="110" width="110" alt=${rightLi[index+4].p} class="r_box_img">
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" target="_blank">
                                            <div><p>${rightLi[index+5].p}</p></div>
                                            <img src=${rightLi[index+5].src} height="110" width="110" alt=${rightLi[index+5].p} class="r_box_img">
                                        </a>
                                    </li>
                                    <li>
                                        <a href="//www.jianke.com/product/150526.html" target="_blank">
                                            <div><p>${rightLi[index+6].p}</p></div>
                                            <img src=${rightLi[index+6].src} height="110" width="110" alt=${rightLi[index+6].p} class="r_box_img">
                                        </a>
                                    </li>
                                </ul>
                            </div>`;
                        return html;
                    },
                    inSetView(ele, items) {
                        $(".floor_right_l").eq(items).after(ele)
                    }
                },
                new RightLi().init(0)
            new RightLi().init(1)
            new RightLi().init(2)
            new RightLi().init(3)
            new RightLi().init(4)
            new RightLi().init(5)

        }
    })


    /* 
   
    
    */
})
/* 

*/