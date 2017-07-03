/**
 * Created by 王成 on 2017-05-26.
 */
define(['config', 'keycode', 'sences/mainSence'],
    function (appconfig, keycode, mainSence) {
        //向外暴露的入口场景entrySence对象
        var entrySence = {};

        //私有成员常量
        var BOUND = appconfig.BOUND;

        //私有成员变量
        var _canvas = null;
        var _context = null;

        //共有成员方法
        entrySence.init = function(canvas, context){
            _canvas = canvas;
            _context = context;
        };
        entrySence.run = function () {
            drawSence();
            setTimeout(function(){mainSence.run();},1000);

        };

        //私有成员方法
        /*绘制背景网格*/
        function drawSence() {
            //增加0.5像素的偏移，是为了解决线条实际宽度为2px的问题
            _context.save();
            _context.translate(0.5, 0.5);
            _context.strokeStyle = "#0f3322";
            _context.beginPath();
            for (var i = 1; i < BOUND.H; i++) {
                _context.moveTo(0, BOUND.D * i );
                _context.lineTo(800, BOUND.D * i);
                _context.stroke();
            }
            for (var i = 1; i < BOUND.W; i++) {
                _context.moveTo(BOUND.D * i, 0);
                _context.lineTo(BOUND.D * i, 800);
                _context.stroke();
            }
            _context.closePath();
            _context.restore();
        };

        /*鼠标点击事件监听*/
        function mouseLister() {
            window.addEventListener('click', function (event) {
                //获取点击点的坐标，并做相应处理

            }, false);
        };

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


        return entrySence;
    });