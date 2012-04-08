/**
 * Created by JetBrains WebStorm.
 * User: zwj
 * Date: 12-3-31
 * Time: 下午10:46
 * To change this template use File | Settings | File Templates.
 */
var objs = $("body .sc-fed"),len = objs.length,cm = 0;
function initFed(){
    initPos();
    initBg();
    initMove();
}
function initPos(){
    var pos = startPos();
    objs.each(function(){
        $(this).css("left",pos.x + "px")
               .css("top",pos.y + "px")
               .css("opacity","0");
    });
}
function initBg(){
    var bgu = $("#sc-bgup"),bgd = $("#sc-bgdown"),c = getCenter(),tbgu = null,tbgd = null;
    bgu.dir = "left";
    bgd.dir = "right";
    var dest = bgu.parent().width() - bgu.width();
    bgu.css("top",(c.y - 16) + "px").fadeIn("fast");
    bgd.css("left",dest + "px").css("top",(c.y + objs.eq(0).height() - 52) + "px").fadeIn("fast");
    bgu.animate({"left":dest + "px"},6000,function(){bgu.dir = "right"});
    bgd.animate({"left":0},6000,function(){bgd.dir = "left"});
    if(tbgu){clearInterval(tbgu);}
    tbgu = setInterval(function(){
        if(bgu.dir == "left"){
            bgu.animate({"left":dest + "px"},6000,function(){bgu.dir = "right"});
        }else if(bgu.dir == "right"){
            bgu.animate({"left":0},6000,function(){bgu.dir = "left"});
        }
    },6100);
    if(tbgd){clearInterval(tbgd);}
    tbgd = setInterval(function(){
        if(bgd.dir == "left"){
            bgd.animate({"left":dest + "px"},6000,function(){bgd.dir = "right"});
        }else if(bgd.dir == "right"){
            bgd.animate({"left":0},6000,function(){bgd.dir = "left"});
        }
    },6100);
}
function startPos(){
    var start = {};
    start.x = $(window).width();
    start.y = -$(objs[0]).height();
    return start;
}
function endPos(){
    var end = {};
    end.x = -objs.eq(0).width();
    end.y = -objs.eq(0).height();
    return end;
}
function getCenter(){
    var center = {};
    var window_w = $(window).width(),
        window_h = $(window).height(),
        obj_w = $(objs[0]).width(),
        obj_h = $(objs[0]).height();
    center.x = (window_w - obj_w) / 2 + $(window).scrollLeft();
    center.y = (window_h - obj_h) / 2 + $(window).scrollTop();
    return center;
}
function initMove(){
    var _t = null,center = getCenter(),start = startPos(),end = endPos();
    objs.eq(cm).animate({"left":center.x + "px","top":center.y + "px","opacity":1},600,function(){});
    function autoMove(){
        if(_t){clearInterval(_t);}
        _t = setInterval(function(){
            objs.eq(cm).animate({"left":end.x + "px","top":end.y + "px","opacity":0},600,function(){
                $(this).css("left",start.x + "px")
                    .css("top",start.y + "px")
                    .css("opacity",0);
            });
            if(++cm >= len){cm = 0;}
            objs.eq(cm).animate({"left":center.x + "px","top":center.y + "px","opacity":1},600,function(){});
        },2000);
    }
    autoMove();
    objs.each(function(){
        $(this).hover(function(){
            if(_t){clearInterval(_t);}
        },function(){
           autoMove();
        });
    });
}
function initCake(){
    var obj = $("#sc-cake"),c = getCenter(),obj_w = obj.width(),obj_h = obj.height();
    var img = obj.children().eq(0),iL = img.width() / 2,iT = img.height() / 2;
    img.css("position","absolute")
        .css("left",-iL + "px")
        .css("top",-iT + "px")
        .animate({"left":0,"top":0},600,function(){});
    obj.css("width",0)
        .css("height",0)
        .css("left",c.x + obj_w / 2)
        .css("top",c.y + obj_h / 2)
        .animate({"width":obj_w + "px","height":obj_h + "px","left":c.x + "px","top":c.y + "px"},600,function(){
            setTimeout(function(){
                obj.fadeOut("slow",function(){
                    initFed();
                });
            },10000);
        });
}
initCake();