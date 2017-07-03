/**
 * Created by 王成 on 2017-05-26.
 */
define(['config', 'keycode', 'snake', 'food', 'fence'],
    function (appconfig, keycode, snake, food, fence) {
        //向外暴露的mainSence对象
        var mainSence = {};

        //私有成员常量
        var DIR = appconfig.DIR;
        var BOUND = appconfig.BOUND;
        var SPEED = appconfig.SPEED;
        var STATUS = {END:0, PAUSE:1, RUN:2};
        var FPS = 1000/SPEED.N;

        //私有成员变量
        var canvas = document.getElementById("gameCanvas");
        var context = canvas.getContext("2d");
        var timer = null;
        var gameStatus = STATUS.RUN;
        var score = 0;
        var time = 0;
        var frameCount = 0;

        var divDialog = document.getElementById('dialog');

        //共有成员方法
        mainSence.run = function () {
            reset();
            ctrlSnake();
            drawFrame();
            timer = setInterval(function () {
                drawFrame();
            }, SPEED.N);
        };

        //私有成员方法
        /*绘制每一帧*/
        function drawFrame() {
            divDialog.style.display = 'none';
            context.clearRect(0, 0, canvas.width, canvas.height);
            drawScore();
            drawTime();

            fence.draw(context);
            snake.draw(context);
            food.draw(context);

            if(gameStatus===STATUS.END){
                drawEnd(context);
                clearInterval(timer);
            }
            if(gameStatus===STATUS.PAUSE){
                drawPause(context);
            }

            if(gameStatus === STATUS.RUN){
                frameCount ++;
                if(frameCount === FPS){
                    frameCount = 0;
                    time ++;
                }
                snake.move();
                if (snake.autophagy() || snake.collide(fence.getBound())) {
                    gameStatus = STATUS.END;
                }
                if (snake.eat(food.getPosition())) {
                    score += 100;
                    food.changePosition();
                    snake.grow();
                }
            }
        };
        /*绘制背景网格*/
        function drawSence() {
            //增加0.5像素的偏移，是为了解决线条实际宽度为2px的问题
            var offset = 0.5;
            context.save();
            context.strokeStyle = "#0f3322";
            context.beginPath();
            for (var i = 1; i < BOUND.H; i++) {
                context.moveTo(0, BOUND.D * i + offset);
                context.lineTo(800, BOUND.D * i + offset);
                context.stroke();
            }
            for (var i = 1; i < BOUND.W; i++) {
                context.moveTo(BOUND.D * i + offset, 0);
                context.lineTo(BOUND.D * i + offset, 800);
                context.stroke();
            }
            context.closePath();
            context.restore();
        };
        /*绘制游戏结束画面*/
        function drawEnd(){
            context.save();
            context.font = 'bold 72px consolas';
            context.textAlign = 'center';
            context.textBaseline = 'center';
            context.fillStyle = '#FFE426';
            context.strokeStyle = '#d3d3d3';
            context.fillText('GAME OVER', canvas.width/2, canvas.height/2);
            context.strokeText('GAME OVER', canvas.width/2, canvas.height/2);
            context.restore();
        }
        /*绘制游戏暂停画面*/
        function drawPause(){
            context.save();
            context.font = 'bold 72px consolas';
            context.textAlign = 'center';
            context.textBaseline = 'center';
            context.fillStyle = '#fff';
            context.fillText('PAUSE', canvas.width/2, canvas.height/2-100);
            context.restore();
            divDialog.style.display = 'block';
        }
        function drawScore(){
            context.save();
            context.font = 'normal 24px Georgia';
            context.textAlign = 'right';
            context.textBaseline = 'bottom';
            context.fillStyle = '#fff';
            context.fillText('score: '+score, canvas.width-BOUND.D, 1.5*BOUND.D);
            context.restore();
        }
        function drawTime(){
            context.save();
            context.font = 'normal 20px 微软雅黑';
            context.textAlign = 'left';
            context.textBaseline = 'bottom';
            context.fillStyle = '#fff';
            context.fillText('time: '+formatTime(time), BOUND.D, 1.5*BOUND.D);
            context.restore();
        }
        /*控制蛇的方向*/
        function ctrlSnake() {
            window.addEventListener('keydown', function (event) {
                var direction = snake.getDirection();
                switch (event.keyCode) {
                    case keycode.W:
                        direction = DIR.UP;
                        break;
                    case keycode.A:
                        direction = DIR.LEFT;
                        break;
                    case keycode.D:
                        direction = DIR.RIGHT;
                        break;
                    case keycode.S:
                        direction = DIR.DOWN;
                        break;
                    case keycode.SPACE:
                        if(gameStatus == STATUS.RUN)
                            gameStatus = STATUS.PAUSE;
                        else if(gameStatus == STATUS.PAUSE)
                            gameStatus = STATUS.RUN;
                    default:
                        break;
                }
                snake.changeDirection(direction);
            }, false);
        };
        /*重新游戏*/
        function reset(){
            clearInterval(timer);
            fence.init(0, 2, BOUND.W, BOUND.H-2);
            snake.init(5, 5, 4, DIR.RIGHT);
            food.init();
            gameStatus = STATUS.RUN;
            score = 0;
            time = 0;
            frameCount = 0;
        };

        /*格式化时间为标准的时间字符串*/
        function formatTime(numberTime){
            var strTime = "";
            //小于一分钟
            if(numberTime < 60) {
                strTime = numberTime;
            }
            //小于1小时
            else if(numberTime < 3600){
                var s = numberTime % 60;
                var m = (numberTime - s) / 60;
                strTime = formatNum(m) + ":" + formatNum(s);
            }
            //不处理超过24小时的情况
            else{
                var h = Math.floor(numberTime / 3600);
                var tm = numberTime % 3600 ;
                var s = tm % 60 ;
                var m = (tm - s) / 60;
                strTime = h + ":" + formatNum(m) + ":" + formatNum(s);
            }
            return strTime
        }
        function formatNum(num){
            return num < 10 ? "0"+ num : ""+ num;
        }
        /*debug信息*/
        function debug(){
            var table = document.getElementById('table');
            var debug = document.getElementById('debug').getElementsByTagName('p');

            var snakeObj = snake.getObject();
            var i=0;
            debug[i++].innerText = "身长："+snakeObj.body.length;
            debug[i++].innerText = "方向："+snakeObj.direction;

            /*while (table.hasChildNodes()){
                table.removeChild(table.firstChild);
            }
            for(var j=0, len=snakeObj.body.length; j<len;j++){
                var tr = document.createElement("tr");
                var td = document.createElement("td");
                var td2 = td.cloneNode(false);
                var td3 = td.cloneNode(false);
                td.innerText = j;
                td2.innerText = snakeObj.body[j].x;
                td3.innerText = snakeObj.body[j].y;
                tr.appendChild(td);
                tr.appendChild(td2);
                tr.appendChild(td3);
                table.appendChild(tr);
            }*/
        }


        return mainSence;
    });