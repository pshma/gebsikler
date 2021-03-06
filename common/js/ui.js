var app = app || {};
var hasJqueryObject = function( $elem ){ return $elem.length > 0 };

app.setDataList = function(){
    $.getJSON( "https://yoyo-mabyung.c9users.io/postManager/humor", function( data ){
        console.log("humor");
        console.log(data);
        app.initHtmlList(data);
    });
};

app.handleGnbClick = function(){
    app.key = $(this).data("key");
    app.$gnbBtn.parents("li").removeClass("current");
    $(this).parents("li").addClass("current");
    $(".viewWrap").find("ul").remove();
    switch(app.key){
        case 0 :
            $.getJSON( "https://yoyo-mabyung.c9users.io/postManager/humor", function( data ){
                console.log("humor");
                app.initHtmlList(data, app.key);
            });
            break;

        case 1 :
            $.getJSON( "https://yoyo-mabyung.c9users.io/postManager/girls", function( data ){
                console.log("girls");
                app.initHtmlList(data, app.key);
            });
            break;

        case 2 :
            $.getJSON( "https://yoyo-mabyung.c9users.io/postManager/cam", function( data ){
                console.log("cam");
                app.initHtmlList(data, app.key);
            });
            break;

        case 3 :
            $.getJSON( "https://yoyo-mabyung.c9users.io/postManager/animal", function( data ){
                console.log("animal");
                app.initHtmlList(data, app.key);
            });
            break;
    }
    return false;
};

app.initHtmlList = function(data, key){
    app.data = data;
    app.dataLength = app.data.length;
    var listHtml = "";
    listHtml += "<ul>";
    for(var i = (app.dataLength-1); i >= 0; i--){
        listHtml += "<li data-key="+ i +">";
        listHtml += "<a href='#'>";
        listHtml += "<div class='imgWrap'>";
        if(key === 2){
            listHtml += "<img src="+ app.data[i].thumbURL +" alt='' />";
        } else {
            listHtml += "<img src="+ app.data[i].thumb +" alt='' />";
        }
        listHtml += "</div>";
        listHtml += "<div class='txtWrap'>";
        listHtml += "<p class='tit'>"+ app.data[i].title +"</p>";
        listHtml += "<p class='date'>"+ app.data[i].date +"</p>";
        listHtml += "</div>";
        listHtml += "</a>";
        listHtml += "</li>";
    }
    listHtml += "</ul>";
    app.$viewWrap.html(listHtml);
    app.handlePositionList();
    console.log("Complete");
};

app.handlePositionList = function(){
    app.$viewList = app.$viewWrap.find(">ul>li");
    app.viewListWidth = app.$viewList.width();
    app.viewListHeight = app.$viewList.height();
    app.setCount = parseInt(app.contentsWidth / app.viewListWidth);
    app.gap = 20;
    if(parseInt(app.$viewList.length/app.setCount) === 0 ) app.$viewWrap.css({ "height" : app.viewListHeight });
    else app.$viewWrap.css({ "height" : parseInt(app.viewListHeight + app.gap) * Math.ceil(app.$viewList.length/app.setCount) - app.gap });
    app.$viewList.each(function(idx){
        var posY = (app.viewListHeight + app.gap) * parseInt(idx / app.setCount);
        var posX = (app.viewListWidth + app.gap) * parseInt(idx % app.setCount);
        $(this).css({ "top" : posY, "left" : posX });
    });
};

app.handleDetailViewClick = function(){
    var key = $(this).parents("li").attr("data-key");
    app.$popWrap = app.$body.find(".popWrap");
    app.$popTit = app.$popWrap.find(".tit");
    app.$popConWrap = app.$popWrap.find(".conWrap");
    app.$dim = app.$body.find(".dim");
    app.$popTit.html(app.data[key].title);

    if(app.key === 2){
        app.$popConWrap.html("<p><iframe width='700' height='500' src='https://www.youtube.com/embed/"+ app.data[key].videoID +"' frameborder='0' allowfullscreen></iframe></p>");
    } else{
        for(var i =0; i < app.data[key].imgList.split("///").length; i++){
            app.$popConWrap.append("<p><img src="+ app.data[key].imgList.split("///")[i] +" src='' /></p>");
        }
    }
    setTimeout(function(){
        app.$popWrap.css({ "visibility" : "visible" } );
        app.$dim.show();
        app.handlePopAlign();
    }, 1000);
    return false;
};

app.handlePopAlign = function(){
    var winW = $(window).width();
    var winH = $(window).height();
    var popW = app.$popWrap.width();
    var popH = app.$popWrap.height();
    app.$popWrap.css({"top" : parseInt((winH - popH) *.5), "left" : parseInt((winW - popW) *.5) });
};

app.handlePopCloseClick = function(){
    app.$popWrap.css({ "visibility" : "hidden" });
    app.$dim.hide();
    app.$popTit.contents().remove();
    app.$popConWrap.contents().remove();
};

app.initGebsiklerEvent = function(){
    app.setDataList();
    app.$gnbBtn.on("click", app.handleGnbClick);
    app.$viewWrap.on("click", ">ul>li>a", app.handleDetailViewClick);
    app.$body.on("click", ".btnClose, .dim", app.handlePopCloseClick);
};

$(function(){
    app.$body = $("body");
    app.$contents = app.$body.find("#contents");
    app.contentsWidth = app.$contents.width();
    app.$viewWrap = app.$contents.find(".viewWrap");
    app.$gnb = app.$body.find("#gnb");
    app.$gnbBtn = app.$gnb.find(">ul>li>a");
    app.$gnbBtn.each(function(idx){$(this).data("key", idx)});
    if(hasJqueryObject(app.$body)) app.initGebsiklerEvent();
});

$(window).on("resize", function(){
    if(hasJqueryObject(app.$body.find(".popWrap"))) app.handlePopAlign();
});