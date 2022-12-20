

$(function(){
    let imgs = $('img');
    let now_page = 1;
    const page_width = 60, page_gap = 10;
    

    // console.log(parseInt(document.getElementById("viewer").style.width));
    const pageXinit = (640 -(page_width*imgs.length))/2;
    console.log(pageXinit);
    const viewer = document.getElementById("viewer");
    for(let i = 0; i < imgs.length; i++){
        // let page = document.createElement("span");
        let page = $(`<span class = \"page\" id = page${i+1}></span>`).text("");
        $("#viewer").append(page);

        if (i == 0) $(".page").attr("class", "nowpage");
        else $(".page").attr("class", "page");

        $(`#page${i+1}`).css({"width": `${page_width}px`, "left": `${i*(page_width+page_gap) + pageXinit}px`});
        // $(".page").css("left", "150");
        // $(".page").css("left", `${i*(page_width+page_gap) + pageXinit}`);

        
        // if (i == 0) page.setAttribute("class", "nowpage");
        // else page.setAttribute("class", "page");

        // page.setAttribute("id", `page${i+1}`);
        // page.style.width = page_width + "px";
        // page.style.left = i*(page_width+page_gap) + pageXinit + "px";
        // viewer.append(page);
    }
    
    $('#pre').click(function(){
        let which_pic = imgs.index($('img:visible'));
        $(`#page${which_pic+1}`).removeClass();
        $(`#page${which_pic+1}`).addClass('page');

        which_pic = (which_pic-1+imgs.length)%imgs.length;
        $(`#page${which_pic+1}`).removeClass();
        $(`#page${which_pic+1}`).addClass('nowpage');

        imgs.hide();
        imgs.eq(which_pic).show();
        now_page = which_pic+1;
    });

    $('#next').click(function(){
        let which_pic = imgs.index($('img:visible'));
        $(`#page${which_pic+1}`).removeClass();
        $(`#page${which_pic+1}`).addClass('page');

        which_pic = (which_pic+1)%imgs.length;
        $(`#page${which_pic+1}`).removeClass();
        $(`#page${which_pic+1}`).addClass('nowpage');
        imgs.hide();
        imgs.eq(which_pic).show();
        now_page = which_pic+1;
    });

    $('#page1').click(function(){

        $(`#page${now_page}`).removeClass();
        $(`#page${now_page}`).addClass('page');
        $('#page1').removeClass();
        $('#page1').addClass('nowpage');

        imgs.hide();
        imgs.eq(0).show();
        now_page = 1;
    });

    $('#page2').click(function(){

        $(`#page${now_page}`).removeClass();
        $(`#page${now_page}`).addClass('page');
        $('#page2').removeClass();
        $('#page2').addClass('nowpage');

        imgs.hide();
        imgs.eq(1).show();
        now_page = 2;
    });

    $('#page3').click(function(){
        $(`#page${now_page}`).removeClass();
        $(`#page${now_page}`).addClass('page');
        $('#page3').removeClass();
        $('#page3').addClass('nowpage');

        imgs.hide();
        imgs.eq(2).show();
        now_page = 3;
    });

    $(".page").hover(function(){
        $(".page").css({"background-color": "yellow", "opacity": 1.0});
    },function(){
        $(".page").css({"background-color": "", "opacity": 0.4});
    });

})