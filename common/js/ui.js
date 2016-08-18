var app = app || {};
var hasJqueryObject = function( $elem ){ return $elem.length > 0 };

app.setDataList = function(){
    app.$contents = app.$body.find("#contents");
    app.contentsWidth = app.$contents.width();
    app.$viewWrap = app.$contents.find(".viewWrap");
    $.getJSON( "https://yoyo-mabyung.c9users.io/postManager/humor", function( data ) {
        console.log(data)
        var html = "";
        html += "<ul>";
        for(var i = 0; i < data.length; i++){
            html += "<li>";
            html += "<a href='#'>";
            html += "<div class='imgWrap'>";
            html += "<img src="+ data[i].thumb +" alt='' />";
            html += "</div>";
            html += "<div class='txtWrap'>";
            html += "<p class='tit'>"+ data[i].title +"</p>";
            html += "</div>";
            html += "</a>";
            html += "</li>";
        }
        html += "</ul>";
        app.$viewWrap.html(html);
        app.initPositionList();
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

app.setDataDetail = function(){
    app.$detailView = app.$body.find(".detailView");
    $.getJSON( "https://yoyo-mabyung.c9users.io/postManager/humor", function( data ) {
		console.log(data)
        var html = "";
        html += "<h2 class='tit'>"+ data[4].title +"</h2>";
        html += "<div class='conWrap'>";
        for(var i = 0; i < data[0].imgList.split("///").length; i++){
            html += "<p><img src="+ data[4].imgList.split("///")[i] +" alt='' /></p>";
        }
        html += "</div>";
        app.$detailView.html(html);
    });
};

$(function(){
    app.$body = $("body");
    if(hasJqueryObject(app.$body.find(".viewWrap"))) app.setDataList();
    if(hasJqueryObject(app.$body.find(".detailView"))) app.setDataDetail();
});