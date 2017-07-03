/**
 * Created by 王成 on 2017-05-26.
 */
define(['config'],
    function(appconfig){
        ///向外暴露的蛇snake对象
        var snake = {};

        //私有成员常量
        var DIR = appconfig.DIR;
        var ROTATE = appconfig.ROTATE;
        var BOUND = appconfig.BOUND;


        //私有成员变量
        var body = [];
        var moveDir = 0;
        var nextDir = 0;
        var rotate = 90;
        var headImg = new Image();
        var bodyImg = new Image();
        var tailImg = new Image();
        var clockwiseBody = new Image();
        var anticlockwiseBody = new Image();
        headImg.src = "res/head.png";
        bodyImg.src = "res/body.png";
        tailImg.src = "res/tail.png";
        clockwiseBody.src = "res/clockwise.png";
        anticlockwiseBody.src = "res/anticlockwise.png";

        //公有成员方法
        /**
         * 初始化蛇对象
         * @param x 头的x坐标
         * @param y 头的y坐标
         * @param len 体长
         * @param dir 移动方向
         */
        snake.init = function(x, y, len, dir){
            body = [];
            moveDir = 0;
            moveDir = dir;
            nextDir = dir;
            switch (dir){
                case DIR.UP:    rotate = ROTATE.UP;    break;
                case DIR.DOWN:  rotate = ROTATE.DOWN;  break;
                case DIR.LEFT:  rotate = ROTATE.LEFT;  break;
                case DIR.RIGHT: rotate = ROTATE.RIGHT; break;
            }
            for(var i=0; i < len; i++){
                body.push({x: x-i, y: y, rotate: rotate, clockwise:null});
            }
        };

        /**
         * 获取蛇当前运动方向
         * @returns {number}
         */
        snake.getDirection = function(){
            return moveDir;
        };

        /**
         * 更改蛇的移动方向
         * 只有接下来的方向不与当前方向相反时，才能改变下一步的方向
         * 并且只有调用move()时，才真正改变当前移动方向
         * 因为1帧动画的时间间隔changeDirection可能会被调用多次
         * 例如在第1帧，当前方向为right,在这1帧的间隔中键入2次，第一次键入方向为down,第二次为left,这明显是允许的
         * 但是在接下来的一帧中根据第二次键入的方向，向左移动,这显然不对
         * 因此每次changeDirection只能改变nextDir，并且方向能够改变得与当前方向作比较
         *
         * @param dir 接下来的方向
         */
        snake.changeDirection = function(dir){
            if(dir == DIR.UP && moveDir != DIR.DOWN) nextDir = dir;
            if(dir == DIR.DOWN && moveDir != DIR.UP) nextDir = dir;
            if(dir == DIR.LEFT && moveDir != DIR.RIGHT) nextDir = dir;
            if(dir == DIR.RIGHT && moveDir != DIR.LEFT) nextDir = dir;
        };

        /**
         * 蛇移动
         */
        snake.move = function(){
            var x = body[0].x ;
            var y = body[0].y ;
            var clockwise = null;

            if((moveDir+1) % 4 === nextDir) clockwise = true;
            else if(moveDir === nextDir) clockwise = null;
            else clockwise = false;

            moveDir = nextDir;
            switch (moveDir) {
                case DIR.UP :
                    y--;
                    rotate = ROTATE.UP;
                    break;
                case DIR.DOWN :
                    y++;
                    rotate = ROTATE.DOWN;
                    break;
                case DIR.LEFT :
                    x--;
                    rotate = ROTATE.LEFT;
                    break;
                case DIR.RIGHT :
                    x++;
                    rotate = ROTATE.RIGHT;
                    break;
            }

            /**
             * 先删除数组中最后一个点，并将新点添加到数组头
             * 因此原来数组中的第一个点就变成了第二个点，相当于后面的每个点向前移动了
             */
            body.pop();
            body.unshift({x: x, y: y, rotate: rotate, clockwise: null});
            body[1].clockwise = clockwise;
        };

        /**
         * 检查蛇是否吃到食物
         * @param food
         * @returns {boolean}
         */
        snake.eat = function(food){
            if(body[0].x == food.x  && body[0].y == food.y) return true;
            return false;
        };

        /**
         * 蛇身体增长，
         * 添加的点的坐标值无所谓，在下一帧就会变成原来最后一个点的值
         */
        snake.grow = function(){
            var last = body.length -1;
            body.push(body[last]);
        };

        /**
         * 检查蛇是否自噬
         * @returns {boolean}
         */
        snake.autophagy = function(){
            for(var i = 1, len=body.length; i < len; i++){
                if(body[0].x == body[i].x && body[0].y == body[i].y){

                    return true;
                }
            }
            return false;
        };

        /**
         * 检测蛇知否碰撞墙
         * @param isDetect 是否开启检测
         * @returns {boolean}
         */
        snake.collide = function(fence){
            if(x < fence.left || x > fence.right || y < fence.top || y > fence.bottom){
                return true;
            }
            return false;
        };
        snake.collide = function(fence, isDetect){
            var isDetect = isDetect==undefined?true:isDetect;
            var x = body[0].x;
            var y = body[0].y;
            if(!isDetect){
                if (x < fence.left) body[0].x = fence.right;
                if (x > fence.right) body[0].x = fence.left;
                if (y < fence.top) body[0].y = fence.bottom;
                if (y > fence.bottom) body[0].y = fence.top;
                return false;
            }
            if(x < fence.left || x > fence.right || y < fence.top || y > fence.bottom){
                return true;
            }
            return false;
        };

        /**
         * 绘制蛇
         * @param context
         */
        snake.draw = function(context){
            var img = new Image();
            for(var i = body.length - 1; i >= 0; i--){
                if (i == 0) img = headImg;
                else if(i== body.length - 1 ) img = tailImg;
                else {
                    if(body[i].clockwise == null) img = bodyImg;
                    else if(body[i].clockwise) img = clockwiseBody;
                    else img = anticlockwiseBody;
                }

                drawImg(context, img, body[i].x, body[i].y, body[i].rotate, BOUND.D, BOUND.D);

                /*if (i == 0)
                    fillHeadRect(context, body[i].x, body[i].y, BOUND.D, BOUND.D, "#0f0");
                else
                    fillBodyRect(context, body[i].x, body[i].y, BOUND.D, BOUND.D, "#ff0");*/
            }
        };

        /**
         * 获取蛇私有变量信息
         * @returns {Object}
         */
        snake.getObject = function(){
            var snake = new Object({body: body, length: body.length, direction: moveDir});
            return snake;
        };

        //私有成员方
        var fillHeadRect = function(context, x, y, w, h, color) {
            x = BOUND.D * x;
            y = BOUND.D * y;
            context.save();
            context.translate(x+w/2+0.5, y+h/2+0.5);
            context.rotate(rotate*Math.PI/180);
            context.translate(-w/2, -h/2);
            context.strokeStyle = "#000";
            context.fillStyle = color;
            //1.绘制头方块
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(w, 0);
            context.lineTo(w, h);
            context.lineTo(0, h);

            context.closePath();
            context.fill();
            context.stroke();
            //2.绘制眼睛
            context.fillStyle = "#eee";
            context.beginPath();
            context.arc(3*w/4, h/4, w/8, 0, Math.PI*2, false);
            context.arc(3*w/4, 3*h/4, w/8, 0, Math.PI*2, false);
            context.closePath();


            context.fill();
            context.restore();
        };
        var drawImg = function(context, img, x, y, rotate, w, h){
            x = BOUND.D * x;
            y = BOUND.D * y;
            var scale = img.width/img.height ;
            context.save();
            context.translate(x+w/2+0.5, y+h/2+0.5);
            context.rotate(rotate*Math.PI/180);
            context.translate(-w/2, -h/2);
            context.drawImage(img, 0, 0, w*scale, h);
            context.restore();
        };
        /**
         *                       ---.
         * U->L,L->D,D->R,R->U   ---.
         *                       ....
         *
         *                       ----
         * R->D,D->L,L->U,U->R   ----
         *                       ..--
         */

        /**
         * 绘制身体方块
         * @param context
         * @param x
         * @param y
         * @param w
         * @param h
         */
        var fillBodyRect = function(context, x, y, w, h, color) {
            x = BOUND.D * x;
            y = BOUND.D * y;
            context.save();
            context.translate(x+0.5, y+0.5);
            context.strokeStyle = "#000";
            context.fillStyle = color;
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

        return snake;
});