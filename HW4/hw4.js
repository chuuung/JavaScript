

$(function(){
    let imgs = $('img');
    let now_page = 1;
    const page_width = 60, page_gap = 10;
    const pageXinit = (640 -(page_width*imgs.length))/2;
    const viewer = document.getElementById("viewer");

    //set page button
    for(let i = 0; i < imgs.length; i++){
        let page = $(`<span class = \"page\" id = page${i+1}></span>`).text("");
        $("#viewer").append(page);

        if (i == 0) $(".page").attr("class", "nowpage");//default page use nowpage class
        else $(".page").attr("class", "page");

        $(`#page${i+1}`).css({"width": `${page_width}px`, "left": `${i*(page_width+page_gap) + pageXinit}px`}); //set width and left
    }

    //previous and next button

    //buttons appear when mouse on the picture
    $('#pre, #next, .page, .nowpage').hide();
    
    $('#viewer').mouseover(function(){
        $('#pre, #next, .page, .nowpage').show();
    }).mouseout(function(){
        $('#pre, #next, .page, .nowpage').hide();
    });

    $('#pre, #next').hover(function(){
        // console.log($(this).attr('id'));
        $(this).css("opacity", 1.0);
    },function(){
        $(this).css("opacity", 0.6);
    });

    //set pre and next event
    $('#pre, #next').click(function(){
        let which_pic = imgs.index($('img:visible'));
        $(`#page${which_pic+1}`).removeClass();
        $(`#page${which_pic+1}`).addClass('page');

        //get which button be clicked
        if ($(this).attr('id') == "pre") which_pic = (which_pic-1+imgs.length)%imgs.length;
        else which_pic = (which_pic+1)%imgs.length;
        
        $(`#page${which_pic+1}`).removeClass();
        $(`#page${which_pic+1}`).addClass('nowpage');

        imgs.hide();
        imgs.eq(which_pic).show();
        now_page = which_pic+1;
    });

    //page button
    function change_page_class(who_click){
        $(`#page${now_page}`).removeClass();
        $(`#page${now_page}`).addClass('page');
        $(`#page${who_click}`).removeClass();
        $(`#page${who_click}`).addClass('nowpage');
    }

    for (let i = 0; i < imgs.length; i++){
        $(`#page${i+1}`).click(function(){

            change_page_class(i+1);
            imgs.hide();
            imgs.eq(i).show();
            now_page = i+1;
        });
    }

})