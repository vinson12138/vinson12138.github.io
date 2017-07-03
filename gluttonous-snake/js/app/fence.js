/**
 * Created by 王成 on 2017-05-27.
 */
define(['config'],function(appconfig){
    //对外暴露的栅栏fence对象
    var fence = {};

    //私有成员常量
    var BOUND = appconfig.BOUND;

    //私有成员变量
    var x = 0;
    var y = 2;
    var w = 10;
    var h = 10;
    var color = "#0ff";
    var fenceImg = new Image();
    fenceImg.src = "res/fence.png";

    //公共成员方法
    /**
     * 初始化栅栏的左上角位置，长，宽
     *
     * @param x
     * @param y
     * @param w
     * @param h
     */
    fence.init = function(_x, _y, _w, _h){
        x = _x;
        y = _y;
        w = _w;
        h = _h;
    };

    /**
     * 返回栅栏的边界的坐标
     * @returns {Object}
     */
    fence.getBound = function(){
        return new Object({left: x+1, right: x+w-2, top: y+1, bottom: y+h-2});
    };

    fence.draw = function(context){
        //1.画栅栏上部和下部
        for(var i = 0; i < w; i++){
            /*fillRect(context, x+i, y, 1, 1, color, color);
            fillRect(context, x+i, y+(h-1), 1, 1, color, color);*/
            drawImg(context, fenceImg, x+i, y);
            drawImg(context, fenceImg, x+i, y+(h-1));
        }
        //2.画栅栏左部和右部
        for(var i = 0, len = h-2; i < len; i++){
            /*fillRect(context, x, (y+1)+i, 1, 1, color, color);
            fillRect(context, x+(w-1), (y+1)+i, 1, 1, color, color);*/
            drawImg(context, fenceImg, x, (y+1)+i);
            drawImg(context, fenceImg, x+(w-1), (y+1)+i);
        }
        //drawImg(context, img, x, y);
        return;
    };
    //私有成员方法
    var fillRect = function(context, x, y, w, h, fcolor, scolor) {
        //将相对坐标和宽度转换为实际坐标和宽度
        x = BOUND.D * x;
        y = BOUND.D * y;
        w = BOUND.D * w;
        h = BOUND.D * h;

        context.save();
        context.translate(x+0.5, y+0.5);
        context.fillStyle = fcolor;
        context.strokeStyle = scolor;
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(w, 0);
        context.lineTo(w, h);
        context.lineTo(0, h);
        context.closePath();
        context.fill();
        context.stroke();
        context.restore();
    };
    var drawImg = function(context,img, x, y){
        x = BOUND.D * x;
        y = BOUND.D * y;

        context.save();
        context.translate(x+0.5, y+0.5);
        context.drawImage(img, 0, 0, BOUND.D, BOUND.D);
        context.restore();
    };

    return fence;
});