/**
 * Created by 王成 on 2017-05-26.
 */
requirejs.config({
    //默认从js/app下加载模块
    baseUrl: 'js/app',

    //另外，如果需要加载库下的模块，使用如下路径
    paths: {
        lib: '../lib'
    }
});

// 开始程序的主要逻辑
requirejs(['sences/mainSence'], function(mainSence){
    var divMenu = document.getElementById('menu');
    var divGame = document.getElementById('game');
    var divSetting = document.getElementById('setting');
    var divHelp = document.getElementById('help');
    var divAbout = document.getElementById('about');

    var btnStart = document.getElementById('btnStart');
    var btnSetting = document.getElementById('btnSetting');
    var btnHelp = document.getElementById('btnHelp');
    var btnAbout = document.getElementById('btnAbout');
    var btnBack = document.getElementById('btnBack');

    btnStart.addEventListener('click', function(){
        btnStart.blur();
        divMenu.style.display = 'none';
        divGame.style.display = 'block';
        mainSence.run();
    },false);
    btnSetting.addEventListener('click', function(){
        divMenu.style.display = 'none';
        divSetting.style.display = 'block';
        btnBack.style.display = 'block';
    },false);
    btnHelp.addEventListener('click', function(){
        divMenu.style.display = 'none';
        divHelp.style.display = 'block';
        btnBack.style.display = 'block';
    },false);
    btnAbout.addEventListener('click', function(){
        divMenu.style.display = 'none';
        divAbout.style.display = 'block';
        btnBack.style.display = 'block';
    },false);
    btnBack.addEventListener('click', function(){
        divMenu.style.display = 'block';
        divGame.style.display = 'none';
        divSetting.style.display = 'none';
        divHelp.style.display = 'none';
        divAbout.style.display = 'none';
        btnBack.style.display = 'none';
    }, false);
});
