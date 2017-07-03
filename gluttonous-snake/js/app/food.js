/**
 * Created by 王成 on 2017-05-26.
 */
define(['config', 'fence'],function(appconfig, fence){
    //对外暴露的食物food对象
    var food = {};

    //私有成员常量
    var GRID = appconfig.BOUND.D;
    var FENCE_BOUND = fence.getBound();
    var RANGE_X = FENCE_BOUND.right - FENCE_BOUND.left + 1;
    var RANGE_Y = FENCE_BOUND.bottom - FENCE_BOUND.top + 1;

    //私有成员变量
    var x = 0;
    var y = 0;
    var foodImg = new Image();
    foodImg.src = "res/food.png";

    //公共成员方法
    /**
     * 初始化食物坐标
     */
    food.init = function(){
        food.changePosition();
        FENCE_BOUND = fence.getBound();
            RANGE_X = FENCE_BOUND.right - FENCE_BOUND.left + 1;
        RANGE_Y = FENCE_BOUND.bottom - FENCE_BOUND.top + 1;
/*        console.log("x："+FENCE_BOUND.left+"~"+FENCE_BOUND.right);
        console.log("y："+FENCE_BOUND.top+"~"+FENCE_BOUND.bottom);*/
        return;
    };

    /**
     * 返回食物的坐标
     * @returns {Object}
     */
    food.getPosition = function(){
        return new Object({x: x, y: y});
    };

    /**
     * 改变食物的位置
     */
    food.changePosition = function(){
        //产生0~RANGE_X的整数，不包括RANGE_X
        x = Math.floor(Math.random()*RANGE_X) + FENCE_BOUND.left;
        //产生0~RANGE_Y的整数，不包括RANGE_Y
        y = Math.floor(Math.random()*RANGE_Y) + FENCE_BOUND.top;
        /*console.log(x+","+y);*/
        return;
    };

    food.draw = function(context){
        //fillCircle(context, x, y, GRID/2, "#f00");
        drawFood(context, foodImg, x, y, GRID, GRID);
        return;
    };
    //私有成员方法
    var fillCircle = function(context, x, y, r, color) {
        x = GRID * x ;
        y = GRID * y ;
        context.save();
        context.translate(r+0.5, r+0.5);
        context.fillStyle = color;
        context.strokeStyle = color;
        context.beginPath();
        context.arc(x, y, r*0.75, 0, Math.PI*2, false);
        context.closePath();
        context.fill();
        context.restore();
    };
    var drawFood = function(context, img, x, y, w, h){
        x = GRID * x;
        y = GRID * y;
        context.save();
        context.translate(x+0.5, y+0.5);
        context.drawImage(img, 0, 0, w, h);
        context.restore();
        return;
    };

    return food;
});