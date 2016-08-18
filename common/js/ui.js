var app = app || {};
var hasJqueryObject = function( $elem ){ return $elem.length > 0 };

app.setDataList = function(){
    app.$contents = app.$body.find("#contents");
    app.contentsWidth = app.$contents.width();
    app.$viewWrap = app.$contents.find(".viewWrap");
    $.getJSON( "https://yoyo-mabyung.c9users.io/postManager/humor", function( data ){
        app.data = data;
        var listHtml = "";
        listHtml += "<ul>";
        for(var i = 0; i < app.data.length; i++){
            listHtml += "<li data-key="+ i +">";
            listHtml += "<a href='#'>";
            listHtml += "<div class='imgWrap'>";
            listHtml += "<img src="+ app.data[i].thumb +" alt='' />";
            listHtml += "</div>";
            listHtml += "<div class='txtWrap'>";
            listHtml += "<p class='tit'>"+ app.data[i].title +"</p>";
            listHtml += "</div>";
            listHtml += "</a>";
            listHtml += "</li>";
        }
        listHtml += "</ul>";
        app.$viewWrap.html(listHtml);
        app.initPositionList();
        app.$viewWrap.find(">ul>li>a").on("click", app.handleDetailViewClick);
        app.$body.on("click", ".btnClose, .dim", app.handlePopCloseClick);
    });
};

app.initPositionList = function(){
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
    var popHtml = "";
    popHtml += "<div class='popWrap'>";
    popHtml += "<h2 class='tit'>"+ app.data[key].title +"</h2>";
    popHtml += "<div class='conWrap'>";
    for(var i =0; i < app.data[key].imgList.split("///").length; i++){
        popHtml += "<p><img src="+ app.data[key].imgList.split("///")[i] +" alt='' /></p>";
    }
    popHtml += "</div>";
    popHtml += "<button type='button' class='btnClose'>Close</button>";
    popHtml += "</div>";
    popHtml += "<div class='dim'></div>";
    app.$body.append(popHtml);
    app.$popWrap = app.$body.find(".popWrap");
    app.$dim = app.$body.find(".dim");
    app.handlePopAlign();
    return false;
};

app.handlePopAlign = function(){
    var winW = $(window).width();
    var winH = $(window).height();
    var popW = app.$popWrap.width();
    var popH = app.$popWrap.height();
    app.$popWrap.css({ "top" : parseInt((winH - popH) *.5), "left" : parseInt((winW - popW) *.5) });
};

app.handlePopCloseClick = function(){
    app.$popWrap.remove();
    app.$dim.remove();
};

$(function(){
    app.$body = $("body");
    if(hasJqueryObject(app.$body.find(".viewWrap"))) app.setDataList();
});

$(window).on("resize", function(){
    if(hasJqueryObject(app.$body.find(".popWrap"))) app.handlePopAlign();
});